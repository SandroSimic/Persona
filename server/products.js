const products = [
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
    totalPrice: 96, // 120 - (20% of 120)
    totalAmount: 25, // 10 + 15
  },
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
    totalPrice: 72, // 80 - (10% of 80)
    totalAmount: 15, // 5 + 10
  },
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
    totalPrice: 47.5, // 50 - (5% of 50)
    totalAmount: 22, // 10 + 12
  },
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
    totalPrice: 112.5, // 150 - (25% of 150)
    totalAmount: 20, // 8 + 12
  },
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
    totalPrice: 51, // 60 - (15% of 60)
    totalAmount: 25, // 10 + 15
  },
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
    totalPrice: 30, // 30 - (0% of 30)
    totalAmount: 18, // 8 + 10
  },
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
    sizes: [
      { name: "One Size", qty: 20 },
    ],
    totalPrice: 18, // 20 - (10% of 20)
    totalAmount: 20, // 20
  },
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
    totalPrice: 23.75, // 25 - (5% of 25)
    totalAmount: 27, // 15 + 12
  },
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
    totalPrice: 36, // 40 - (10% of 40)
    totalAmount: 25, // 10 + 15
  },
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
    sizes: [
      { name: "One Size", qty: 30 },
    ],
    totalPrice: 14.25, // 15 - (5% of 15)
    totalAmount: 30, // 30
  },
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
    sizes: [
      { name: "One Size", qty: 25 },
    ],
    totalPrice: 120, // 150 - (20% of 150)
    totalAmount: 25, // 25
  },
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
    totalPrice: 33.25, // 35 - (5% of 35)
    totalAmount: 25, // 10 + 15
  },
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
    totalPrice: 40.5, // 45 - (10% of 45)
    totalAmount: 22, // 10 + 12
  },
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
    sizes: [
      { name: "One Size", qty: 40 },
    ],
    totalPrice: 19, // 20 - (5% of 20)
    totalAmount: 40, // 40
  },
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
    sizes: [
      { name: "One Size", qty: 30 },
    ],
    totalPrice: 72.25, // 85 - (15% of 85)
    totalAmount: 30, // 30
  },
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
    sizes: [
      { name: "One Size", qty: 50 },
    ],
    totalPrice: 17.46, // 18 - (3% of 18)
    totalAmount: 50, // 50
  },
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
    totalPrice: 88, // 110 - (20% of 110)
    totalAmount: 18, // 10 + 8
  },
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
    totalPrice: 54, // 60 - (10% of 60)
    totalAmount: 30, // 10 + 12 + 8
  },
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
    totalPrice: 47.5, // 50 - (5% of 50)
    totalAmount: 35, // 15 + 20
  },
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
    totalPrice: 59.5, // 70 - (15% of 70)
    totalAmount: 22, // 10 + 12
  },
];

export default products;
