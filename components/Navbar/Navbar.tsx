"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function Navbar() {

    const router = useRouter();

    function handleLogout() {

        localStorage.removeItem("token");

        router.push("/login");

    }

    return (

        <header className="h-16 border-b flex items-center justify-between px-6 bg-white">

            <h2 className="text-xl font-semibold">

                Sistema Restaurante

            </h2>

            <div className="flex items-center gap-4">

                <span>

                    Admin

                </span>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
                >

                    <LogOut size={18} />

                    Sair

                </button>

            </div>

        </header>

    );

}