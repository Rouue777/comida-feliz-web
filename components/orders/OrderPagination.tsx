type OrderPaginationProps = {

    page: number;

    totalPages: number;

    onPageChange: (page: number) => void;

};

export function OrderPagination({

    page,

    totalPages,

    onPageChange,

}: OrderPaginationProps) {

    return (

        <div
            className="
                flex
                justify-center
                items-center
                gap-3
                mt-8
            "
        >

            <button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="
                    px-4
                    py-2
                    border
                    rounded-lg
                    disabled:opacity-40
                "
            >
                Anterior
            </button>

            <span className="font-semibold">

                Página {page} de {totalPages}

            </span>

            <button
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className="
                    px-4
                    py-2
                    border
                    rounded-lg
                    disabled:opacity-40
                "
            >
                Próxima
            </button>

        </div>

    );

}