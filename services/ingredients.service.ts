import { api } from "@/lib/api";
import { create } from "domain";

//ilstar ingredietes
export async function getAllIngredients(params: {
    page: number;
    limit: number;
}) {

    const response = await api.get("/ingredients", {
        params,
    });

    return response.data;
}

//criacao de ingrediente no sistema
export async function createIngredient(data: {
    name: string;
    type: string;
}) {
    try {
        const response = await api.post("/ingredients", data);

        return response.data;
    } catch (error: any) {
        console.log(error.response?.data);
        throw error;
    }
}

//editar disponibiidades
export async function updateIngredientAvailability(
    id: string,
    available: boolean,
) {

    const response = await api.patch(
        `/ingredients/${id}/availability`,
        {
            available,
        },
    );

    return response.data;

}