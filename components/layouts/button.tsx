import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "success";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: ButtonVariant;
    loading?: boolean;
};

export function Button({
    children,
    variant = "primary",
    loading = false,
    className = "",
    disabled,
    ...props
}: ButtonProps) {

    const variants = {
        primary:
            "bg-orange-500 hover:bg-orange-600 text-white",

        secondary:
            "bg-gray-100 hover:bg-gray-200 text-gray-700",

        success:
            "bg-green-600 hover:bg-green-700 text-white",

        danger:
            "bg-red-500 hover:bg-red-600 text-white",
    };

    return (

        <button
            {...props}
            disabled={disabled || loading}
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                px-5
                py-3
                font-semibold
                transition-all
                duration-200
                disabled:opacity-60
                disabled:cursor-not-allowed
                ${variants[variant]}
                ${className}
            `}
        >

            {loading ? "Carregando..." : children}

        </button>

    );

}