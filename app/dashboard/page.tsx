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

export default function Dashboard() {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);;
    const [kitchenQueue, setKitchenQueue] = useState<KitchenQueueOrder[]>([]);

    useEffect(() => {
        async function load() {
            const data = await getDashboardSummary();
            const kitchenQueueData = await getKitchenQueue();

            console.log(data);

            setSummary(data);
            setKitchenQueue(kitchenQueueData);
        }

        load();
    }, []);

    if (!summary) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Visão geral do restaurante.
                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

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

   <div className="grid grid-cols-12 gap-6 items-start">



    <div className="col-span-4">

        <KitchenQueue
            orders={kitchenQueue}
        />

    </div>

</div>
        
            

        </div>
    );
}


