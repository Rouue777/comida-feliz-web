"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";
import { login } from "@/services/auth.service";

// import { login } from "@/services/auth.service";

export default function LoginPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

       
            const response = await login({
                email,
                password,
            });

            localStorage.setItem(
                "token",
                response.access_token,
            );
            

            toast.success("Login realizado com sucesso!");

            router.push("/dashboard");

        } catch (error) {

            console.error(error);

            toast.error("E-mail ou senha inválidos.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

        router.replace("/dashboard");

    }

}, [router]);

    return (

        <main className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-50 flex items-center justify-center px-6">

            <div className="w-full max-w-md">

                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">

                    <div className="flex flex-col items-center mb-10">

                        <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">

                            <UtensilsCrossed
                                className="text-white"
                                size={36}
                            />

                        </div>

                        <h1 className="mt-5 text-3xl font-bold text-gray-800">

                            Comida Feliz

                        </h1>

                        <p className="mt-2 text-gray-500 text-center">

                            Sistema de Gestão de Restaurante

                        </p>

                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="space-y-6"
                    >

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">

                                E-mail

                            </label>

                            <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-orange-500 transition">

                                <Mail
                                    size={20}
                                    className="text-gray-400"
                                />

                                <input
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    className="ml-3 w-full outline-none"
                                    required
                                />

                            </div>

                        </div>

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">

                                Senha

                            </label>

                            <div className="flex items-center border rounded-xl px-4 py-3 focus-within:border-orange-500 transition">

                                <Lock
                                    size={20}
                                    className="text-gray-400"
                                />

                                <input
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="ml-3 w-full outline-none"
                                    required
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                        >

                            <LogIn size={20} />

                            {

                                loading

                                    ? "Entrando..."

                                    : "Entrar"

                            }

                        </button>

                    </form>

                    <div className="mt-8 text-center text-sm text-gray-400 border-t pt-5">

                        © {new Date().getFullYear()} Comida Feliz

                    </div>

                </div>

            </div>

        </main>

    );

}