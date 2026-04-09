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

export const products: Product[] = [
  // ── T-SHIRTS ──────────────────────────────────────────────────────────────
  {
    id: "bfkr-001",
    name: "Void Oversized Tee",
    price: 599,
    description:
      "Heavyweight 280gsm cotton. Dropped shoulders, extended hem. Built for the unbothered.",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=600&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    ],
    isFeatured: true,
    isBestSeller: true,
    tag: "Best Seller",
  },
  {
    id: "bfkr-002",
    name: "Chalk Boxy Tee",
    price: 499,
    description:
      "Off-white cotton jersey. Relaxed boxy cut, minimal branding at chest.",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "bfkr-003",
    name: "Archive Graphic Tee",
    price: 699,
    description:
      "Limited run. Screen-printed artwork on heavyweight cotton. Fades with life.",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1561740818-14a26f636fdb?w=600&q=80",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80",
      "https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=600&q=80",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
    ],
    isFeatured: true,
    isBestSeller: false,
    tag: "Limited",
  },
  {
    id: "bfkr-004",
    name: "Monogram Tee",
    price: 549,
    description:
      "Subtle tonal monogram on chest. Double-stitched hem. Washed black.",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80",
      "https://images.unsplash.com/photo-1604006852748-903fccbc4019?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-005",
    name: "Layered Longline Tee",
    price: 649,
    description:
      "Extended silhouette, split hem. Pairs with everything. Charcoal only.",
    category: "T-Shirts",
    sizes: ["M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
      "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "bfkr-006",
    name: "Essential Polo",
    price: 799,
    description:
      "French terry polo. Relaxed collar, tonal buttons. Weekend essential.",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1625910513538-5b4a81945b83?w=600&q=80",
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: false,
  },

  // ── HOODIES ───────────────────────────────────────────────────────────────
  {
    id: "bfkr-007",
    name: "Core Pullover Hoodie",
    price: 999,
    description:
      "450gsm French terry. Brushed interior. The hoodie you never take off.",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    ],
    isFeatured: true,
    isBestSeller: true,
    tag: "Best Seller",
  },
  {
    id: "bfkr-008",
    name: "Half-Zip Sweat",
    price: 899,
    description:
      "Ribbed cuffs, oversized zip. Off-white or charcoal. Season-less.",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
    ],
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "bfkr-009",
    name: "Coach Jacket",
    price: 1299,
    description:
      "Nylon shell. Tonal embroidery at chest. Zip-through utility pockets.",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-010",
    name: "Fleece Zip-Up",
    price: 1099,
    description:
      "Double-faced fleece. Stand collar. The layer between you and everything.",
    category: "Hoodies",
    sizes: ["M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=600&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&q=80",
      "https://images.unsplash.com/photo-1601369716984-c5f9a5a3e5f6?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "bfkr-011",
    name: "Crewneck Sweat",
    price: 849,
    description:
      "Classic crewneck silhouette. Slight drop shoulder, ribbed trims.",
    category: "Hoodies",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1565693413579-8ff3fdc1b03b?w=600&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: false,
  },

  // ── DROPS ─────────────────────────────────────────────────────────────────
  {
    id: "bfkr-012",
    name: "Drop 01 — Shadow Set",
    price: 999,
    description:
      "Full shadow set: hoodie + sweat pant. Charcoal edition. Drop only.",
    category: "Drops",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&q=80",
      "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=600&q=80",
      "https://images.unsplash.com/photo-1617952739353-fbb84bbaa22c?w=600&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    ],
    isFeatured: true,
    isBestSeller: true,
    tag: "Drop",
  },
  {
    id: "bfkr-013",
    name: "Drop 02 — Void Cargo",
    price: 849,
    description: "6-pocket cargo pant. Relaxed taper. Limited to 200 units.",
    category: "Drops",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=600&q=80",
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
    ],
    isFeatured: true,
    isBestSeller: false,
    tag: "Limited",
  },
  {
    id: "bfkr-014",
    name: "Drop 03 — Washed Denim",
    price: 799,
    description: "Acid-washed black selvedge. Rigid cut. 12oz denim.",
    category: "Drops",
    sizes: ["30", "32", "34"] as unknown as ProductSize[],
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80",
      "https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: false,
    tag: "Drop",
  },
  {
    id: "bfkr-015",
    name: "Drop 04 — Tech Jogger",
    price: 749,
    description: "4-way stretch tech fabric. Tapered leg, hidden zip pockets.",
    category: "Drops",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "bfkr-016",
    name: "Drop 05 — Nylon Pant",
    price: 699,
    description: "Ripstop nylon. Elasticated waist with drawcord. Black.",
    category: "Drops",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80",
      "https://images.unsplash.com/photo-1609873814058-a8928924184a?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: false,
    tag: "Drop",
  },

  // ── ACCESSORIES ───────────────────────────────────────────────────────────
  {
    id: "bfkr-017",
    name: "Signet Ring",
    price: 399,
    description:
      "925 sterling silver. Oxidised finish. Befikr signet engraved.",
    category: "Accessories",
    sizes: ["S", "M", "L"] as unknown as ProductSize[],
    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "bfkr-018",
    name: "Logo Cap",
    price: 349,
    description:
      "6-panel structured cap. Embroidered wordmark. Black or chalk.",
    category: "Accessories",
    sizes: ["ONE SIZE"] as unknown as ProductSize[],
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80",
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "bfkr-019",
    name: "Canvas Tote",
    price: 299,
    description: "Heavy canvas 500gsm. Waxed handles. Internal zip pocket.",
    category: "Accessories",
    sizes: ["ONE SIZE"] as unknown as ProductSize[],
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-020",
    name: "Beanie — Ribbed",
    price: 349,
    description: "100% merino wool. Folded cuff. Stays on. Doesn't itch.",
    category: "Accessories",
    sizes: ["ONE SIZE"] as unknown as ProductSize[],
    images: [
      "https://images.unsplash.com/photo-1605695329954-1ba7d3c9a4e7?w=600&q=80",
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-021",
    name: "Card Holder",
    price: 399,
    description:
      "Full-grain leather. 4 card slots, center cash slip. Slim as air.",
    category: "Accessories",
    sizes: ["ONE SIZE"] as unknown as ProductSize[],
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
      "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-022",
    name: "Socks 3-Pack",
    price: 299,
    description: "Terry foot bed. Ribbed crew length. Logo woven at ankle.",
    category: "Accessories",
    sizes: ["ONE SIZE"] as unknown as ProductSize[],
    images: [
      "https://images.unsplash.com/photo-1582791694770-cbdc9dda338f?w=600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-023",
    name: "Crossbody Bag",
    price: 499,
    description: "Nylon exterior, leather trim. Magnetic buckle. Black.",
    category: "Accessories",
    sizes: ["ONE SIZE"] as unknown as ProductSize[],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    ],
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "bfkr-024",
    name: "Utility Belt",
    price: 349,
    description: "Woven nylon. Adjustable slider buckle. Minimal hardware.",
    category: "Accessories",
    sizes: ["ONE SIZE"] as unknown as ProductSize[],
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
    ],
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
