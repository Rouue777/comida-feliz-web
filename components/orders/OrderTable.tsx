import { Order } from "@/types/orders";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderActions } from "./OrderActions";
import { UpdateStatusModal } from "@/components/orders/updateStatusModal";
import { Card } from "../ui/card";


type OrderTableProps = {
    orders: Order[];
    onView: (order: Order) => void;
    onEdit: (order: Order) => void;
};

export function OrderTable({
    orders,
    onView,
    onEdit,
}: OrderTableProps) {

    console.log(orders);
    return (
        <Card>


            <table className="w-full">

                <thead
                    className="
                        bg-gray-100
                        text-gray-700
                    "
                >

                    <tr>

                        <th className="text-left p-4">
                            Pedido
                        </th>

                        <th className="text-left p-4">
                            Cliente
                        </th>

                        <th className="text-left p-4">
                            Tipo
                        </th>

                        <th className="text-left p-4">
                            Status
                        </th>

                        <th className="text-left p-4">
                            Total
                        </th>

                        <th className="text-left p-4">
                            Data
                        </th>

                        <th className="text-center p-4">
                            Ações
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {orders.length === 0 ? (

                        <tr>

                            <td
                                colSpan={7}
                                className="
                                    p-10
                                    text-center
                                    text-gray-500
                                "
                            >

                                Nenhum pedido encontrado.

                            </td>

                        </tr>

                    ) : (

                        orders.map((order) => (

                            <tr
                                key={order.id}
                                className="
                                    border-t
                                    hover:bg-gray-50
                                "
                            >

                                <td className="p-4">
                                    #{order.orderNumber}
                                </td>

                                <td className="p-4">
                                    {order.customer.name}
                                </td>

                                <td className="p-4">
                                    {order.type}
                                </td>

                                <td className="p-4">
                                    <OrderStatusBadge
                                        status={order.status}
                                    />
                                </td>

                                <td className="p-4">
                                    R$ {Number(order.total).toFixed(2)}
                                </td>

                                <td className="p-4">
                                    {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                                </td>

                                <td className="p-4 text-center">

                                    <OrderActions
                                        onView={() => onView(order)}
                                        onEdit={() => onEdit(order)}
                                    />

                                </td>
                            </tr>

                        ))

                    )}

                </tbody>

            </table>


        </Card>

    );

}