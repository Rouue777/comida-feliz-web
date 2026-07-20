import { api } from "@/lib/api";

export async function getRecentOrders() {
  const response = await api.get("/dashboard/recent-orders");

  return response.data.data;
}