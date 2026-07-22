import { api } from "@/lib/api";
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