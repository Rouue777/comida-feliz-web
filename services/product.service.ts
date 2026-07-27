import { api } from "@/lib/api";

export async function getAllProducts(params: {
    page: number;
    limit: number;
}) {

    const response = await api.get("/products", {
        params,
    });

    return response.data;
}

//create products
export async function createProduct(data: {
    name: string;
    price: number;
    categoryId: string;
    available: boolean;
}) {
    return api.post("/products", data);
}

//pegando as categorias
export async function getCategorias() {

    const response = await api.get("/categories")

    return response.data
    
}

//atuailzando disponibiidade
export async function updateProductAvailability(
    id: string,
    available: boolean,
) {
    return api.patch(`/products/${id}/availability`, {
        available,
    });
}