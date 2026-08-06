"use client";

import Link from "next/link";
import {

  LayoutDashboard,
  ShoppingCart,
  Beef,
  Package,
  UtensilsCrossed,

} from "lucide-react";

export function Sidebar() {

  return (

    <aside
      className="
w-64
h-full
flex-shrink-0
bg-gray-900
text-white
flex
flex-col
shadow-xl
"
    >

      <div className="p-6 border-b border-gray-800">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center">

            <UtensilsCrossed
              size={22}
            />

          </div>

          <div>

            <h1 className="text-2xl font-bold">

              Comida Feliz

            </h1>

            <p className="text-sm text-gray-400">

              Restaurante

            </p>

          </div>

        </div>

      </div>

      <nav className="flex-1 p-5 space-y-2">

        <Link
          href="/dashboard"
          className="
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-lg
                        hover:bg-gray-800
                        transition
                    "
        >

          <LayoutDashboard size={20} />

          Dashboard

        </Link>

        <Link
          href="/pedidos"
          className="
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-lg
                        hover:bg-gray-800
                        transition
                    "
        >

          <ShoppingCart size={20} />

          Pedidos

        </Link>

        <Link
          href="/ingredientes"
          className="
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-lg
                        hover:bg-gray-800
                        transition
                    "
        >

          <Beef size={20} />

          Ingredientes

        </Link>

        <Link
          href="/produtos"
          className="
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-lg
                        hover:bg-gray-800
                        transition
                    "
        >

          <Package size={20} />

          Produtos

        </Link>

      </nav>

      <div className="p-5 border-t border-gray-800">

        <p className="text-xs text-gray-500">

          Comida Feliz

        </p>

        <p className="text-xs text-gray-600">

          Versão 1.0.0

        </p>

      </div>

    </aside>

  );

}