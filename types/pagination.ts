import { Order } from "./orders";

export interface OrdersPagination {

    data: Order[];

    total: number;

    page: number;

    limit: number;

    totalPages: number;

}