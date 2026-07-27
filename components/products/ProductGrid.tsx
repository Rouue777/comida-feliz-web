import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { ingredientImages } from "@/utils/ingredientImages";

type ProductGridProps = {
    products: Product[];
    onEdit: (product: Product) => void;
    onToggleAvailability: (product: Product) => void;
};

export function ProductGrid({
    products,
    onEdit,
    onToggleAvailability,
}: ProductGridProps) {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {products.map((product) => (

                <ProductCard
                    key={product.id}
                    name={product.name}
                    price={Number(product.price)}
                    image={
                                            ingredientImages[product.name] ??
                                            "/ingredients/default.jpg"
                                        }
                    available={product.available}
                    onEdit={() => onEdit(product)}
                    onToggleStatus={() => onToggleAvailability(product)}
                />

            ))}

        </div>

    );

}

