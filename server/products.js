const products = [
  // Product 1
  {
    title: "Stylish Winter Jacket",
    price: 120,
    priceDiscount: 20,
    description: "A warm and stylish winter jacket.",
    category: "Clothing",
    type: "Outerwear",
    images: [
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b",
      "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402",
    ],
    sizes: [
      { name: "S", qty: 10 },
      { name: "M", qty: 15 },
    ],
  },
  // Product 2
  {
    title: "Casual Sneakers",
    price: 80,
    priceDiscount: 10,
    description: "Comfortable and casual sneakers for daily wear.",
    category: "Footwear",
    type: "Shoes",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402",
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b",
    ],
    sizes: [
      { name: "8", qty: 5 },
      { name: "9", qty: 10 },
    ],
  },
  // Product 3
  {
    title: "Formal Shirt",
    price: 50,
    priceDiscount: 5,
    description: "A classic formal shirt for office wear.",
    category: "Clothing",
    type: "Shirts",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ],
    sizes: [
      { name: "M", qty: 10 },
      { name: "L", qty: 12 },
    ],
  },
  // Product 4
  {
    title: "Leather Boots",
    price: 150,
    priceDiscount: 25,
    description: "Premium leather boots for outdoor adventures.",
    category: "Footwear",
    type: "Boots",
    images: [
      "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402",
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b",
    ],
    sizes: [
      { name: "9", qty: 8 },
      { name: "10", qty: 12 },
    ],
  },
  // Product 5
  {
    title: "Denim Jeans",
    price: 60,
    priceDiscount: 15,
    description: "Comfortable and stylish denim jeans.",
    category: "Clothing",
    type: "Jeans",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402",
    ],
    sizes: [
      { name: "32", qty: 10 },
      { name: "34", qty: 15 },
    ],
  },
  // Product 6
  {
    title: "Graphic T-Shirt",
    price: 30,
    priceDiscount: 0,
    description: "A trendy graphic T-shirt for casual outings.",
    category: "Clothing",
    type: "T-Shirts",
    images: [
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b",
    ],
    sizes: [
      { name: "S", qty: 8 },
      { name: "M", qty: 10 },
    ],
  },
  // Product 7
  {
    title: "Woolen Scarf",
    price: 20,
    priceDiscount: 10,
    description: "A cozy woolen scarf to keep you warm.",
    category: "Accessories",
    type: "Scarves",
    images: [
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b",
    ],
    sizes: [{ name: "One Size", qty: 20 }],
  },
  // Product 8
  {
    title: "Leather Belt",
    price: 25,
    priceDiscount: 5,
    description: "A durable leather belt for formal wear.",
    category: "Accessories",
    type: "Belts",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ],
    sizes: [
      { name: "M", qty: 15 },
      { name: "L", qty: 12 },
    ],
  },
  // Product 9
  {
    title: "Cotton Shorts",
    price: 40,
    priceDiscount: 10,
    description: "Lightweight cotton shorts for summer days.",
    category: "Clothing",
    type: "Shorts",
    images: [
      "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402",
    ],
    sizes: [
      { name: "S", qty: 10 },
      { name: "M", qty: 15 },
    ],
  },
  // Product 10
  {
    title: "Sports Cap",
    price: 15,
    priceDiscount: 5,
    description: "A stylish sports cap for outdoor activities.",
    category: "Accessories",
    type: "Caps",
    images: [
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ],
    sizes: [{ name: "One Size", qty: 30 }],
  },
  // Product 11
  {
    title: "Classic Watch",
    price: 150,
    priceDiscount: 20,
    description: "A timeless accessory for any outfit.",
    category: "Accessories",
    type: "Watches",
    images: [
      "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402",
    ],
    sizes: [{ name: "One Size", qty: 25 }],
  },
  // Product 12
  {
    title: "Leather Gloves",
    price: 35,
    priceDiscount: 5,
    description: "Warm leather gloves for winter.",
    category: "Accessories",
    type: "Gloves",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b",
    ],
    sizes: [
      { name: "M", qty: 10 },
      { name: "L", qty: 15 },
    ],
  },
  // Product 13
  {
    title: "Summer Sandals",
    price: 45,
    priceDiscount: 10,
    description: "Comfortable sandals for the beach.",
    category: "Footwear",
    type: "Sandals",
    images: [
      "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ],
    sizes: [
      { name: "7", qty: 10 },
      { name: "8", qty: 12 },
    ],
  },
  // Product 14
  {
    title: "Formal Tie",
    price: 20,
    priceDiscount: 5,
    description: "A silk tie for formal occasions.",
    category: "Accessories",
    type: "Ties",
    images: [
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b",
    ],
    sizes: [{ name: "One Size", qty: 40 }],
  },
  // Product 15
  {
    title: "Hiking Backpack",
    price: 85,
    priceDiscount: 15,
    description: "Durable backpack for all your outdoor adventures.",
    category: "Accessories",
    type: "Backpacks",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402",
    ],
    sizes: [{ name: "One Size", qty: 30 }],
  },
  // Product 16
  {
    title: "Winter Beanie",
    price: 18,
    priceDiscount: 3,
    description: "A warm beanie for cold days.",
    category: "Accessories",
    type: "Hats",
    images: [
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b",
    ],
    sizes: [{ name: "One Size", qty: 50 }],
  },
  // Product 17
  {
    title: "Formal Shoes",
    price: 110,
    priceDiscount: 20,
    description: "Elegant shoes for formal events.",
    category: "Footwear",
    type: "Shoes",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b",
    ],
    sizes: [
      { name: "9", qty: 10 },
      { name: "10", qty: 8 },
    ],
  },
  // Product 18
  {
    title: "Casual Hoodie",
    price: 60,
    priceDiscount: 10,
    description: "Comfortable hoodie for everyday wear.",
    category: "Clothing",
    type: "Hoodies",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402",
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b",
    ],
    sizes: [
      { name: "S", qty: 10 },
      { name: "M", qty: 12 },
      { name: "L", qty: 8 },
    ],
  },
  // Product 19
  {
    title: "Yoga Pants",
    price: 50,
    priceDiscount: 5,
    description: "Flexible and comfortable yoga pants.",
    category: "Clothing",
    type: "Pants",
    images: [
      "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ],
    sizes: [
      { name: "S", qty: 15 },
      { name: "M", qty: 20 },
    ],
  },
  // Product 20
  {
    title: "Raincoat",
    price: 70,
    priceDiscount: 15,
    description: "Stay dry with this waterproof raincoat.",
    category: "Clothing",
    type: "Coats",
    images: [
      "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ],
    sizes: [
      { name: "M", qty: 10 },
      { name: "L", qty: 12 },
    ],
  },
];

export default products;
