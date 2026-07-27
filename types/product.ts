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