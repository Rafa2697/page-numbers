import type { Metadata } from "next";
import "./globals.css";
import Header from "./header/page";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Contatos FPBE",
  description: "Numeros de contato da FPBE e FASUPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col h-full">
        <Header />
        <main className="flex flex-1 justify-center items-center flex-col overflow-y-auto">
          {children}
        </main>
        <Toaster />
        <footer>
        <p className="text-center md:p-4">&copy;Rafael &copy;UNISEPE</p>
      </footer>
      </body>
      
    </html>
  );
}
