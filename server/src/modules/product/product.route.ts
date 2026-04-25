// --- Libraries
import express from "express";

// --- Modules
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  getProductCount,
  updateProductById,
} from "@modules/product/product.controller.js";

// --- Middlewares
import { verifyTokenAndAdmin } from "@middlewares/verifyToken.middleware.js";
import { photoUpload } from "@middlewares/photoUpload.middleware.js";
import { validateObjectId } from "@middlewares/validateObjectId.middleware.js";

// --- Product Routers

const ProductRouter = express.Router();

/**
 * @route /api/products
 */
ProductRouter.get("/", getAllProducts);

/**
 * @route /api/products/add-product
 */
ProductRouter.post("/add-product", verifyTokenAndAdmin, photoUpload.array("images", 2), addProduct);

/**
 * @route /api/products/count
 */
ProductRouter.get("/count", verifyTokenAndAdmin, getProductCount);

/**
 * @route /api/products/:id
 */
ProductRouter.route("/:id")
  .get(validateObjectId, getProductById)
  .put(verifyTokenAndAdmin, validateObjectId, photoUpload.array("images", 2), updateProductById)
  .delete(verifyTokenAndAdmin, validateObjectId, deleteProductById);

export default ProductRouter;
