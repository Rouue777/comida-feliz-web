import { api } from "@/lib/api";

//pegar categorias

export async function getAllCategories(){

    const response = await api.get("/categories")

    return response.data
}