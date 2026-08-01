"use client";

import { useEffect, useState } from "react";
import { Customer } from "@/types/customer";
import { Meal, MealDraft } from "@/types/meal";
import { Category } from "@/types/category";
import { getAllCategories } from "@/services/categories.service";
import { OrderExtraDraft, Product } from "@/types/product";
import { getAllProducts } from "@/services/product.service";
import { CreateMealModal } from "@/components/orders/CreateMealModal";
import { CreateMealDto } from "@/types/meal";
import { basename } from "path";
import { CreateProductModal } from "./createProductModal";
import { createOrder, MealPrice } from "@/services/orders.service";
import { OrderType, PaymentMethod } from "@/types/orders";
import { CreateOrderDto } from "@/types/createOrderDto";
import { toast } from "sonner";

type CreateOrderModalProps = {
    open: boolean;
    customer: Customer | null;
    onClose: () => void;
    onCreated: () => void;
};

export function CreateOrderModal({
    open,
    customer,
    onClose,
    onCreated,
}: CreateOrderModalProps) {
    //estado od preco da marmita
    const [mealPrices, setMealPrices] = useState({

        M: 0,

        G: 0,

    });

    //estado para notes
    const [notes, setNotes] = useState("");

    //estados para paymeny type  e tipo de pedido
    const [orderType, setOrderType] = useState<OrderType>("DELIVERY");

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("PIX");

    //estado para produtct criacao modal
    const [productModalOpen, setProductModalOpen] = useState(false);

    const [extras, setExtras] = useState<OrderExtraDraft[]>([]);

    //estado para marmitasmodal
    const [mealModalOpen, setMealModalOpen] = useState(false);

    //carregar produtos
    const [products, setProducts] = useState<Product[]>([]);

    //estado para para marmitas
    const [categories, setCategories] = useState<Category[]>([]);

    const [meals, setMeals] = useState<MealDraft[]>([]);


    //use efect para buscar categorias
    useEffect(() => {

        async function loadProducts() {

            const response = await getAllProducts({
                page: 1,
                limit: 100,
            });

            setProducts(response.data);

            const prices = await MealPrice();

            setMealPrices(prices);

        }

        loadProducts();

    }, []);

    if (!open || !customer) {
        return null;
    }

    const mealsTotal = meals.reduce(

        (total, meal) => total + meal.subtotal,

        0,

    );

    const extrasTotal = extras.reduce(

        (total, extra) => total + extra.subtotal,

        0,

    );


    const total = mealsTotal + extrasTotal;

    console.log(">>>>>>>>>>>>>>>>>>", mealsTotal);

    const handleSaveOrder = async () => {

        try {

            const dto: CreateOrderDto = {

                phone: customer?.phone?.toString(),

                orderType,

                paymentMethod,

                notes,

                meals: meals.map((meal) => ({

                    size: meal.size,

                    proteinId: meal.proteinId,

                    beanId: meal.beanId,

                    baseIds: meal.baseIds,

                    notes: meal.notes,

                })),

                extras: extras.map((extra) => ({

                    productId: extra.productId,

                    quantity: extra.quantity,

                })),

            };

            console.log(JSON.stringify(dto, null, 2));

            await createOrder(dto);

            toast.success("Pedido criado com sucesso!");

            onCreated();

            onClose();

        } catch (error: any) {
            toast.error("Erro ao criar pedido.");
            console.log("STATUS:", error.response?.status);
            console.log("ERRO BACKEND:", error.response?.data);
        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl p-8 max-h-[90vh] overflow-y-auto">

                <div className="flex justify-between items-center">

                    <h2 className="text-3xl font-bold">
                        Novo Pedido
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-xl"
                    >
                        ✕
                    </button>

                </div>

                <hr className="my-6" />

                <div className="mb-8">

                    <h3 className="font-semibold text-lg">
                        Cliente
                    </h3>

                    <p>{customer.name}</p>

                    <p className="text-gray-500">
                        {customer.phone}
                    </p>

                </div>

                {/* Tipo do Pedido */}

                <div className="border rounded-xl p-6 mb-6">

                    <h3 className="text-xl font-semibold mb-5">

                        Tipo do Pedido

                    </h3>

                    <div className="flex gap-8">

                        <label className="flex items-center gap-2">

                            <input
                                type="radio"
                                value="DELIVERY"
                                checked={orderType === "DELIVERY"}
                                onChange={(e) =>
                                    setOrderType(e.target.value as OrderType)
                                }
                            />

                            Delivery

                        </label>

                        <label className="flex items-center gap-2">

                            <input
                                type="radio"
                                value="TAKEAWAY"
                                checked={orderType === "TAKEAWAY"}
                                onChange={(e) =>
                                    setOrderType(e.target.value as OrderType)
                                }
                            />

                            Retirada

                        </label>

                        <label className="flex items-center gap-2">

                            <input
                                type="radio"
                                value="DINE_IN"
                                checked={orderType === "DINE_IN"}
                                onChange={(e) =>
                                    setOrderType(e.target.value as OrderType)
                                }
                            />

                            Salão

                        </label>

                    </div>

                </div>

                {/* Forma de Pagamento */}

                <div className="border rounded-xl p-6 mb-6">

                    <h3 className="text-xl font-semibold mb-5">

                        Forma de Pagamento

                    </h3>

                    <div className="grid grid-cols-2 gap-4">

                        <label className="flex items-center gap-2">

                            <input
                                type="radio"
                                value="PIX"
                                checked={paymentMethod === "PIX"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value as PaymentMethod)
                                }
                            />

                            PIX

                        </label>

                        <label className="flex items-center gap-2">

                            <input
                                type="radio"
                                value="CASH"
                                checked={paymentMethod === "CASH"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value as PaymentMethod)
                                }
                            />

                            Dinheiro

                        </label>

                        <label className="flex items-center gap-2">

                            <input
                                type="radio"
                                value="CREDIT_CARD"
                                checked={paymentMethod === "CREDIT_CARD"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value as PaymentMethod)
                                }
                            />

                            Cartão de Crédito

                        </label>

                        <label className="flex items-center gap-2">

                            <input
                                type="radio"
                                value="DEBIT_CARD"
                                checked={paymentMethod === "DEBIT_CARD"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value as PaymentMethod)
                                }
                            />

                            Cartão de Débito

                        </label>

                    </div>

                </div>

                {meals.map((meal, index) => (

                    <div
                        key={index}
                        className="border rounded-xl p-6 mb-6"
                    >

                        <h3 className="text-xl font-semibold mb-5">

                            Marmita {index + 1}

                        </h3>

                        <div className="space-y-3">

                            <p>
                                <strong>Tamanho:</strong> {meal.size}
                            </p>

                            <p>
                                <strong>Proteína:</strong> {meal.proteinName}
                            </p>

                            <p>
                                <strong>Feijão:</strong> {meal.beanName}
                            </p>

                            <p>
                                <strong>Bases:</strong>
                            </p>

                            <ul className="list-disc ml-6">

                                {meal.baseNames.map((baseName, index) => (

                                    <li key={index}>
                                        {baseName}
                                    </li>

                                ))}

                            </ul>

                            {meal.notes && (

                                <p>

                                    <strong>Observação:</strong> {meal.notes}

                                </p>

                            )}


                            <div className="flex gap-3 mt-5">

                                <button
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    Editar
                                </button>

                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                >
                                    Excluir
                                </button>

                            </div>

                        </div>

                    </div>

                ))}


                {extras.length > 0 && (

                    <div className="border rounded-xl p-6">

                        <h3 className="text-xl font-semibold mb-5">

                            Produtos

                        </h3>

                        <div className="space-y-4">

                            {extras.map((extra, index) => (

                                <div
                                    key={index}
                                    className="flex justify-between border rounded-lg p-4"
                                >

                                    <div>

                                        <p className="font-semibold">

                                            {extra.productName}

                                        </p>

                                        <p>

                                            Quantidade: {extra.quantity}

                                        </p>

                                    </div>

                                    <div>

                                        R$ {extra.subtotal.toFixed(2)}

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                )}


                <div className="mb-8 py-5">

                    <button
                        onClick={() => setMealModalOpen(true)}
                        className="px-5 py-3 bg-blue-600 text-white rounded-lg"
                    >
                        + Nova Marmita
                    </button>



                </div>
                <div className="mb-8">

                    <button
                        onClick={() => setProductModalOpen(true)}
                        className="px-5 py-3 bg-purple-600 text-white rounded-lg"
                    >
                        + Adicionar Produto
                    </button>



                </div>
                <div className="mb-6">

                    <label className="block text-sm font-semibold text-gray-700 mb-2">

                        Observações do Pedido

                    </label>

                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                        placeholder="Ex.: Sem cebola, entregar após as 12h, troco para R$ 100..."
                        className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            px-4
            py-3
            text-sm
            outline-none
            resize-none
            transition
            focus:border-orange-500
            focus:ring-2
            focus:ring-orange-200
        "
                    />

                    <p className="mt-2 text-xs text-gray-500">

                        Observações gerais do pedido.

                    </p>

                </div>

                <hr className="my-6" />

                <div className="flex justify-between items-center">

                    <h3 className="text-2xl font-bold">
                        Total: R$ {total.toFixed(2)}
                    </h3>

                    <div className="flex gap-3">

                        <button
                            onClick={onClose}
                            className="px-5 py-3 border rounded-lg"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleSaveOrder}
                            className="px-5 py-3 bg-green-600 text-white rounded-lg"
                        >
                            Salvar Pedido
                        </button>

                    </div>

                </div>

            </div>

            <CreateMealModal
                open={mealModalOpen}
                mealPrices={mealPrices}
                onClose={() => setMealModalOpen(false)}
                onCreated={(meal) => {

                    setMeals((prev) => [

                        ...prev,

                        meal,

                    ]);

                    setMealModalOpen(false);

                }}
            />

            <CreateProductModal

                open={productModalOpen}

                onClose={() => setProductModalOpen(false)}

                onCreated={(product) => {

                    setExtras((prev) => [

                        ...prev,

                        product,

                    ]);

                    setProductModalOpen(false);

                }}

            />
        </div>

    );

}