import { Order } from "@/types/orders";
import { useState } from "react";


type UpdateStatusModalProps = {
    order: Order | null;
    open: boolean;
    onClose: () => void;
    onSave: (id: string, status: string) => void;
};

export function UpdateStatusModal({
    order,
    open,
    onClose,
    onSave,

}: UpdateStatusModalProps) {



    if (!open || !order) {
        return null;
    }

    const [status, setStatus] = useState(order.status);

    return (

        <div
            className="
                fixed
                inset-0
                bg-black/50
                flex
                items-center
                justify-center
                z-50
            "
        >

            <div
                className="
                    bg-white
                    rounded-xl
                    shadow-xl
                    w-full
                    max-w-md
                    p-8
                "
            >

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">
                        Alterar Status
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-xl hover:text-red-500"
                    >
                        ✕
                    </button>

                </div>

                <p className="mb-6 text-gray-600">

                    Pedido #{order.orderNumber}

                </p>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="
        w-full
        border
        rounded-lg
        p-3
    "
                >

                    <option value="CONFIRMED">Confirmado</option>

                    <option value="PREPARING">Preparando</option>

                    <option value="READY">Pronto</option>

                    <option value="OUT_FOR_DELIVERY">Em entrega</option>

                    <option value="WAITING_PICKUP">Aguardando retirada</option>

                    <option value="FINISHED">Finalizado</option>

                    <option value="CANCELED">Cancelado</option>

                </select>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="
                            px-5
                            py-2
                            rounded-lg
                            border
                        "
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={() => onSave(order.id, status)}
                        className="
        px-5
        py-2
        rounded-lg
        bg-green-600
        text-white
    "
                    >
                        Salvar
                    </button>

                </div>

            </div>

        </div>

    );

}