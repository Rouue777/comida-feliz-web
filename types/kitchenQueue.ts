export interface KitchenQueueOrder {
  id: string;
  orderNumber: number;
  status: string;
  total: string;
  createdAt: string;

  type: "DELIVERY" | "PICKUP";

  customer: {
    name: string;
    phone: string;
  };

  meals: Meal[];

  products: OrderProduct[];
}

interface Meal {
  id: string;
  size: string;

  protein: {
    id: string;
    name: string;
  };

  bean: {
    id: string;
    name: string;
  };

  bases: MealBase[];
}

interface MealBase {
  id: string;

  ingredient: {
    id: string;
    name: string;
  };
}

interface OrderProduct {
  id: string;

  quantity: number;

  product: {
    id: string;
    name: string;
  };
}