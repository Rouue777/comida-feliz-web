import { api } from "@/lib/api";

//resumo dos pedidos conexao com api
export async function getDashboardSummary() {
  const response = await api.get("/dashboard/summary");

  return response.data.data;
}


///receebr fila da cozinha dados
export async function getKitchenQueue() {
    const response = await api.get("/dashboard/kitchen");

    return response.data.data;
}