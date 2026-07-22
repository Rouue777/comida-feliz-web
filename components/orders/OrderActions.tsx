import { Eye, Pencil, Printer } from "lucide-react";

type OrderActionsProps = {
    onView: () => void;
    onEdit: () => void;
};

export function OrderActions({
    onView,
    onEdit,
}: OrderActionsProps) {

    return (

        <div className="flex justify-center gap-2">

            <button
                onClick={onView}
                className="
                    p-2
                    rounded-lg
                    hover:bg-gray-100
                    transition
                "
            >
                <Eye size={18} />
            </button>

            <button
                onClick={onEdit}
                className="
        p-2
        rounded-lg
        hover:bg-gray-100
        transition
    "
            >
                <Pencil size={18} />
            </button>

            <button
                className="
                    p-2
                    rounded-lg
                    hover:bg-gray-100
                    transition
                "
            >
                <Printer size={18} />
            </button>

        </div>

    );

}