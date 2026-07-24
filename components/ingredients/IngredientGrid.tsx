import { IngredientCard } from "./IngredientCard";
import { Ingredient } from "@/types/ingredients";
import { ingredientImages } from "@/utils/ingredientImages";


type IngredientGridProps = {
    ingredients: Ingredient[];
    onToggleAvailability: (ingredient: Ingredient) => void;
};

export function IngredientGrid({
    ingredients,
    onToggleAvailability,
}: IngredientGridProps) {

    if (ingredients.length === 0) {

        return (

            <div className="text-center py-20 text-gray-500">

                Nenhum ingrediente encontrado.

            </div>

        );

    }

    return (

        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-6
            "
        >

            {ingredients.map((ingredient) => (

                <IngredientCard
                    key={ingredient.id}
                    name={ingredient.name}
                    image={
                        ingredientImages[ingredient.name] ??
                        "/ingredients/default.jpg"
                    }
                    available={ingredient.available}
                    onEdit={() => {}}
                    onToggleStatus={() => onToggleAvailability(ingredient)}
                />

            ))}

        </div>

    );

}