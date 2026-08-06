import { Card } from "../ui/card";

type IngredientCardProps = {

    name: string;

    image: string;

    available: boolean;

    onEdit: () => void;

    onToggleStatus: () => void;

    

};

export function IngredientCard({

    name,

    image,

    available,

    onEdit,

    onToggleStatus,

}: IngredientCardProps) {
    

    return (

        <Card>


            <img
                src={image}
                alt={name}
                className="
                    w-full
                    h-44
                    object-cover
                "
            />

            <div className="p-5">

                <h3 className="text-xl font-bold">
                    {name}
                </h3>

                <p
                    className={`mt-2 font-semibold ${
                        available
                            ? "text-green-600"
                            : "text-red-600"
                    }`}
                >
                    {available
                        ? "🟢 Disponível"
                        : "🔴 Indisponível"}
                </p>

                <div className="flex justify-between mt-6">

                    <button
                        onClick={onEdit}
                        className="text-blue-600 font-semibold"
                    >
                        ✏️ Editar
                    </button>

                    <button
                        onClick={onToggleStatus}
                        className="text-orange-600 font-semibold"
                    >
                        🔄 Alterar
                    </button>

                </div>

            </div>

        
                        </Card>
    );

}