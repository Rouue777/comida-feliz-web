import { api } from "@/lib/api";
import { Customer } from "@/types/customer";

export async function getCustomerByPhone(phone: string) {

    const response = await api.get(`/customers/${phone}`);

    return response.data;

}

//create customer
type CreateCustomerDTO = {
    name: string;
    phone: string;
    address?: string;
};

export async function createCustomer(data: CreateCustomerDTO) {

    const response = await api.post("/customers/cadastrar", data);

    return response.data;

}