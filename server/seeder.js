import connectDB from "./utils/db.js";
import Product from "./models/productModel.js";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

dotenv.config();

const generateProducts = (count = 100) => {
  const categories = ["Man", "Woman", "Kids"];
  const types = ["Hoodie", "Pants", "Shirt", "Sneakers", "Jacket"];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const imageUrls = [
    "https://plus.unsplash.com/premium_photo-1689327920663-406abecf9805?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1511401677968-feade623d58d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531945086322-64e2ffae14a6?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1609885654455-f81e5a682c87?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554411529-ee36dfde51b9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661429023637-3d97b82b67d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1520310809185-5cc119cf8b08?q=80&w=1707&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661353204033-1f7d98b28970?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1698749257193-e881163207d6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1621059591080-d5db06386b53?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1599670998937-441a3a74b2f1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1465453869711-7e174808ace9?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1579446650032-86effeeb3389?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1496202703211-aa28e9500c30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661313817350-1fa759c43a3b?q=80&w=2117&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1551794840-8ae3b9c181f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1492&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1511280303142-0051e93baeeb?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return Array.from({ length: count }, () => {
    const type = faker.helpers.arrayElement(types);
    const category = faker.helpers.arrayElement(categories);
    const title = `${faker.color.human()} ${type}`;
    const price = faker.number.int({ min: 10, max: 300 }); // Price between 10 and 300
    const priceDiscount = faker.number.int({ min: 0, max: 30 }); // Discount between 0% and 30%
    const totalPrice = price - (price * priceDiscount) / 100; // Calculate total price after discount

    const sizesArray = sizes.map((size) => ({
      name: size,
      qty: faker.number.int({ min: 5, max: 50 }), // Quantity between 5 and 50
    }));

    const totalAmount = sizesArray.reduce((sum, size) => sum + size.qty, 0); // Sum of quantities

    return {
      title, // Dynamic title with type and color
      price,
      priceDiscount,
      totalPrice: parseFloat(totalPrice.toFixed(2)), // Total price after discount, rounded to 2 decimals
      description: `${faker.commerce.productAdjective()} ${type} for ${category.toLowerCase()} - ${faker.commerce.productDescription()}`,
      category,
      type,
      images: Array.from({ length: faker.number.int({ min: 1, max: 6 }) }, () =>
        faker.helpers.arrayElement(imageUrls)
      ), // Array of 1-5 image URLs based on types
      sizes: sizesArray,
      totalAmount, // Total quantity of all sizes
    };
  });
};

const seedProducts = async () => {
  try {
    connectDB(); // Connect to the database
    console.log("Database connected");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Existing products cleared");

    // Generate and insert seed products
    const products = generateProducts(20); // Generate 100 products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products added to the database`);

    process.exit(); // Exit the process
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

seedProducts();
