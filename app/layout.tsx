import "./globals.css";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Navbar } from "@/components/Navbar/Navbar";
import { Toaster } from "sonner";
import { Footer } from "@/components/footer/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="pt-BR">

      <body className="bg-gray-100">

        <Toaster
          richColors
          position="top-right"
        />

        <div className="flex h-screen overflow-hidden">

          <Sidebar />

          <div className="flex flex-1 flex-col overflow-hidden">

            <Navbar />

            <main
              className="
                                flex-1
                                overflow-y-auto
                                bg-gray-100
                                p-8
                            "
            >

              {children}

            </main>
            <Footer />
          </div>

        </div>

      </body>

    </html>

  );

}