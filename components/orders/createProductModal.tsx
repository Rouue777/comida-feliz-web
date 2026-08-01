"use client";

import { useEffect, useState } from "react";

import { Product  } from "@/types/product";
import { getAllProducts } from "@/services/product.service";
import { OrderExtraDraft  } from "@/types/product";

type CreateProductModalProps = {
    open: boolean;
    onClose: () => void;
    onCreated: (product: OrderExtraDraft) => void;
};

export function CreateProductModal({
    open,
    onClose,
    onCreated,
}: CreateProductModalProps) {

    const [products, setProducts] = useState<Product[]>([]);

    const [selectedProduct, setSelectedProduct] = useState("");

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {

        async function loadProducts() {

            const response = await getAllProducts({

                page: 1,
                limit: 100,

            });

            setProducts(response.data);

        }

        if (open) {

            loadProducts();

        }

    }, [open]);

    function handleSaveProduct() {

        if (!selectedProduct) {

            alert("Selecione um produto.");

            return;

        }

        const product = products.find(

            product => product.id === selectedProduct,

        );

        if (!product) {

            alert("Produto inválido.");

            return;

        }

        onCreated({

            productId: product.id,

            productName: product.name,

            quantity,

            unitPrice: Number(product.price),

            subtotal: Number(product.price) * quantity,

        });

        setSelectedProduct("");

        setQuantity(1);

        onClose();

    }

    if (!open) {

        return null;

    }

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">

                <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-bold">

                        Adicionar Produto

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-xl"
                    >
                        ✕
                    </button>

                </div>

                <hr className="my-6" />

                <div className="space-y-5">

                    <div>

                        <label className="block mb-2">

                            Produto

                        </label>

                        <select
                            value={selectedProduct}
                            onChange={(e) =>
                                setSelectedProduct(e.target.value)
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        >

                            <option value="">

                                Selecione

                            </option>

                            {products.map((product) => (

                                <option
                                    key={product.id}
                                    value={product.id}
                                >

                                    {product.name}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="block mb-2">

                            Quantidade

                        </label>

                        <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(Number(e.target.value))
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>

                </div>

                <hr className="my-6" />

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-5 py-3 border rounded-lg"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleSaveProduct}
                        className="px-5 py-3 bg-green-600 text-white rounded-lg"
                    >
                        Adicionar
                    </button>

                </div>

            </div>

        </div>

    );

}