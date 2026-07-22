import { Order } from "@/types/orders";

type OrderDetailsModalProps = {
    order: Order | null;
    open: boolean;
    onClose: () => void;
};

export function OrderDetailsModal({
    order,
    open,
    onClose,
}: OrderDetailsModalProps) {

    if (!open || !order) {
        return null;
    }

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
        max-w-4xl
        max-h-[90vh]
        overflow-y-auto
        p-8
    "
>

                <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-bold">

                        Pedido #{order.orderNumber}

                    </h2>

                    <button
                        onClick={onClose}
                        className="
                            text-gray-500
                            hover:text-red-500
                            text-xl
                        "
                    >
                        ✕
                    </button>

                </div>

                <hr className="my-6" />

                <div className="grid grid-cols-2 gap-6">

                    <div>

                        <p className="text-sm text-gray-500">
                            Cliente
                        </p>

                        <p className="font-semibold">
                            {order.customer.name}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Telefone
                        </p>

                        <p className="font-semibold">
                            {order.customer.phone}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Tipo
                        </p>

                        <p className="font-semibold">
                            {order.type}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Status
                        </p>

                        <p className="font-semibold">
                            {order.status}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Pagamento
                        </p>

                        <p className="font-semibold">
                            {order.payment.method}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Total
                        </p>

                        <p className="font-semibold">
                            R$ {order.total}
                        </p>

                    </div>

                    <div className="col-span-2">

                        <p className="text-sm text-gray-500">
                            Criado em
                        </p>

                        <p className="font-semibold">
                            {new Date(order.createdAt).toLocaleString("pt-BR")}
                        </p>

                    </div>

                </div>

                <hr className="my-8" />

                <h3 className="text-xl font-bold mb-6">
                    Marmitas
                </h3>

                <div className="space-y-6">

                    {order.meals.map((meal) => (

                        <div
                            key={meal.id}
                            className="
                border
                rounded-xl
                p-5
                bg-gray-50
            "
                        >

                            <h4 className="font-bold text-lg mb-4">
                                🍱 Marmita {meal.size}
                            </h4>

                            <div className="grid grid-cols-2 gap-6">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Proteína
                                    </p>

                                    <p className="font-semibold">
                                        {meal.protein.name}
                                    </p>

                                </div>

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Feijão
                                    </p>

                                    <p className="font-semibold">
                                        {meal.bean.name}
                                    </p>

                                </div>

                            </div>

                            <div className="mt-5">

                                <p className="text-sm text-gray-500 mb-2">
                                    Bases
                                </p>

                                <ul className="list-disc ml-6">

                                    {meal.bases.map((base) => (

                                        <li key={base.id}>
                                            {base.ingredient.name}
                                        </li>

                                    ))}

                                </ul>

                            </div>

                            <div className="mt-5">

                                <p className="text-sm text-gray-500">
                                    Observação
                                </p>

                                <p className="font-semibold">
                                    {meal.observation || "Sem observações"}
                                </p>

                            </div>

                        </div>
                    
                        

                    ))}

                </div>
                    
                    <hr className="my-8" />

<h3 className="text-xl font-bold mb-6">
    Produtos Extras
</h3>

{order.products.length === 0 ? (

    <p className="text-gray-500">
        Nenhum produto adicional.
    </p>

) : (

    <div className="space-y-4">

        {order.products.map((product) => (

            <div
                key={product.id}
                className="
                    flex
                    justify-between
                    items-center
                    border
                    rounded-lg
                    p-4
                "
            >

                <div>

                    <p className="font-semibold">
                        {product.product.name}
                    </p>

                    <p className="text-sm text-gray-500">
                        Quantidade: {product.quantity}
                    </p>

                </div>

                <div className="text-right">

                    <p className="font-semibold">
                        R$ {product.subtotal}
                    </p>

                </div>

            </div>

        ))}

    </div>

)}

            </div>

        </div>

    );

}