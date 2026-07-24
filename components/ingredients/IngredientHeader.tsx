type IngredientHeaderProps = {
    onCreate: () => void;
};

export function IngredientHeader({
    onCreate,
}: IngredientHeaderProps) {

    return (

        <div
            className="
                flex
                justify-between
                items-center
                mb-8
            "
        >

            <div>

                <h1 className="text-4xl font-bold">
                    Ingredientes
                </h1>

                <p className="text-gray-500 mt-2">
                    Gerencie todos os ingredientes do restaurante.
                </p>

            </div>

            <button
                onClick={onCreate}
                className="
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    px-5
                    py-3
                    rounded-lg
                    font-semibold
                "
            >
                + Novo Ingrediente
            </button>

        </div>

    );

}