import { CreateMealDto, MealSize } from "./meal";
import { OrderType, PaymentMethod } from "./orders";
import { CreateOrderExtraDto } from "./product";



export type CreateOrderDto = {
    phone: string;

    orderType: OrderType;

    paymentMethod: PaymentMethod;

    notes?: string;

    meals: CreateMealDto[];

    extras?: CreateOrderExtraDto[];
};