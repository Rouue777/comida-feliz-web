import { useEffect, useState } from "react";
import { createProduct, getCategorias } from "@/services/product.service";
type CreateProductModalProps = {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
};

export function CreateProductModal({
    open,
    onClose,
    onCreated,
}: CreateProductModalProps) {


    //estados
    const [categories, setCategories] = useState<any[]>([]);

    const [name, setName] = useState("");

    const [price, setPrice] = useState("");

    const [categoryId, setCategoryId] = useState("");

    const [available, setAvailable] = useState(true);

    async function handleCreate() {

        await createProduct({

            name,

            price: Number(price),

            categoryId,

            available,

        });

        setName("");
        setPrice("");
        setCategoryId("");
        setAvailable(true);

        onClose();
        onCreated();

    }

    useEffect(() => {

        async function loadCategories() {

            const response = await getCategorias();

            setCategories(response.data);

        }

        loadCategories();

    }, []);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">

                <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-bold">
                        Novo Produto
                    </h2>

                    <button onClick={onClose}>
                        ✕
                    </button>

                </div>

                <hr className="my-6" />

                <div className="space-y-5">

                    <div>
                        <label>Nome</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3"
                            placeholder="Ex.: Coca-Cola"
                        />
                    </div>

                    <div>
                        <label>Preço</label>

                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3"
                        />
                    </div>

                    <div>
                        <label>Categoria</label>

                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3"
                        >
                            <option value="">Selecione</option>

                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}

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

                    <div className="flex justify-end gap-3">

                        <button
                            onClick={onClose}
                            className="px-5 py-3 border rounded-lg"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleCreate}
                            className="px-5 py-3 bg-green-600 text-white rounded-lg"
                        >
                            Salvar
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );

}