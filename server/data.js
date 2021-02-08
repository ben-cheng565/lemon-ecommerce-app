import bcrypt from "bcryptjs";

export const data = {
  users: [
    {
      name: "Ben",
      email: "ben@gmail.com",
      password: await bcrypt.hash("123", 10),
      isAdmin: true,
    },
    {
      name: "user1",
      email: "user1@gmail.com",
      password: await bcrypt.hash("123", 10),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "NBA Lakers Jersey",
      category: "Shirts",
      image: "/images/p1.png",
      price: 120,
      brand: "Nike",
      rating: 5,
      numReviews: 122,
      description: "Lebron James No.23",
      countInStock: 10,
    },
    {
      name: "NBA Lakers Jersey",
      category: "Shirts",
      image: "/images/p1.png",
      price: 120,
      brand: "Nike",
      rating: 5,
      numReviews: 12,
      description: "Lebron James No.23",
      countInStock: 0,
    },
    {
      name: "NBA Lakers Jersey",
      category: "Shirts",
      image: "/images/p1.png",
      price: 120,
      brand: "Nike",
      rating: 5,
      numReviews: 5,
      description: "Lebron James No.23",
      countInStock: 1,
    },
    {
      name: "NBA Lakers Jersey",
      category: "Shirts",
      image: "/images/p1.png",
      price: 120,
      brand: "Nike",
      rating: 5,
      numReviews: 10,
      description: "Lebron James No.23",
      countInStock: 5,
    },
  ],
};
