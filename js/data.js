// Product data with comprehensive information
const productsData = [
    // Electronics Category
    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "electronics",
        price: 299.99,
        originalPrice: 399.99,
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
        description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
        rating: 4.8,
        reviews: 124,
        badge: "sale",
        inStock: true,
        features: ["Noise Cancellation", "30-hour Battery", "Wireless Charging", "Premium Sound"]
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        category: "electronics",
        price: 249.99,
        originalPrice: null,
        image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
        description: "Advanced fitness tracking with heart rate monitoring, GPS, and smartphone connectivity.",
        rating: 4.6,
        reviews: 89,
        badge: "new",
        inStock: true,
        features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "7-day Battery"]
    },
    {
        id: 3,
        name: "Professional Camera",
        category: "electronics",
        price: 1299.99,
        originalPrice: 1499.99,
        image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
        description: "Professional DSLR camera with advanced features for photography enthusiasts and professionals.",
        rating: 4.9,
        reviews: 67,
        badge: "sale",
        inStock: true,
        features: ["24MP Sensor", "4K Video", "Weather Sealed", "Dual Card Slots"]
    },
    {
        id: 4,
        name: "Wireless Bluetooth Speaker",
        category: "electronics",
        price: 89.99,
        originalPrice: null,
        image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
        description: "Portable Bluetooth speaker with rich sound and long battery life.",
        rating: 4.4,
        reviews: 156,
        badge: null,
        inStock: true,
        features: ["360° Sound", "12-hour Battery", "Waterproof", "Voice Assistant"]
    },
    {
        id: 5,
        name: "Gaming Laptop",
        category: "electronics",
        price: 1599.99,
        originalPrice: 1899.99,
        image: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
        description: "High-performance gaming laptop with latest graphics and processor technology.",
        rating: 4.7,
        reviews: 43,
        badge: "sale",
        inStock: true,
        features: ["RTX Graphics", "16GB RAM", "1TB SSD", "144Hz Display"]
    },

    // Fashion Category
    {
        id: 6,
        name: "Designer Leather Jacket",
        category: "fashion",
        price: 199.99,
        originalPrice: 299.99,
        image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
        description: "Premium leather jacket with modern design and superior craftsmanship.",
        rating: 4.5,
        reviews: 78,
        badge: "sale",
        inStock: true,
        features: ["Genuine Leather", "Multiple Pockets", "Lined Interior", "Modern Fit"]
    },
    {
        id: 7,
        name: "Luxury Handbag",
        category: "fashion",
        price: 149.99,
        originalPrice: null,
        image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
        description: "Elegant handbag crafted from premium materials with timeless design.",
        rating: 4.6,
        reviews: 92,
        badge: "new",
        inStock: true,
        features: ["Premium Materials", "Multiple Compartments", "Adjustable Strap", "Elegant Design"]
    },
    {
        id: 8,
        name: "Designer Sunglasses",
        category: "fashion",
        price: 79.99,
        originalPrice: 129.99,
        image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg",
        description: "Stylish sunglasses with UV protection and premium frame construction.",
        rating: 4.3,
        reviews: 134,
        badge: "sale",
        inStock: true,
        features: ["UV Protection", "Polarized Lenses", "Lightweight Frame", "Designer Style"]
    },
    {
        id: 9,
        name: "Premium Sneakers",
        category: "fashion",
        price: 129.99,
        originalPrice: null,
        image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
        description: "Comfortable and stylish sneakers perfect for everyday wear and athletic activities.",
        rating: 4.4,
        reviews: 167,
        badge: null,
        inStock: true,
        features: ["Comfortable Fit", "Durable Construction", "Breathable Material", "Versatile Style"]
    },
    {
        id: 10,
        name: "Elegant Dress Watch",
        category: "fashion",
        price: 189.99,
        originalPrice: 249.99,
        image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
        description: "Sophisticated dress watch with classic design and precision movement.",
        rating: 4.7,
        reviews: 56,
        badge: "sale",
        inStock: true,
        features: ["Swiss Movement", "Sapphire Crystal", "Water Resistant", "Leather Strap"]
    },

    // Home & Living Category
    {
        id: 11,
        name: "Modern Table Lamp",
        category: "home",
        price: 69.99,
        originalPrice: null,
        image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
        description: "Contemporary table lamp with adjustable brightness and modern design.",
        rating: 4.2,
        reviews: 89,
        badge: "new",
        inStock: true,
        features: ["Adjustable Brightness", "Modern Design", "Energy Efficient", "Touch Control"]
    },
    {
        id: 12,
        name: "Luxury Throw Pillow Set",
        category: "home",
        price: 49.99,
        originalPrice: 79.99,
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        description: "Set of premium throw pillows to enhance your living space comfort and style.",
        rating: 4.5,
        reviews: 112,
        badge: "sale",
        inStock: true,
        features: ["Premium Fabric", "Comfortable Fill", "Machine Washable", "Decorative Design"]
    },
    {
        id: 13,
        name: "Aromatherapy Diffuser",
        category: "home",
        price: 39.99,
        originalPrice: null,
        image: "https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg",
        description: "Ultrasonic aromatherapy diffuser with LED lighting and timer functions.",
        rating: 4.6,
        reviews: 203,
        badge: null,
        inStock: true,
        features: ["Ultrasonic Technology", "LED Lighting", "Timer Function", "Whisper Quiet"]
    },
    {
        id: 14,
        name: "Decorative Wall Art",
        category: "home",
        price: 89.99,
        originalPrice: 119.99,
        image: "https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg",
        description: "Beautiful wall art piece to add character and style to any room.",
        rating: 4.4,
        reviews: 67,
        badge: "sale",
        inStock: true,
        features: ["High-Quality Print", "Ready to Hang", "Fade Resistant", "Modern Style"]
    },
    {
        id: 15,
        name: "Smart Plant Pot",
        category: "home",
        price: 59.99,
        originalPrice: null,
        image: "https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg",
        description: "Intelligent plant pot with automatic watering and monitoring system.",
        rating: 4.3,
        reviews: 45,
        badge: "new",
        inStock: true,
        features: ["Auto Watering", "App Control", "Moisture Sensor", "Modern Design"]
    },

    // Jewelry Category
    {
        id: 16,
        name: "Diamond Pendant Necklace",
        category: "jewelry",
        price: 299.99,
        originalPrice: 399.99,
        image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg",
        description: "Elegant diamond pendant necklace crafted with precision and attention to detail.",
        rating: 4.8,
        reviews: 34,
        badge: "sale",
        inStock: true,
        features: ["Genuine Diamond", "Sterling Silver", "Adjustable Chain", "Gift Box Included"]
    },
    {
        id: 17,
        name: "Gold Chain Bracelet",
        category: "jewelry",
        price: 159.99,
        originalPrice: null,
        image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
        description: "Beautiful gold chain bracelet perfect for everyday wear or special occasions.",
        rating: 4.6,
        reviews: 78,
        badge: "new",
        inStock: true,
        features: ["14K Gold Plated", "Adjustable Size", "Hypoallergenic", "Elegant Design"]
    },
    {
        id: 18,
        name: "Pearl Earring Set",
        category: "jewelry",
        price: 89.99,
        originalPrice: 129.99,
        image: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg",
        description: "Classic pearl earring set with timeless elegance and sophisticated style.",
        rating: 4.7,
        reviews: 56,
        badge: "sale",
        inStock: true,
        features: ["Cultured Pearls", "Sterling Silver Posts", "Secure Backing", "Classic Style"]
    },
    {
        id: 19,
        name: "Luxury Ring Collection",
        category: "jewelry",
        price: 249.99,
        originalPrice: null,
        image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
        description: "Exquisite ring collection featuring premium materials and craftsmanship.",
        rating: 4.5,
        reviews: 23,
        badge: null,
        inStock: true,
        features: ["Premium Materials", "Multiple Sizes", "Elegant Design", "Gift Ready"]
    },
    {
        id: 20,
        name: "Statement Necklace",
        category: "jewelry",
        price: 119.99,
        originalPrice: 179.99,
        image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg",
        description: "Bold statement necklace to elevate any outfit with sophisticated style.",
        rating: 4.4,
        reviews: 67,
        badge: "sale",
        inStock: true,
        features: ["Bold Design", "Quality Materials", "Adjustable Length", "Eye-catching Style"]
    }
];

// Categories data
const categoriesData = [
    {
        id: 'electronics',
        name: 'Electronics',
        description: 'Latest technology and gadgets',
        image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
        productCount: 25
    },
    {
        id: 'fashion',
        name: 'Fashion',
        description: 'Trendy clothing and accessories',
        image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
        productCount: 40
    },
    {
        id: 'home',
        name: 'Home & Living',
        description: 'Beautiful home decor and essentials',
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        productCount: 30
    },
    {
        id: 'jewelry',
        name: 'Jewelry',
        description: 'Elegant jewelry and accessories',
        image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
        productCount: 15
    }
];

// Export data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productsData, categoriesData };
}