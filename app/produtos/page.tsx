"use client";

import { useEffect, useState } from "react";

import { ProductHeader } from "@/components/products/ProductHeader";
import { CreateProductModal } from "@/components/products/CreateProductModal";
import { getAllProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import { ProductGrid } from "@/components/products/ProductGrid";
import { UpdateAvailabilityModal } from "@/components/products/UpdateAvailabilityModal";
import ProtectedRoute from "@/components/login/ProtectedRoute";

export default function ProdutosPage() {

    //estados atualizacao disponibiidade produtos
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [updateAvailabilityOpen, setUpdateAvailabilityOpen] = useState(false);

    const [createModalOpen, setCreateModalOpen] = useState(false);

    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    console.log(createModalOpen);
    //carregar produtos
    async function loadProducts() {

        const response = await getAllProducts({
            page,
            limit: 6,
        });

        setProducts(response.data);
        setTotalPages(response.totalPages);

    }


    //gerenciando estados 
    function handleOpenAvailability(product: Product) {
        setSelectedProduct(product);
        setUpdateAvailabilityOpen(true);
    }

    useEffect(() => {

        loadProducts();

    }, [page]);

    return (
        <ProtectedRoute>
        <div className="space-y-8">

            <ProductHeader
                onCreate={() => setCreateModalOpen(true)}
            />

            <ProductGrid
                products={products}
                onEdit={() => { }}
                onToggleAvailability={handleOpenAvailability}
            />

            <CreateProductModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onCreated={loadProducts}
            />

            <UpdateAvailabilityModal
                open={updateAvailabilityOpen}
                product={selectedProduct}
                onClose={() => setUpdateAvailabilityOpen(false)}
                onUpdated={loadProducts}

            />
        </div>
        </ProtectedRoute>
    );

}