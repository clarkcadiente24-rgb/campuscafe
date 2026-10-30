export type MenuCategory =
  | "Coffee"
  | "Meals"
  | "Snacks"
  | "Drinks"
  | "Desserts";

export type OrderStatus = "Preparing" | "Ready" | "Picked up";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  available: boolean;
}

export const menuCategories: MenuCategory[] = [
  "Coffee",
  "Meals",
  "Snacks",
  "Drinks",
  "Desserts",
];

export const pickupSlots = [
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
];

export const menuItems: MenuItem[] = [
  {
    id: "C-01",
    name: "Spanish Latte",
    description: "Espresso with steamed milk and a touch of sweetness.",
    price: 120,
    category: "Coffee",
    available: true,
  },
  {
    id: "C-02",
    name: "Americano",
    description: "Bold espresso shots topped with hot water.",
    price: 95,
    category: "Coffee",
    available: true,
  },
  {
    id: "C-03",
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and foam.",
    price: 110,
    category: "Coffee",
    available: true,
  },
  {
    id: "C-04",
    name: "Caramel Macchiato",
    description: "Vanilla milk, espresso, and a caramel drizzle.",
    price: 135,
    category: "Coffee",
    available: true,
  },
  {
    id: "M-01",
    name: "Chicken Adobo Rice Bowl",
    description: "Slow-cooked adobo chicken with garlic rice and egg.",
    price: 150,
    category: "Meals",
    available: true,
  },
  {
    id: "M-02",
    name: "Beef Tapa Silog",
    description: "Cured beef strips with garlic rice and fried egg.",
    price: 165,
    category: "Meals",
    available: true,
  },
  {
    id: "M-03",
    name: "Veggie Pasta",
    description: "Penne in tomato basil sauce with roasted vegetables.",
    price: 140,
    category: "Meals",
    available: true,
  },
  {
    id: "M-04",
    name: "Grilled Cheese Sandwich",
    description: "Three-cheese blend on toasted sourdough.",
    price: 110,
    category: "Meals",
    available: false,
  },
  {
    id: "S-01",
    name: "Cheesy Nachos",
    description: "Corn chips with cheese sauce and salsa.",
    price: 90,
    category: "Snacks",
    available: true,
  },
  {
    id: "S-02",
    name: "French Fries",
    description: "Crispy fries with sea salt and dipping sauce.",
    price: 75,
    category: "Snacks",
    available: true,
  },
  {
    id: "S-03",
    name: "Pork Siomai (6 pcs)",
    description: "Steamed dumplings with soy-calamansi dip.",
    price: 85,
    category: "Snacks",
    available: true,
  },
  {
    id: "D-01",
    name: "Iced Lemon Tea",
    description: "Freshly brewed tea with lemon and ice.",
    price: 70,
    category: "Drinks",
    available: true,
  },
  {
    id: "D-02",
    name: "Fresh Mango Shake",
    description: "Ripe mango blended with milk and ice.",
    price: 95,
    category: "Drinks",
    available: true,
  },
  {
    id: "D-03",
    name: "Bottled Water",
    description: "Chilled 500 ml bottled water.",
    price: 30,
    category: "Drinks",
    available: true,
  },
  {
    id: "DS-01",
    name: "Chocolate Chip Cookie",
    description: "Soft-baked cookie loaded with chocolate chips.",
    price: 45,
    category: "Desserts",
    available: true,
  },
  {
    id: "DS-02",
    name: "Blueberry Cheesecake",
    description: "Creamy cheesecake with a blueberry topping.",
    price: 120,
    category: "Desserts",
    available: false,
  },
  {
    id: "DS-03",
    name: "Leche Flan",
    description: "Silky caramel custard, a Filipino classic.",
    price: 80,
    category: "Desserts",
    available: true,
  },
];

export function formatPrice(amount: number) {
  return `₱${amount.toLocaleString("en-US")}`;
}
