export type MenuCategory =
  | "Coffee"
  | "Meals"
  | "Snacks"
  | "Drinks"
  | "Desserts";

export interface MenuSize {
  label: string;
  priceDelta: number;
}

export interface MenuAddOn {
  id: string;
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  available: boolean;
  prepMinutes: number;
  rating: number;
  reviews: number;
  featured: boolean;
  sizes?: MenuSize[];
  addOns?: MenuAddOn[];
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

const coffeeSizes: MenuSize[] = [
  { label: "Regular", priceDelta: 0 },
  { label: "Large", priceDelta: 30 },
];

const drinkSizes: MenuSize[] = [
  { label: "Regular", priceDelta: 0 },
  { label: "Large", priceDelta: 20 },
];

const mealSizes: MenuSize[] = [
  { label: "Regular", priceDelta: 0 },
  { label: "Large", priceDelta: 40 },
];

const coffeeAddOns: MenuAddOn[] = [
  { id: "extra-shot", label: "Extra espresso shot", price: 25 },
  { id: "oat-milk", label: "Oat milk", price: 20 },
  { id: "vanilla", label: "Vanilla syrup", price: 15 },
];

const mealAddOns: MenuAddOn[] = [
  { id: "extra-rice", label: "Extra garlic rice", price: 20 },
  { id: "fried-egg", label: "Fried egg", price: 15 },
  { id: "extra-sauce", label: "Extra sauce", price: 10 },
];

const snackAddOns: MenuAddOn[] = [
  { id: "extra-cheese", label: "Extra cheese", price: 15 },
  { id: "extra-dip", label: "Extra dip", price: 10 },
];

const drinkAddOns: MenuAddOn[] = [
  { id: "less-sugar", label: "Less sugar", price: 0 },
  { id: "extra-ice", label: "Extra ice", price: 0 },
];

export const menuItems: MenuItem[] = [
  {
    id: "C-01",
    name: "Spanish Latte",
    description: "Espresso with steamed milk and a touch of sweetness.",
    price: 120,
    category: "Coffee",
    available: true,
    prepMinutes: 4,
    rating: 4.8,
    reviews: 126,
    featured: true,
    sizes: coffeeSizes,
    addOns: coffeeAddOns,
  },
  {
    id: "C-02",
    name: "Americano",
    description: "Bold espresso shots topped with hot water.",
    price: 95,
    category: "Coffee",
    available: true,
    prepMinutes: 3,
    rating: 4.5,
    reviews: 84,
    featured: false,
    sizes: coffeeSizes,
    addOns: coffeeAddOns,
  },
  {
    id: "C-03",
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and foam.",
    price: 110,
    category: "Coffee",
    available: true,
    prepMinutes: 4,
    rating: 4.6,
    reviews: 71,
    featured: false,
    sizes: coffeeSizes,
    addOns: coffeeAddOns,
  },
  {
    id: "C-04",
    name: "Caramel Macchiato",
    description: "Vanilla milk, espresso, and a caramel drizzle.",
    price: 135,
    category: "Coffee",
    available: true,
    prepMinutes: 5,
    rating: 4.9,
    reviews: 158,
    featured: true,
    sizes: coffeeSizes,
    addOns: coffeeAddOns,
  },
  {
    id: "M-01",
    name: "Chicken Adobo Rice Bowl",
    description: "Slow-cooked adobo chicken with garlic rice and egg.",
    price: 150,
    category: "Meals",
    available: true,
    prepMinutes: 12,
    rating: 4.7,
    reviews: 203,
    featured: true,
    sizes: mealSizes,
    addOns: mealAddOns,
  },
  {
    id: "M-02",
    name: "Beef Tapa Silog",
    description: "Cured beef strips with garlic rice and fried egg.",
    price: 165,
    category: "Meals",
    available: true,
    prepMinutes: 13,
    rating: 4.6,
    reviews: 142,
    featured: false,
    sizes: mealSizes,
    addOns: mealAddOns,
  },
  {
    id: "M-03",
    name: "Veggie Pasta",
    description: "Penne in tomato basil sauce with roasted vegetables.",
    price: 140,
    category: "Meals",
    available: true,
    prepMinutes: 11,
    rating: 4.4,
    reviews: 66,
    featured: false,
    sizes: mealSizes,
    addOns: mealAddOns,
  },
  {
    id: "M-04",
    name: "Grilled Cheese Sandwich",
    description: "Three-cheese blend on toasted sourdough.",
    price: 110,
    category: "Meals",
    available: false,
    prepMinutes: 8,
    rating: 4.3,
    reviews: 49,
    featured: false,
    sizes: mealSizes,
    addOns: mealAddOns,
  },
  {
    id: "S-01",
    name: "Cheesy Nachos",
    description: "Corn chips with cheese sauce and salsa.",
    price: 90,
    category: "Snacks",
    available: true,
    prepMinutes: 7,
    rating: 4.5,
    reviews: 93,
    featured: false,
    addOns: snackAddOns,
  },
  {
    id: "S-02",
    name: "French Fries",
    description: "Crispy fries with sea salt and dipping sauce.",
    price: 75,
    category: "Snacks",
    available: true,
    prepMinutes: 6,
    rating: 4.7,
    reviews: 187,
    featured: true,
    addOns: snackAddOns,
  },
  {
    id: "S-03",
    name: "Pork Siomai (6 pcs)",
    description: "Steamed dumplings with soy-calamansi dip.",
    price: 85,
    category: "Snacks",
    available: true,
    prepMinutes: 8,
    rating: 4.6,
    reviews: 112,
    featured: false,
    addOns: snackAddOns,
  },
  {
    id: "D-01",
    name: "Iced Lemon Tea",
    description: "Freshly brewed tea with lemon and ice.",
    price: 70,
    category: "Drinks",
    available: true,
    prepMinutes: 3,
    rating: 4.4,
    reviews: 77,
    featured: false,
    sizes: drinkSizes,
    addOns: drinkAddOns,
  },
  {
    id: "D-02",
    name: "Fresh Mango Shake",
    description: "Ripe mango blended with milk and ice.",
    price: 95,
    category: "Drinks",
    available: true,
    prepMinutes: 4,
    rating: 4.8,
    reviews: 134,
    featured: true,
    sizes: drinkSizes,
    addOns: drinkAddOns,
  },
  {
    id: "D-03",
    name: "Bottled Water",
    description: "Chilled 500 ml bottled water.",
    price: 30,
    category: "Drinks",
    available: true,
    prepMinutes: 1,
    rating: 4.1,
    reviews: 58,
    featured: false,
    sizes: drinkSizes,
    addOns: drinkAddOns,
  },
  {
    id: "DS-01",
    name: "Chocolate Chip Cookie",
    description: "Soft-baked cookie loaded with chocolate chips.",
    price: 45,
    category: "Desserts",
    available: true,
    prepMinutes: 2,
    rating: 4.5,
    reviews: 96,
    featured: false,
  },
  {
    id: "DS-02",
    name: "Blueberry Cheesecake",
    description: "Creamy cheesecake with a blueberry topping.",
    price: 120,
    category: "Desserts",
    available: false,
    prepMinutes: 3,
    rating: 4.7,
    reviews: 81,
    featured: false,
  },
  {
    id: "DS-03",
    name: "Leche Flan",
    description: "Silky caramel custard, a Filipino classic.",
    price: 80,
    category: "Desserts",
    available: true,
    prepMinutes: 3,
    rating: 4.6,
    reviews: 64,
    featured: false,
  },
];

export function formatPrice(amount: number) {
  return `₱${amount.toLocaleString("en-US")}`;
}
