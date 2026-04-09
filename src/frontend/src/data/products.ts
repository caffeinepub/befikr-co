export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type ProductCategory = "T-Shirts" | "Hoodies" | "Drops" | "Accessories";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  sizes: ProductSize[];
  images: string[];
  isFeatured: boolean;
  isBestSeller: boolean;
  tag?: string;
}

const PLACEHOLDER = "/assets/images/placeholder.svg";

export const products: Product[] = [
  {
    id: "bfkr-001",
    name: "Void Oversized Tee",
    price: 65,
    description:
      "Heavyweight 280gsm cotton. Dropped shoulders, extended hem. Built for the unbothered.",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    images: [PLACEHOLDER],
    isFeatured: true,
    isBestSeller: true,
    tag: "Best Seller",
  },
  {
    id: "bfkr-002",
    name: "Chalk Boxy Tee",
    price: 65,
    description:
      "Off-white cotton jersey. Relaxed boxy cut, minimal branding at chest.",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "bfkr-003",
    name: "Archive Graphic Tee",
    price: 75,
    description:
      "Limited run. Screen-printed artwork on heavyweight cotton. Fades with life.",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [PLACEHOLDER],
    isFeatured: true,
    isBestSeller: false,
    tag: "Limited",
  },
  {
    id: "bfkr-004",
    name: "Monogram Tee",
    price: 70,
    description:
      "Subtle tonal monogram on chest. Double-stitched hem. Washed black.",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-005",
    name: "Layered Longline Tee",
    price: 80,
    description:
      "Extended silhouette, split hem. Pairs with everything. Charcoal only.",
    category: "T-Shirts",
    sizes: ["M", "L", "XL", "XXL"],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "bfkr-006",
    name: "Essential Polo",
    price: 90,
    description:
      "French terry polo. Relaxed collar, tonal buttons. Weekend essential.",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L"],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-007",
    name: "Core Pullover Hoodie",
    price: 145,
    description:
      "450gsm French terry. Brushed interior. The hoodie you never take off.",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [PLACEHOLDER],
    isFeatured: true,
    isBestSeller: true,
    tag: "Best Seller",
  },
  {
    id: "bfkr-008",
    name: "Half-Zip Sweat",
    price: 130,
    description:
      "Ribbed cuffs, oversized zip. Off-white or charcoal. Season-less.",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    images: [PLACEHOLDER],
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "bfkr-009",
    name: "Coach Jacket",
    price: 195,
    description:
      "Nylon shell. Tonal embroidery at chest. Zip-through utility pockets.",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-010",
    name: "Fleece Zip-Up",
    price: 155,
    description:
      "Double-faced fleece. Stand collar. The layer between you and everything.",
    category: "Hoodies",
    sizes: ["M", "L", "XL", "XXL"],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "bfkr-011",
    name: "Crewneck Sweat",
    price: 120,
    description:
      "Classic crewneck silhouette. Slight drop shoulder, ribbed trims.",
    category: "Hoodies",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-012",
    name: "Drop 01 — Shadow Set",
    price: 240,
    description:
      "Full shadow set: hoodie + sweat pant. Charcoal edition. Drop only.",
    category: "Drops",
    sizes: ["S", "M", "L", "XL"],
    images: [PLACEHOLDER],
    isFeatured: true,
    isBestSeller: true,
    tag: "Drop",
  },
  {
    id: "bfkr-013",
    name: "Drop 02 — Void Cargo",
    price: 195,
    description: "6-pocket cargo pant. Relaxed taper. Limited to 200 units.",
    category: "Drops",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [PLACEHOLDER],
    isFeatured: true,
    isBestSeller: false,
    tag: "Limited",
  },
  {
    id: "bfkr-014",
    name: "Drop 03 — Washed Denim",
    price: 175,
    description: "Acid-washed black selvedge. Rigid cut. 12oz denim.",
    category: "Drops",
    sizes: ["30", "32", "34"] as unknown as ProductSize[],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: false,
    tag: "Drop",
  },
  {
    id: "bfkr-015",
    name: "Drop 04 — Tech Jogger",
    price: 145,
    description: "4-way stretch tech fabric. Tapered leg, hidden zip pockets.",
    category: "Drops",
    sizes: ["S", "M", "L", "XL"],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "bfkr-016",
    name: "Drop 05 — Nylon Pant",
    price: 165,
    description: "Ripstop nylon. Elasticated waist with drawcord. Black.",
    category: "Drops",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: false,
    tag: "Drop",
  },
  {
    id: "bfkr-017",
    name: "Signet Ring",
    price: 85,
    description:
      "925 sterling silver. Oxidised finish. Befikr signet engraved.",
    category: "Accessories",
    sizes: ["S", "M", "L"] as unknown as ProductSize[],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "bfkr-018",
    name: "Logo Cap",
    price: 55,
    description:
      "6-panel structured cap. Embroidered wordmark. Black or chalk.",
    category: "Accessories",
    sizes: ["ONE SIZE"] as unknown as ProductSize[],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "bfkr-019",
    name: "Canvas Tote",
    price: 45,
    description: "Heavy canvas 500gsm. Waxed handles. Internal zip pocket.",
    category: "Accessories",
    sizes: ["ONE SIZE"] as unknown as ProductSize[],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-020",
    name: "Beanie — Ribbed",
    price: 40,
    description: "100% merino wool. Folded cuff. Stays on. Doesn't itch.",
    category: "Accessories",
    sizes: ["ONE SIZE"] as unknown as ProductSize[],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-021",
    name: "Card Holder",
    price: 60,
    description:
      "Full-grain leather. 4 card slots, center cash slip. Slim as air.",
    category: "Accessories",
    sizes: ["ONE SIZE"] as unknown as ProductSize[],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-022",
    name: "Socks 3-Pack",
    price: 30,
    description: "Terry foot bed. Ribbed crew length. Logo woven at ankle.",
    category: "Accessories",
    sizes: ["ONE SIZE"] as unknown as ProductSize[],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-023",
    name: "Crossbody Bag",
    price: 110,
    description: "Nylon exterior, leather trim. Magnetic buckle. Black.",
    category: "Accessories",
    sizes: ["ONE SIZE"] as unknown as ProductSize[],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-024",
    name: "Utility Belt",
    price: 75,
    description: "Woven nylon. Adjustable slider buckle. Minimal hardware.",
    category: "Accessories",
    sizes: ["ONE SIZE"] as unknown as ProductSize[],
    images: [PLACEHOLDER],
    isFeatured: false,
    isBestSeller: false,
  },
];

export const getFeatured = () => products.filter((p) => p.isFeatured);
export const getBestSellers = () => products.filter((p) => p.isBestSeller);
export const getByCategory = (cat: ProductCategory) =>
  products.filter((p) => p.category === cat);
export const getById = (id: string) => products.find((p) => p.id === id);
export const categories: ProductCategory[] = [
  "T-Shirts",
  "Hoodies",
  "Drops",
  "Accessories",
];
