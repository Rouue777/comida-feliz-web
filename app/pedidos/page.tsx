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
import { SearchCustomerModal } from "@/components/orders/SearchCustomerModal";
import { CreateCustomerModal } from "@/components/orders/CreateCustomerModal";
import { Customer } from "@/types/customer";
import { CreateOrderModal } from "@/components/orders/CreateOrderModal";
import ProtectedRoute from "@/components/login/ProtectedRoute";



export default function OrdersPage() {

    //estados para modal criacao de pedidos
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [customerPhone, setCustomerPhone] = useState("");
    const [searchCustomerModalOpen, setSearchCustomerModalOpen] = useState(false);
    const [createCustomerModalOpen, setCreateCustomerModalOpen] = useState(false);
    const [createOrderModalOpen, setCreateOrderModalOpen] = useState(false);

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

    async function loadOrders() {

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

    useEffect(() => {

        loadOrders();

    }, [phone, status, date, page]);

    return (
        <ProtectedRoute>

            <div className="space-y-8">

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-4xl font-bold">
                            Pedidos
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Gerencie todos os pedidos do restaurante.
                        </p>

                    </div>

                    <button
                        onClick={() => setSearchCustomerModalOpen(true)}
                        className="px-5 py-3 bg-green-600 text-white rounded-lg"
                    >
                        Novo Pedido
                    </button>

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

                <SearchCustomerModal
                    open={searchCustomerModalOpen}
                    onClose={() => setSearchCustomerModalOpen(false)}
                    onCustomerFound={(customer) => {
                        setCustomer(customer);
                        setCreateOrderModalOpen(true);
                    }}
                    onCustomerNotFound={(phone) => {
                        setCustomerPhone(phone);
                        setCreateCustomerModalOpen(true);
                    }}
                />

                <CreateCustomerModal
                    open={createCustomerModalOpen}
                    phone={customerPhone}
                    onClose={() => setCreateCustomerModalOpen(false)}
                    onCreated={(customer) => {

                        setCustomer(customer);

                        setCreateCustomerModalOpen(false);

                        setCreateOrderModalOpen(true);

                    }}
                />

                <CreateOrderModal
                    open={createOrderModalOpen}
                    customer={customer}
                    onClose={() => setCreateOrderModalOpen(false)}
                    onCreated={loadOrders}
                />
            </div>
        </ProtectedRoute>
    );

}