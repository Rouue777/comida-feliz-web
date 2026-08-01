import { api } from "@/lib/api";
import { CreateOrderDto } from "@/types/createOrderDto";
import { AsyncCallbackSet } from "next/dist/server/lib/async-callback-set";

//pegar pedidos recentes
export async function getRecentOrders() {
  const response = await api.get("/dashboard/recent-orders");

  return response.data.data;
}

//pegar todos pedidos
export async function getAllOrders(filters?: {
  phone?: string;
  status?: string;
  date?: string;
  page?: number;
  limit?: number;
}) {

  const response = await api.get("/orders", {
    params: filters,
  });

  return response.data;
}


//atualizar statusc
export async function updateOrderStatus(
    id: string,
    status: string,
) {

    const response = await api.patch(`/orders/${id}/status`, {
        status,
    });

    return response.data;

}

//pegar preco da marmita
export async function MealPrice() {

  const response = await api.get("orders/meal/prices")

  return response.data
}


//criar pedido 
export async function createOrder(data: CreateOrderDto) {

    const response = await api.post("/orders", data);

    return response.data;

}