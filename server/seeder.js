import connectDB from "./utils/db.js";
import products from "./products.js";
import Product from "./models/productModel.js";
import dotenv from "dotenv";

dotenv.config();

const seedProducts = async () => {
  try {
    connectDB(); // Connect to the database
    console.log("Database connected");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Existing products cleared");

    // Insert seed products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products added to the database`);

    process.exit(); // Exit the process
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

seedProducts();
