"use client";

import { useEffect, useState } from "react";
import { getDashboardSummary } from "@/services/dashboard.service";
import { DashboardCard } from "@/components/DashboardCard/DashboardCard";
import { DashboardSummary } from "@/types/dashboard";
import {
    ShoppingCart,
    DollarSign,
    ChefHat,
    PackageCheck,
    Truck,
} from "lucide-react";
import { KitchenQueue } from "@/components/DashboardCard/kitchenQueue";
import { getKitchenQueue } from "@/services/dashboard.service";
import { KitchenQueueOrder } from "@/types/kitchenQueue";
import ProtectedRoute from "@/components/login/ProtectedRoute";
import { getDashboardSummaryDaily } from "@/services/dashboard.service";
import { DashboardSummaryDaily } from "@/types/dashboard";

export default function Dashboard() {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);;
    const [kitchenQueue, setKitchenQueue] = useState<KitchenQueueOrder[]>([]);
    const [summaryDaily, setSummaryDaily] = useState<DashboardSummaryDaily | null>(null);

useEffect(() => {

    async function load() {

        try {

            const data = await getDashboardSummary();

            const summaryDailyData =
                await getDashboardSummaryDaily();

            const kitchenQueueData =
                await getKitchenQueue();

            console.log(data);

            setSummary(data);

            setSummaryDaily(summaryDailyData);

            setKitchenQueue(kitchenQueueData);

        } catch (error) {

            console.error(error);

        }

    }

    load();

}, []);

    if (!summary) {
        return <p>Carregando...</p>;
    }

return (
    <ProtectedRoute>

        <div className="space-y-8">

            {/* Cabeçalho */}

            <div>

                <h1 className="text-4xl font-bold">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Visão geral do restaurante.
                </p>

            </div>

            {/* Cards resumo */}

            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-5
                    gap-6
                "
            >

                <DashboardCard
                    title="Pedidos Hoje"
                    value={summary.ordersToday}
                    icon={ShoppingCart}
                />

                <DashboardCard
                    title="Faturamento"
                    value={summary.revenueToday}
                    icon={DollarSign}
                />

                <DashboardCard
                    title="Preparando"
                    value={summary.preparing}
                    icon={ChefHat}
                />

                <DashboardCard
                    title="Prontos"
                    value={summary.ready}
                    icon={PackageCheck}
                />

                <DashboardCard
                    title="Em Delivery"
                    value={summary.delivery}
                    icon={Truck}
                />

            </div>

            {/* Área operacional */}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Cozinha */}

                <div className="xl:col-span-2">

                    <KitchenQueue
                        orders={kitchenQueue}
                    />

                </div>

                {/* Resumo do dia */}

                <div className="bg-white rounded-xl  p-6 shadow-sm">

                    <h2 className="font-semibold text-lg mb-6">

                        Resumo do Dia

                    </h2>

                    <div className="space-y-5">

                        <div className="flex items-center justify-between">

                            <span className="text-gray-600">

                                🛒 Pedidos Hoje

                            </span>

                            <span className="font-bold text-lg">

                                {summaryDaily?.ordersToday ?? 0}

                            </span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span className="text-gray-600">

                                💰 Ticket Médio

                            </span>

                            <span className="font-bold text-lg text-green-600">

                                R$ {Number(summaryDaily?.averageTicket ?? 0).toFixed(2)}

                            </span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span className="text-gray-600">

                                🕒 Último Pedido

                            </span>

                            <span className="font-bold text-lg">

                                {summaryDaily?.lastOrderTime ?? "--:--"}

                            </span>

                        </div>

                        <hr />

                        <div className="flex items-center justify-between">

                            <span className="text-gray-600">

                                🚚 Delivery

                            </span>

                            <span className="font-semibold">

                                {summaryDaily?.deliveryOrders ?? 0}

                            </span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span className="text-gray-600">

                                🍽️ Salão

                            </span>

                            <span className="font-semibold">

                                {summaryDaily?.dineInOrders ?? 0}

                            </span>

                        </div>

                        <div className="flex items-center justify-between">

                            <span className="text-gray-600">

                                ❌ Cancelados

                            </span>

                            <span className="font-semibold text-red-500">

                                {summaryDaily?.cancelledOrders ?? 0}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </ProtectedRoute>
);
}


