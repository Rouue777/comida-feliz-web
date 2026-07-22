type OrderStatusBadgeProps = {
    status: string;
};

export function OrderStatusBadge({
    status,
}: OrderStatusBadgeProps) {

    const statusMap = {
        PENDING: {
            label: "Pendente",
            className: "bg-yellow-100 text-yellow-800",
        },

        CONFIRMED: {
            label: "Confirmado",
            className: "bg-blue-100 text-blue-800",
        },

        PREPARING: {
            label: "Preparando",
            className: "bg-orange-100 text-orange-800",
        },

        READY: {
            label: "Pronto",
            className: "bg-green-100 text-green-800",
        },

        OUT_FOR_DELIVERY: {
            label: "Em entrega",
            className: "bg-purple-100 text-purple-800",
        },

        DELIVERED: {
            label: "Entregue",
            className: "bg-emerald-100 text-emerald-800",
        },

        CANCELLED: {
            label: "Cancelado",
            className: "bg-red-100 text-red-800",
        },
    } as const;

    const current =
        statusMap[status as keyof typeof statusMap] ?? {
            label: status,
            className: "bg-gray-100 text-gray-700",
        };

    return (

        <span
            className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                ${current.className}
            `}
        >
            {current.label}
        </span>

    );
}