type ProductHeaderProps = {
    onCreate: () => void;
};

export function ProductHeader({
    onCreate,
}: ProductHeaderProps) {

    return (

        <div className="flex justify-between items-center">

            <div>

                <h1 className="text-3xl font-bold">
                    Produtos
                </h1>

                <p className="text-gray-500">
                    Gerencie os produtos do restaurante.
                </p>

            </div>

            <button
                onClick={() => {
                    console.log("clicou");
                    onCreate();
                }}
            >
                Novo Produto
            </button>

        </div>

    );

}