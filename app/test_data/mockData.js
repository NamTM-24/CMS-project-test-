// Mock Data - Đơn giản hóa từ UI templates
// Chỉ có id, type, title, data (không có children phức tạp)

export const sections = [
  // 1. Sale Hero Banner 
  {
    id: "hero-1",
    type: "hero",
    title: "Sale Hero Banner",
    data: {
      heading: "Up to 50% Off Select Styles",
      subheading: "Black Friday Preview Sale",
      paragraph: "Early Access Starts Now",
      buttonText: "Shop Now",
      buttonLink: "#",
      backgroundImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
      overlayOpacity: 0.5
    }
  },

  // 2. Text Block 
  {
    id: "text-1",
    type: "text-block",
    title: "Brand Story",
    data: {
      heading: "Crafted with Care",
      content: "We believe in creating products that not only look good but feel good too.",
      alignment: "center"
    }
  },

  // 3. Image Card
  {
    id: "image-card-1",
    type: "image-card",
    title: "Featured Product",
    data: {
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600",
      cardTitle: "Classic Sneakers",
      cardLink: "#"
    }
  },

  // 4. Hero Banner 2 
  {
    id: "hero-2",
    type: "hero",
    title: "Holiday Collection",
    data: {
      heading: "The Holiday Collection",
      subheading: "Feel Good Gifting",
      paragraph: "Discover exclusive styles this season",
      buttonText: "Shop Collection",
      buttonLink: "#",
      backgroundImage: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200",
      overlayOpacity: 0.4
    }
  },

  // 5. Text Block 2
  {
    id: "text-2",
    type: "text-block",
    title: "New Arrivals",
    data: {
      heading: "Just Dropped",
      content: "Check out our latest products and seasonal favorites.",
      alignment: "left"
    }
  }
];

