import { KitchenQueueOrder } from "@/types/kitchenQueue";
import {
    ChefHat,
    User,
    Clock3,
    Bike,
    ShoppingBag,
} from "lucide-react";


//function para poder exibir car de acorco com estado do pedido
function getStatusStyle(status: string) {
    switch (status) {
        case "READY":
            return "bg-green-100 text-green-700";

        case "PREPARING":
            return "bg-yellow-100 text-yellow-700";

        case "CONFIRMED":
            return "bg-blue-100 text-blue-700";

        case "DELIVERED":
            return "bg-purple-100 text-purple-700";

        case "CANCELLED":
            return "bg-red-100 text-red-700";

        default:
            return "bg-gray-100 text-gray-700";
    }
}

//traduzindo os nomes 
function translateStatus(status: string) {
    switch (status) {
        case "READY":
            return "Pronto";

        case "PREPARING":
            return "Preparando";

        case "CONFIRMED":
            return "Confirmado";

        case "DELIVERED":
            return "Entregue";

        case "CANCELLED":
            return "Cancelado";

        default:
            return status;
    }
}

///function para exibir o tempo que o pedido foi feito
export function getTimeAgo(date: string) {
    const now = new Date();
    const createdAt = new Date(date);

    const diff = Math.floor(
        (now.getTime() - createdAt.getTime()) / 1000
    );

    if (diff < 60) {
        return `Há ${diff} segundos`;
    }

    const minutes = Math.floor(diff / 60);

    if (minutes < 60) {
        return `Há ${minutes} minuto${minutes > 1 ? "s" : ""}`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `Há ${hours} hora${hours > 1 ? "s" : ""}`;
    }

    const days = Math.floor(hours / 24);

    return `Há ${days} dia${days > 1 ? "s" : ""}`;
}

type KitchenQueueItemProps = {
    order: KitchenQueueOrder;
};

export function KitchenQueueItem({
    order,
}: KitchenQueueItemProps) {
    return (
        <div
            className="
            bg-gray-50
            border
            rounded-xl
            p-4
            shadow-sm
            hover:shadow-md
            transition
            duration-200
        "
        >

            <div className="flex justify-between items-center">

                <h3 className="font-bold text-lg">
                    🍽 Pedido #{order.orderNumber}
                </h3>

                <span
                    className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-semibold
        ${getStatusStyle(order.status)}
    `}
                >
                    {translateStatus(order.status)}
                </span>

            </div>

            <div className="mt-4 flex items-center gap-2 text-gray-600">

                <User size={18} />

                <span>{order.customer.name}</span>

            </div>

            <div className="mt-2 flex items-center gap-2 text-gray-600">

                {order.type === "DELIVERY" ? (
                    <Bike size={18} />
                ) : (
                    <ShoppingBag size={18} />
                )}

                <span>{order.type}</span>

            </div>

            <hr className="my-4" />

            {order.meals.map((meal) => (

                <div
                    key={meal.id}
                    className="
            border
            rounded-lg
            p-4
            bg-white
            mb-4
        "
                >

                    <h4 className="font-semibold text-lg mb-4">
                        🍱 Marmita {meal.size}
                    </h4>

                    <div className="mb-3">

                        <p className="text-sm text-gray-500">
                            Proteína
                        </p>

                        <p className="font-medium">
                            🥩 {meal.protein.name}
                        </p>

                    </div>

                    <div className="mb-3">

                        <p className="text-sm text-gray-500">
                            Bases
                        </p>

                        <ul className="ml-5 list-disc">

                            {meal.bases.map((base) => (

                                <li key={base.id}>

                                    {base.ingredient.name}

                                </li>

                            ))}

                        </ul>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Feijão
                        </p>

                        <p>
                            🫘 {meal.bean.name}
                        </p>

                    </div>

                </div>

            ))}

            {order.products.length > 0 && (

                <div className="mt-4">

                    <h4 className="font-semibold mb-2">
                        🥤 Extras
                    </h4>

                    <ul className="space-y-1">

                        {order.products.map((product) => (

                            <li
                                key={product.id}
                            >

                                • {product.product.name} x{product.quantity}

                            </li>

                        ))}

                    </ul>

                </div>

            )}

            <hr className="my-4" />

            <div
                className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-500
            "
            >

                <Clock3 size={16} />

                <span>
                    {getTimeAgo(order.createdAt)}
                </span>

            </div>

        </div>
    );
}