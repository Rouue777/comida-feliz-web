export function Footer() {

    return (

        <footer className="h-14 border-t border-gray-200 bg-white px-8 flex items-center justify-between">

            <p className="text-sm text-gray-500">

                Comida Feliz ERP

                <span className="ml-2 text-xs text-gray-400">

                    v1.0.0

                </span>

            </p>

            <p className="text-sm text-gray-500 flex items-center gap-2">

                Desenvolvido por

                <a
                    href="https://github.com/rouue777"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        font-semibold
                        text-orange-500
                        hover:text-orange-600
                        hover:underline
                        transition
                    "
                >
                   
                    Jeferson Paixão Dev
                </a>

            </p>

        </footer>

    );

}