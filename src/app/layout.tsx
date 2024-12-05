import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="900 flex justify-center items-center">
        {children}
      </body>
    </html>
  );
}
