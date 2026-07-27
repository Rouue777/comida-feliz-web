type ProductCardProps = {
    name: string;
    price: number;
    image: string;
    available: boolean;
    onEdit: () => void;
    onToggleStatus: () => void;
};

export function ProductCard({
    name,
    price,
    image,
    available,
    onEdit,
    onToggleStatus,
}: ProductCardProps) {

    return (

        <div className="bg-white rounded-xl shadow-md border overflow-hidden">

            <img
                src={image}
                alt={name}
                className="w-full h-44 object-cover"
            />

            <div className="p-4">

                <h2 className="text-lg font-bold">
                    {name}
                </h2>

                <p className="text-green-600 font-semibold mt-1">
                    R$ {price.toFixed(2)}
                </p>

                <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
                        available
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {available ? "Disponível" : "Indisponível"}
                </span>

                <div className="flex justify-between mt-5">

                    <button
                        onClick={onEdit}
                        className="text-blue-600 hover:underline"
                    >
                        Editar
                    </button>

                    <button
                        onClick={onToggleStatus}
                        className="text-orange-600 hover:underline"
                    >
                        Alterar
                    </button>

                </div>

            </div>

        </div>

    );

}