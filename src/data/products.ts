export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "Clothes" | "Jackets / Coats" | "Shoes" | "Bags" | "Hats / Caps" | "Accessories";
  sizes: string[];
  colors: string[];
  images: string[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Classic Streetwear Hoodie",
    price: 3500,
    description: "Premium cotton blend hoodie with an oversized fit, perfect for everyday streetwear. Features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a clean finish.",
    category: "Clothes",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Grey", "Navy"],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1578768079470-1b73b1f9b820?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1614975059251-992f11792b9f?auto=format&fit=crop&q=80&w=800"
    ],
    featured: true
  },
  {
    id: "p2",
    name: "Vintage Denim Jacket",
    price: 5200,
    description: "Classic blue denim jacket with distressed details and bronze buttons. A timeless piece that pairs perfectly with any outfit for a rugged, vintage look.",
    category: "Jackets / Coats",
    sizes: ["M", "L", "XL"],
    colors: ["Blue", "Light Blue", "Black"],
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&q=80&w=800"
    ],
    featured: true
  },
  {
    id: "p3",
    name: "Urban Edition Sneakers",
    price: 8500,
    description: "Comfortable and stylish sneakers with a thick sole and breathable mesh upper. Designed for all-day wear with premium cushioning and a modern silhouette.",
    category: "Shoes",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    colors: ["White", "Black/Red", "Grey"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800"
    ],
    featured: true
  },
  {
    id: "p4",
    name: "Minimalist Leather Backpack",
    price: 6000,
    description: "Sleek and durable faux leather backpack, perfect for daily commute or travel. Features multiple compartments, padded laptop sleeve, and adjustable straps.",
    category: "Bags",
    sizes: ["One Size"],
    colors: ["Black", "Brown"],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "p5",
    name: "Signature Logo Cap",
    price: 1500,
    description: "Adjustable baseball cap with an embroidered classic logo. Made from breathable cotton twill with a pre-curved visor for the perfect shape.",
    category: "Hats / Caps",
    sizes: ["One Size"],
    colors: ["Black", "White", "Dark Green"],
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "p6",
    name: "Steel Chrono Watch",
    price: 9000,
    description: "Elegant stainless steel watch with chronographs and a minimalist dial. Water resistant to 50m with a scratch-resistant sapphire crystal face.",
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Silver", "Matte Black"],
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "p7",
    name: "Essential Basic T-Shirt",
    price: 1200,
    description: "100% organic cotton basic t-shirt. Soft, breathable, and pre-shrunk with a relaxed fit for everyday comfort. The foundation of any wardrobe.",
    category: "Clothes",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Olive"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "p8",
    name: "Winter Puffer Coat",
    price: 7500,
    description: "Heavyweight puffer jacket to keep you warm in sub-zero temperatures. Water resistant with premium down insulation, detachable hood, and zippered pockets.",
    category: "Jackets / Coats",
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Navy", "Red"],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544923246-77307dd270aa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=800"
    ]
  }
];
