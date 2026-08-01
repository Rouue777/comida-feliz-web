"use client";

import { useState } from "react";
import { Customer } from "@/types/customer";
import { createCustomer } from "@/services/customer.service";

type CreateCustomerModalProps = {
    open: boolean;
    phone: string;
    onClose: () => void;
    onCreated: (customer: Customer) => void;
};

export function CreateCustomerModal({
    open,
    phone,
    onClose,
    onCreated,
}: CreateCustomerModalProps) {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    async function handleCreate() {

        const response = await createCustomer({
            name,
            phone,
            address,
        });

        onCreated(response.data);

        onClose();

    }

    if (!open) {
        return null;
    }

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">

                <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-bold">
                        Novo Cliente
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 text-xl"
                    >
                        ✕
                    </button>

                </div>

                <hr className="my-6" />

                <div className="space-y-5">

                    <div>

                        <label className="block mb-2 font-medium">
                            Telefone
                        </label>

                        <input
                            type="text"
                            value={phone}
                            disabled
                            className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            Nome
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3"
                            placeholder="Nome do cliente"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            Endereço
                        </label>

                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3"
                            placeholder="Endereço (opcional)"
                        />

                    </div>

                    <div className="flex justify-end gap-3 mt-8">

                        <button
                            onClick={onClose}
                            className="px-5 py-3 border rounded-lg"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleCreate}
                            className="px-5 py-3 bg-green-600 text-white rounded-lg"
                        >
                            Salvar
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}