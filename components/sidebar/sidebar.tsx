"use client";

import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">
        Comida Feliz
      </h1>

      <nav className="flex flex-col gap-4">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/pedidos">
          Pedidos
        </Link>

        <Link href="/ingredientes">
          Ingredientes
        </Link>

        <Link href="/produtos">
          Produtos
        </Link>

      </nav>
    </aside>
  );
}