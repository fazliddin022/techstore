export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "phone" | "laptop" | "headphone" | "tablet";
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  specs: string[];
  inStock: boolean;
  badge?: "New" | "Sale" | "Popular";
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartStore = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
};