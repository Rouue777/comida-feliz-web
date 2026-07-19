import "./globals.css";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Navbar } from "@/components/Navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>

        <div className="flex">

          <Sidebar />

          <div className="flex-1">

            <Navbar />

            <main className="p-6">
              {children}
            </main>

          </div>

        </div>

      </body>
    </html>
  );
}