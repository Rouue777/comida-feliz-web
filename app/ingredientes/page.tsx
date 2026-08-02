"use client";

import { useEffect, useState } from "react";
import { IngredientHeader } from "@/components/ingredients/IngredientHeader";
import { CreateIngredientModal } from "@/components/ingredients/CreateIngredientModal";
import { IngredientGrid } from "@/components/ingredients/IngredientGrid";
import { Ingredient } from "@/types/ingredients";
import { getAllIngredients } from "@/services/ingredients.service";
import { UpdateAvailabilityModal } from "@/components/ingredients/updateAvaliabilityModal";
import { updateIngredientAvailability } from "@/services/ingredients.service";
import ProtectedRoute from "@/components/login/ProtectedRoute";

export default function IngredientesPage() {

    //estados para paginação
    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    //estados  para atualiza disponibilidade
    const [selectedIngredient, setSelectedIngredient] =
        useState<Ingredient | null>(null);

    const [availabilityModalOpen, setAvailabilityModalOpen] =
        useState(false);

    //esatados do modal
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const [createModalOpen, setCreateModalOpen] = useState(false);

    //confirmacao na mudança de disponibiidade
    async function handleConfirmAvailability(
        id: string,
        available: boolean,
    ) {

        await updateIngredientAvailability(id, available);

        await loadIngredients();

        handleCloseAvailability();

    }

    //funcoes para atualizar disponibilidades
    function handleToggleAvailability(
        ingredient: Ingredient,
    ) {

        setSelectedIngredient(ingredient);

        setAvailabilityModalOpen(true);

    }

    function handleCloseAvailability() {

        setAvailabilityModalOpen(false);

        setSelectedIngredient(null);

    }

    //recarregar ingredientse
    async function loadIngredients() {

        const response = await getAllIngredients({
            page,
            limit: 8,
        });

        setIngredients(response.data);

        setTotalPages(response.totalPages);

    }

    useEffect(() => {

        loadIngredients();

    }, [page]);
    return (
        <ProtectedRoute>
            <div className="space-y-8">

                <IngredientHeader
                    onCreate={() => setCreateModalOpen(true)}
                />


                <CreateIngredientModal
                    open={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onCreated={loadIngredients}
                />

                <IngredientGrid
                    ingredients={ingredients}
                    onToggleAvailability={handleToggleAvailability}
                />
                <div className="flex justify-center items-center gap-4 mt-8">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Anterior
                    </button>

                    <span>
                        Página {page} de {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Próxima
                    </button>

                </div>
                <UpdateAvailabilityModal
                    ingredient={selectedIngredient}
                    open={availabilityModalOpen}
                    onClose={handleCloseAvailability}
                    onConfirm={handleConfirmAvailability}
                />
            </div>
        </ProtectedRoute>
    );

}