// --- Libraries
import path from "path";
import fs from "fs";

// --- Helpers
import { cloudinaryUploadImage } from "@helpers/cloudinary.js";
import { priceAfterDiscountFunc } from "@helpers/priceAfterDiscount.js";

// --- Data
import { rawProducts } from "@data/raw.product.data.js";

// --- Upload Image To Cloudinary Script

const uploadImagesToCloudinary = async () => {
  const updatedData = await Promise.all(
    rawProducts.map(async (product) => {
      const updatedImages = [];
      for (const image of product.images) {
        const imagePath = path.join(process.cwd(), "../client/public", image.url);

        let result;

        if (fs.existsSync(imagePath)) result = await cloudinaryUploadImage(imagePath);

        if (result) {
          updatedImages.push({
            url: result.secure_url,
            publicId: result.public_id,
          });
        } else {
          console.error(`Skipping image for ${product.title} due to missing local file.`);
        }
      }

      const priceAfterDiscount = priceAfterDiscountFunc(product.price, product.discount);

      return { ...product, images: updatedImages, priceAfterDiscount };
    }),
  );

  const outputPath = path.join(process.cwd(), "src/shared/data/pure.product.data.json");

  const jsonContent = JSON.stringify(updatedData, null, 2);

  fs.writeFileSync(outputPath, jsonContent);

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  console.log(`✨ DONE! Pure data has been saved to: ${outputPath}`);
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++");

  process.exit(0);
};

uploadImagesToCloudinary().catch((err) => {
  console.error("❌ Fatal Error during migration:", err);
  process.exit(1);
});
