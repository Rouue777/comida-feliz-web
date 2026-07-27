import { updateProductAvailability } from "@/services/product.service";
import { Product } from "@/types/product";

type UpdateAvailabilityModalProps = {
    product: Product | null;
    open: boolean;
    onClose: () => void;
    onUpdated: () => void;

};

export function UpdateAvailabilityModal({
    product,
    open,
    onClose,

    onUpdated,
}: UpdateAvailabilityModalProps) {

    //gerenciar disponibilidade
    async function handleSaveAvailability() {

        if (!product) return;

        await updateProductAvailability(
            product.id,
            !product.available,
        );

        onUpdated();

        onClose();

    }

    if (!open || !product) {
        return null;
    }

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold mb-4">
                    Alterar disponibilidade
                </h2>

                <p className="mb-8">
                    Deseja realmente
                    <strong>
                        {product.available
                            ? " desativar "
                            : " ativar "}
                    </strong>

                    o produto

                    <strong> {product.name}</strong>?
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-5 py-3 border rounded-lg"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleSaveAvailability}
                        className="px-5 py-3 bg-orange-500 text-white rounded-lg"
                    >
                        Confirmar
                    </button>

                </div>

            </div>

        </div>

    );

}