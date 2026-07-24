import { createIngredient } from "@/services/ingredients.service";
import { useState } from "react";

type CreateIngredientModalProps = {
    open: boolean;
    onClose: () => void;
    onCreated: () => Promise<void>;
};

export function CreateIngredientModal({
    open,
    onClose,
    onCreated,
}: CreateIngredientModalProps) {

    // estado s da criacao de ingredientes
    const [name, setName] = useState("");

    const [type, setType] = useState("");

    const [available, setAvailable] = useState(true);


    //furnction para ativaro botão sallvar
    async function handleCreate() {

        console.log({
            name,
            type,
        });

        await createIngredient({
            name,
            type,
        });

        await onCreated();

        onClose();

    }

    if (!open) {
        return null;
    }

    return (

        <div
            className="
                fixed
                inset-0
                bg-black/50
                flex
                items-center
                justify-center
                z-50
            "
        >

            <div
                className="
                    bg-white
                    rounded-xl
                    shadow-xl
                    w-full
                    max-w-lg
                    p-8
                "
            >

                <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-bold">
                        Novo Ingrediente
                    </h2>

                    <button
                        onClick={onClose}
                        className="
                            text-gray-500
                            hover:text-red-500
                            text-xl
                        "
                    >
                        ✕
                    </button>

                </div>

                <hr className="my-6" />

                <div className="space-y-5">

                    <div>



                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="
        w-full
        border
        rounded-lg
        px-4
        py-3
    "
                            placeholder="Ex.: Batata Frita"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            Categoria
                        </label>

                        <select
                            value={type}

                            onChange={(e) => setType(e.target.value)}
                            className="
        w-full
        border
        rounded-lg
        px-4
        py-3
    "
                        >
                            <option value="">Selecione</option>
                            <option value="PROTEIN">Proteína</option>
                            <option value="BASE">Base</option>
                            <option value="BEAN">Feijão</option>                           
                        </select>

                    </div>

                    <div className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            checked={available}
                            onChange={(e) => setAvailable(e.target.checked)}
                        />

                        <span>Disponível</span>

                    </div>

                    <div className="flex justify-end gap-3 mt-8">

                        <button
                            onClick={onClose}
                            className="
                px-5
                py-3
                border
                rounded-lg
            "
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleCreate}
                            className="
        px-5
        py-3
        bg-green-600
        text-white
        rounded-lg
    "
                        >
                            Salvar
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}