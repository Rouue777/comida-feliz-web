type OrderFiltersProps = {
    phone: string;
    status: string;
    date: string;

    onPhoneChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onDateChange: (value: string) => void;
};

export function OrderFilters({
    phone,
    status,
    date,
    onPhoneChange,
    onStatusChange,
    onDateChange,
}: OrderFiltersProps) {

    return (

        <div
            className="
                bg-white
               
                rounded-xl
                shadow-md
                p-6
                grid
                grid-cols-3
                gap-4
            "
        >

            <input
                type="text"
                placeholder="Buscar por telefone..."
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                className="border rounded-lg p-3"
            />

            <select
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
                className="border rounded-lg p-3"
            >

                <option value="">Todos os status</option>
                <option value="CONFIRMED">Confirmado</option>
                <option value="PREPARING">Preparando</option>
                <option value="READY">Pronto</option>
                <option value="OUT_FOR_DELIVERY">Em entrega</option>
                <option value="WAITING_PICKUP">Aguardando retirada</option>
                <option value="FINISHED">Finalizado</option>
                <option value="CANCELED">Cancelado</option>

            </select>

            <input
                type="date"
                value={date}
                onChange={(e) => onDateChange(e.target.value)}
                className="border rounded-lg p-3"
            />

        </div>

    );

}