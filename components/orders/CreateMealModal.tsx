"use client";

import { useEffect, useState } from "react";

import { CreateMealDto, MealSize } from "@/types/meal";
import { Ingredient } from "@/types/ingredients";
import { getAllIngredients } from "@/services/ingredients.service";
import { MealDraft } from "@/types/meal";

type CreateMealModalProps = {

    open: boolean;

    mealPrices: {

        M: number;

        G: number;

    };

    onClose: () => void;

    onCreated: (meal: MealDraft) => void;

};

export function CreateMealModal({
    open,
    onClose,
    onCreated,
    mealPrices
}: CreateMealModalProps) {
    //estados de size
    const [size, setSize] = useState<MealSize>("M");

    //estados estados dos ingredientes
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const [proteins, setProteins] = useState<Ingredient[]>([]);

    const [beans, setBeans] = useState<Ingredient[]>([]);

    const [bases, setBases] = useState<Ingredient[]>([]);


    //estados para escoha do usuario
    const [selectedProtein, setSelectedProtein] = useState("");

    const [selectedBean, setSelectedBean] = useState("");

    const [selectedBases, setSelectedBases] = useState<string[]>([]);

    const [observation, setObservation] = useState("");
    //use effect para carregar ingredientes
    useEffect(() => {

        async function loadIngredients() {

            const response = await getAllIngredients({
                page: 1,
                limit: 100,
            });

            setIngredients(response.data);

        }

        loadIngredients();

    }, []);

    //use effect  para separar por tipo 
    useEffect(() => {

        setProteins(
            ingredients.filter(
                ingredient =>
                    ingredient.type === "PROTEIN" &&
                    ingredient.available,
            ),
        );

        setBeans(
            ingredients.filter(
                ingredient =>
                    ingredient.type === "BEAN" &&
                    ingredient.available,
            ),
        );

        setBases(
            ingredients.filter(
                ingredient =>
                    ingredient.type === "BASE" &&
                    ingredient.available,
            ),
        );

    }, [ingredients]);

    if (!open) {
        return null;
    }

    ///saalvar marmita no banco de dados
    function handleSaveMeal() {

        if (!selectedProtein) {

            alert("Selecione uma proteína.");

            return;

        }

        if (!selectedBean) {

            alert("Selecione um feijão.");

            return;

        }

        if (selectedBases.length === 0) {

            alert("Selecione pelo menos uma base.");

            return;

        }

        const protein = proteins.find(
            p => p.id === selectedProtein,
        );

        const bean = beans.find(
            b => b.id === selectedBean,
        );

        const selectedBaseObjects = bases.filter(
            base => selectedBases.includes(base.id),
        );

        const unitPrice =

            size === "M"

                ? mealPrices.M

                : mealPrices.G;

        if (!protein) {

            alert("Proteína inválida.");

            return;

        }

        if (!bean) {

            alert("Feijão inválido.");

            return;

        }

onCreated({

    size,

    proteinId: protein.id,

    proteinName: protein.name,

    beanId: bean.id,

    beanName: bean.name,

    baseIds: selectedBaseObjects.map(base => base.id),

    baseNames: selectedBaseObjects.map(base => base.name),

    unitPrice,

    subtotal: unitPrice,

    notes: observation,

});

        onClose();

    }

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-8">

                <div className="flex justify-between items-center">

                    <h2 className="text-3xl font-bold">

                        Nova Marmita

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-xl"
                    >
                        ✕
                    </button>

                </div>

                <hr className="my-6" />

                <div className="space-y-8">

                    <div>

                        <h3 className="font-semibold text-lg mb-4">

                            Tamanho

                        </h3>

                        <div className="flex gap-6">

                            <label className="flex items-center gap-2">

                                <input
                                    type="radio"
                                    checked={size === "M"}
                                    onChange={() => setSize("M")}
                                />

                                M

                            </label>

                            <label className="flex items-center gap-2">

                                <input
                                    type="radio"
                                    checked={size === "G"}
                                    onChange={() => setSize("G")}
                                />

                                G

                            </label>

                        </div>

                    </div>

                    <div>

                        <h3 className="font-semibold text-lg mb-4">

                            Proteína

                        </h3>

                        <div className="border rounded-lg p-4">

                            <div className="space-y-3">

                                {proteins.map((protein) => (

                                    <label
                                        key={protein.id}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >

                                        <input
                                            type="radio"
                                            name="protein"
                                            checked={selectedProtein === protein.id}
                                            onChange={() => setSelectedProtein(protein.id)}
                                        />

                                        {protein.name}

                                    </label>

                                ))}

                            </div>

                        </div>

                    </div>

                    <div>

                        <h3 className="font-semibold text-lg mb-4">

                            Feijão

                        </h3>

                        <div className="border rounded-lg p-4">

                            <div className="space-y-3">

                                {beans.map((bean) => (

                                    <label
                                        key={bean.id}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >

                                        <input
                                            type="radio"
                                            name="bean"
                                            checked={selectedBean === bean.id}
                                            onChange={() => setSelectedBean(bean.id)}
                                        />

                                        {bean.name}

                                    </label>

                                ))}

                            </div>

                        </div>

                    </div>

                    <div>

                        <h3 className="font-semibold text-lg mb-4">

                            Bases

                        </h3>

                        <div className="border rounded-lg p-4">

                            <div className="space-y-3">

                                {bases.map((base) => (

                                    <label
                                        key={base.id}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >

                                        <input
                                            type="checkbox"
                                            checked={selectedBases.includes(base.id)}
                                            onChange={(e) => {

                                                if (e.target.checked) {

                                                    setSelectedBases([
                                                        ...selectedBases,
                                                        base.id,
                                                    ]);

                                                } else {

                                                    setSelectedBases(
                                                        selectedBases.filter(
                                                            id => id !== base.id,
                                                        ),
                                                    );

                                                }

                                            }}
                                        />

                                        {base.name}

                                    </label>

                                ))}

                            </div>

                        </div>

                    </div>

                    <div>

                        <label className="font-semibold">

                            Observação

                        </label>

                        <textarea
                            rows={3}
                            value={observation}
                            onChange={(e) => setObservation(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 mt-2"
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
                        onClick={handleSaveMeal}
                        className="px-5 py-3 bg-green-600 text-white rounded-lg"
                    >
                        Salvar Marmita
                    </button>

                </div>

            </div>

        </div>

    );

}