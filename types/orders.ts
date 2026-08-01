export interface Order {
  id: string;
  orderNumber: number;
  customerId: string;
  userId: string;

  type: "DELIVERY" | "PICKUP";

  status:
    | "CONFIRMED"
    | "PREPARING"
    | "READY"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED";

  total: string;

  createdAt: string;
  updatedAt: string;

  customer: Customer;

  meals: Meal[];

  products: OrderProduct[];

  payment: Payment;
}

interface Customer {
  name: string;
  phone: string;
}

interface Meal {
  id: string;
  orderId: string;

  size: "M" | "G";

  proteinId: string;
  beanId: string;
  quantity: number;

  unitPrice: string;
  subtotal: string;

  observation: string | null;

  createdAt: string;
  updatedAt: string;

  protein: Ingredient;

  bean: Ingredient;

  bases: MealBase[];
}

interface MealBase {
  id: string;

  mealId: string;

  ingredientId: string;

  createdAt: string;

  ingredient: Ingredient;
}

interface Ingredient {
  id: string;

  name: string;

  type: string;

  available: boolean;

  createdAt: string;

  updatedAt: string;
}

interface OrderProduct {
  id: string;

  orderId: string;

  productId: string;

  quantity: number;

  unitPrice: string;

  subtotal: string;

  createdAt: string;

  updatedAt: string;

  product: Product;
}

interface Product {
  id: string;

  categoryId: string;

  name: string;

  price: string;

  available: boolean;

  createdAt: string;

  updatedAt: string;
}

interface Payment {
  id: string;

  orderId: string;

  method: "PIX" | "CASH" | "CREDIT_CARD" | "DEBIT_CARD";

  status: "PENDING" | "PAID" | "REFUNDED";

  amount: string;

  paidAt: string | null;

  createdAt: string;

  updatedAt: string;
}

export type OrderType =
    | "DELIVERY"
    | "TAKEAWAY"
    | "DINE_IN";

export type PaymentMethod =
    | "PIX"
    | "CASH"
    | "CREDIT_CARD"
    | "DEBIT_CARD";

    


