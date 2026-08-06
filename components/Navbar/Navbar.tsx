"use client";

import { useRouter } from "next/navigation";
import { LogOut, UtensilsCrossed } from "lucide-react";

export function Navbar() {

    const router = useRouter();

    function handleLogout() {

        localStorage.removeItem("token");

        router.push("/login");

    }

    return (

        <header className="h-20 bg-white shadow-sm px-8 flex items-center justify-between">

            <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center shadow">

                    <UtensilsCrossed
                        size={22}
                        className="text-white"
                    />

                </div>

                <div>

                    <h1 className="text-xl font-bold text-gray-800">

                        Sistema Restaurante

                    </h1>

                    <p className="text-sm text-gray-500">

                        Comida Feliz

                    </p>

                </div>

            </div>

            <div className="flex items-center gap-6">

                <div className="text-right">

                    <p className="text-sm text-gray-500">

                        Usuário

                    </p>

                    <p className="font-semibold">

                        Admin

                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    className="
                        flex
                        items-center
                        gap-2
                        bg-red-50
                        text-red-600
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-red-100
                        transition
                    "
                >

                    <LogOut size={18} />

                    Sair

                </button>

            </div>

        </header>

    );

}