export type Product = {
    id: string;
    name: string;
    price: number;
    available: boolean;
    category: {
        id: string;
        name: string;
    };
};


export type OrderExtraDraft = {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}


export type CreateOrderExtraDto = {
    productId: string;
    quantity: number;
};