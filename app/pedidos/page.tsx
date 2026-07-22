"use client";

import { useEffect, useState } from "react";
import { getAllOrders } from "@/services/orders.service";
import { Order } from "@/types/orders";
import { OrderTable } from "@/components/orders/OrderTable";
import { OrderDetailsModal } from "@/components/orders/OrderDetailsModal";
import { UpdateStatusModal } from "@/components/orders/updateStatusModal";
import { updateOrderStatus } from "@/services/orders.service";
import { OrderFilters } from "@/components/orders/OrderFilters";
import { OrderPagination } from "@/components/orders/OrderPagination";



export default function OrdersPage() {
    //estados da pagina para gerenciamento da paginacao
    const [orders, setOrders] = useState<Order[]>([]);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    //estados dos modais de details
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const [modalOpen, setModalOpen] = useState(false);

    //estado dos modais de edit
    const [selectedOrderStatus, setSelectedOrderStatus] = useState<Order | null>(null);

    const [statusModalOpen, setStatusModalOpen] = useState(false)

    //estadps para mudar pesquisa conforme o status
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");


    //function para gerenciar modal edit
    function handleEdit(order: Order) {

        setSelectedOrderStatus(order);

        setStatusModalOpen(true);

    }

    function handleCloseStatus() {

        setStatusModalOpen(false);

        setSelectedOrderStatus(null);

    }

    //salvar o status 
    async function handleSaveStatus(
        id: string,
        newStatus: string,
    ) {

        console.log({
            id,
            status,
        });

        await updateOrderStatus(id, newStatus);

        const response = await getAllOrders({
            phone,
            status,
            date,
            page,
            limit: 10,
        });

        setOrders(response.data);

        setTotalPages(response.totalPages);

        handleCloseStatus();

    }

    //function para cgerenciar o modal detail
    function handleView(order: Order) {

        setSelectedOrder(order);

        setModalOpen(true);

    }

    function handleClose() {

        setModalOpen(false);

        setSelectedOrder(null);

    }

    useEffect(() => {

        async function load() {

            const response = await getAllOrders({

                phone,
                status,
                date,
                page,
                limit: 10,

            });

            setOrders(response.data);

            setTotalPages(response.totalPages);

        }

        load();

    }, [phone, status, date, page]);

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">
                    Pedidos
                </h1>

                <p className="text-gray-500 mt-2">
                    Gerencie todos os pedidos do restaurante.
                </p>

            </div>

            <OrderFilters
                phone={phone}
                status={status}
                date={date}
                onPhoneChange={setPhone}
                onStatusChange={setStatus}
                onDateChange={setDate}
            />

            <OrderTable
                orders={orders}
                onView={handleView}
                onEdit={handleEdit}
            />

            <OrderPagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            <OrderDetailsModal
                order={selectedOrder}
                open={modalOpen}
                onClose={handleClose}
            />


            <UpdateStatusModal
                order={selectedOrderStatus}
                open={statusModalOpen}
                onClose={handleCloseStatus}
                onSave={handleSaveStatus}
            />
        </div>

    );

}