// --- Libraries
import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";

// --- Models
import Product from "@models/Product.js";

// --- Modules
import {
  validateAddProduct,
  validateGetProductQuery,
  validateUpdateProduct,
  type AddProductType,
  type UpdateProductType,
} from "@modules/product/product.validation.js";

// --- Helpers
import { priceAfterDiscountFunc } from "@helpers/priceAfterDiscount.js";
import { cloudinaryUploadImage, cloudinaryRemoveImage } from "@helpers/cloudinary.js";

/**
 * @desc Get All Products By Category
 * @route /api/products?category
 * @method GET
 * @access public
 */
export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const isValidate = validateGetProductQuery(req.query);

  if (!isValidate.success) {
    res.status(400).json({ message: isValidate.error.issues[0]?.message });
    return;
  }

  const category = isValidate.data.category;

  const filter = category === "all" ? {} : { category };

  let products;

  if (category) {
    products = await Product.find(filter).sort({ createdAt: -1 });
  } else {
    products = await Product.find().sort({ createdAt: -1 });
  }

  res.status(200).json(products);
  return;
});

/**
 * @desc Get Products Count
 * @route /api/products/count
 * @method GET
 * @access private (only admin)
 */
export const getProductCount = asyncHandler(async (_req: Request, res: Response) => {
  const count = await Product.countDocuments();

  res.status(200).json({ count });
  return;
});

/**
 * @desc Get Product By Id
 * @route /api/products/:id
 * @method GET
 * @access public
 */
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({ message: "Product Not Found" });
    return;
  }

  res.status(200).json(product);
  return;
});

/**
 * @desc add Product
 * @route /api/products/add-product
 * @method POST
 * @access private (only admin)
 */
export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const isValidate = validateAddProduct(req.body);

  const files = req.files as Express.Multer.File[];

  if (!isValidate.success) {
    if (files) {
      files.forEach((file) => fs.unlinkSync(file.path));
    }

    res.status(400).json({ message: isValidate.error.issues[0]?.message });
    return;
  }

  if (!files || files.length === 0) {
    res.status(400).json({ message: "Please Upload at least one Image" });
    return;
  }

  const images = await Promise.all(
    files.map(async (file) => {
      const imagePath = path.join(process.cwd(), `images/${file.filename}`);

      try {
        const result = await cloudinaryUploadImage(imagePath);

        return {
          url: result.secure_url,
          publicId: result.public_id,
        };
      } finally {
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      }
    }),
  );

  const data = isValidate.data as AddProductType;

  const priceAfterDiscount = priceAfterDiscountFunc(data.price, data.discount);

  const newProduct = { ...data, images, priceAfterDiscount };

  const product = await Product.create(newProduct);

  res.status(201).json(product);
  return;
});

/**
 * @desc Update Product By Id
 * @route /api/products/:id
 * @method PUT
 * @access private (only admin)
 */
export const updateProductById = asyncHandler(async (req: Request, res: Response) => {
  const isValidate = validateUpdateProduct(req.body);

  const files = req.files as Express.Multer.File[];

  if (!isValidate.success) {
    if (files) {
      files.forEach((file) => fs.unlinkSync(file.path));
    }

    res.status(400).json({ message: isValidate.error.issues[0]?.message });
    return;
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    if (files) {
      files.forEach((file) => fs.unlinkSync(file.path));
    }

    res.status(404).json({ message: "Product Not Found!" });
    return;
  }

  if (files && files.length > 0) {
    await Promise.all(product.images.map((img) => cloudinaryRemoveImage(img.publicId)));

    const images = await Promise.all(
      files.map(async (file) => {
        const imagePath = path.join(process.cwd(), `images/${file.filename}`);

        try {
          const result = await cloudinaryUploadImage(imagePath);

          return {
            url: result.secure_url,
            publicId: result.public_id,
          };
        } finally {
          if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }
      }),
    );

    product.set("images", images);
  }

  const data = isValidate.data as UpdateProductType;

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      product.set(key, value);
    }
  }

  if (data.price !== undefined || data.discount !== undefined) {
    product.priceAfterDiscount = priceAfterDiscountFunc(product.price, product.discount);
  }

  const updatedProduct = await product.save();

  res.status(200).json(updatedProduct);
  return;
});

/**
 * @desc Delete Product By Id
 * @route /api/products/:id
 * @method DELETE
 * @access private (only admin)
 */
export const deleteProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({ message: "Product Not Found" });
    return;
  }

  await Promise.all(product.images.map((img) => cloudinaryRemoveImage(img.publicId)));

  await product.deleteOne();

  res.status(200).json({ message: "Product and its images have been deleted successfully!" });
  return;
});
