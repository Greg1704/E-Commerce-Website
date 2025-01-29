const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 49.99,
    description: "High-quality wireless headphones with noise cancellation and long battery life.",
    picture: [
      {
        fileName: "headphones.jpg",
        file: {
          data: "base64_encoded_data_or_url_here",
          contentType: "image/jpeg",
        },
        uploadTime: new Date(),
      },
    ],
    review: [
      {
        Title: "Excellent sound quality",
        description: "These headphones provide excellent sound quality and are very comfortable to wear.",
      },
    ],
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 129.99,
    description: "Track your fitness, monitor your heart rate, and stay connected with this stylish smartwatch.",
    picture: [
      {
        fileName: "fitness-watch.jpg",
        file: {
          data: "base64_encoded_data_or_url_here",
          contentType: "image/jpeg",
        },
        uploadTime: new Date(),
      },
    ],
    review: [
      {
        Title: "Perfect for workouts",
        description: "Helps me keep track of my steps and heart rate while working out. Very useful!",
      },
    ],
  },
  {
    id: 3,
    name: "Gaming Mechanical Keyboard",
    price: 89.99,
    description: "A durable mechanical keyboard with customizable RGB lighting and responsive keys.",
    picture: [
      {
        fileName: "keyboard.jpg",
        file: {
          data: "base64_encoded_data_or_url_here",
          contentType: "image/jpeg",
        },
        uploadTime: new Date(),
      },
    ],
    review: [
      {
        Title: "Best keyboard for gamers",
        description: "The keys are very responsive, and the RGB lighting makes it stand out on my desk!",
      },
    ],
  },
  {
    id: 4,
    name: "4K Ultra HD Smart TV",
    price: 399.99,
    description: "Experience stunning visuals with this 4K Ultra HD Smart TV, perfect for streaming and gaming.",
    picture: [
      {
        fileName: "smart-tv.jpg",
        file: {
          data: "base64_encoded_data_or_url_here",
          contentType: "image/jpeg",
        },
        uploadTime: new Date(),
      },
    ],
    review: [
      {
        Title: "Amazing picture quality",
        description: "The picture quality is fantastic, and the smart features are very easy to use.",
      },
    ],
  },
  {
    id: 5,
    name: "Noise-Cancelling Earbuds",
    price: 69.99,
    description: "Compact and stylish earbuds with advanced noise-cancelling technology.",
    picture: [
      {
        fileName: "earbuds.jpg",
        file: {
          data: "base64_encoded_data_or_url_here",
          contentType: "image/jpeg",
        },
        uploadTime: new Date(),
      },
    ],
    review: [
      {
        Title: "Great for commuting",
        description: "These earbuds block out all background noise, making them perfect for traveling.",
      },
    ],
  },
  {
    id: 6,
    name: "Portable Power Bank 20000mAh",
    price: 29.99,
    description: "Charge your devices on the go with this high-capacity portable power bank.",
    picture: [
      {
        fileName: "power-bank.jpg",
        file: {
          data: "base64_encoded_data_or_url_here",
          contentType: "image/jpeg",
        },
        uploadTime: new Date(),
      },
    ],
    review: [
      {
        Title: "Very reliable",
        description: "This power bank charges my phone multiple times before needing a recharge itself.",
      },
    ],
  },
];

export default products;
