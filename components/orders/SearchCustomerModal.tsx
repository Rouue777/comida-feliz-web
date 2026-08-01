import { useState } from "react";
import { getCustomerByPhone } from "@/services/customer.service";
import { Customer } from "@/types/customer";

type SearchCustomerModalProps = {
    open: boolean;
    onClose: () => void;
    onCustomerFound: (customer: Customer) => void;
    onCustomerNotFound: (phone: string) => void;
};

export function SearchCustomerModal({
    open,
    onClose,
    onCustomerFound,
    onCustomerNotFound,
}: SearchCustomerModalProps) {

    const [phone, setPhone] = useState("");

    //para gerenciar busca de clientes 
async function handleSearch() {

    try {

        const response = await getCustomerByPhone(phone);

        onClose();

        onCustomerFound(response.data);

    } catch {

        onClose();

        onCustomerNotFound(phone);

    }

}

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">

                <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-bold">
                        Novo Pedido
                    </h2>

                    <button onClick={onClose}>
                        ✕
                    </button>

                </div>

                <hr className="my-6" />

                <div className="space-y-5">

                    <div>

                        <label>Telefone</label>

                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(11) 99999-9999"
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            onClick={onClose}
                            className="px-5 py-3 border rounded-lg"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleSearch}
                            className="px-5 py-3 bg-green-600 text-white rounded-lg"
                        >
                            Buscar Cliente
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}