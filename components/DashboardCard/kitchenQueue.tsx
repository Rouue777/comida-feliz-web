import { KitchenQueueOrder as KitchenQueueType } from "@/types/kitchenQueue";
import { KitchenQueueItem } from "../DashboardCard/kitchenQueueItem";
import { Card } from "../ui/card";

type KitchenQueueProps = {
    orders: KitchenQueueType[];
};

export function KitchenQueue({
    orders,
}: KitchenQueueProps) {
    return (
       
        <div
            className="
                w-full

                bg-white
                rounded-xl
                shadow-md
                

                p-6

                h-[75vh]

                flex
                flex-col
            "
        >

            <h2
                className="
                    text-2xl
                    font-bold
                    flex-shrink-0
                "
            >
                Fila da Cozinha
            </h2>

            <div
                className="
                    mt-6
                    flex-1
                    overflow-y-auto
                    pr-2
                "
            >

                {orders.length === 0 ? (

                    <p className="text-gray-500">
                        Nenhum pedido na fila.
                    </p>

                ) : (

                    <div className="space-y-4">

                        {orders.map((order) => (
                            <KitchenQueueItem
                                key={order.id}
                                order={order}
                            />
                        ))}

                    </div>

                )}

            </div>

        </div>
     
    );
}