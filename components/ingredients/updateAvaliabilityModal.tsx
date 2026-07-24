import { Ingredient } from "@/types/ingredients";

type UpdateAvailabilityModalProps = {
    ingredient: Ingredient | null;
    open: boolean;
    onClose: () => void;
    onConfirm: (id: string, available: boolean) => void;
};

export function UpdateAvailabilityModal({
    ingredient,
    open,
    onClose,
    onConfirm,
}: UpdateAvailabilityModalProps) {

    if (!open || !ingredient) {
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
                        {ingredient.available
                            ? " desativar "
                            : " ativar "}
                    </strong>

                    o ingrediente

                    <strong> {ingredient.name}</strong>?
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-5 py-3 border rounded-lg"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={() =>
                            onConfirm(
                                ingredient.id,
                                !ingredient.available,
                            )
                        }
                        className="px-5 py-3 bg-orange-500 text-white rounded-lg"
                    >
                        Confirmar
                    </button>

                </div>

            </div>

        </div>

    );

}