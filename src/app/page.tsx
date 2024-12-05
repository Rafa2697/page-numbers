'use client'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import numeros from "@/data/numeros";
import { useState, ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//função que vai renderizar os numeros na função principal
const Item = ({ numero }: { numero: { numero: ReactNode; string: string; ativo: boolean; local: string; image: string } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-slate-800 p-2 rounded-lg flex justify-center mt-2 hover:bg-gray-900 shadow-md">
      <HoverCard open={isOpen} onOpenChange={setIsOpen} openDelay={2}>
        <HoverCardTrigger onClick={handleToggle} className="text-white cursor-pointer text-xl">
          {numero.numero}
        </HoverCardTrigger>
        <HoverCardContent >
          <Avatar>
            <AvatarImage src={numero.image} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <p>Número: {numero.numero}</p>
          <p>Contato: {numero.local}</p>
          <p className={`${numero.ativo ? "text-green-500" : "text-red-500"}`}>WhatsApp: {numero.ativo ? "Ativo" : "Inativo"}</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

//função do componente
export default function Home() {
  return (
    <>

      <div className=" w-full md:w-1/2 h-full md:h-4/5 flex items-center justify-center">

        <ul className="flex flex-col justify-evenly h-full">
          {numeros.map((numero, index) => (
            <li key={index}>
              <Item numero={{ ...numero, string: '', image: numero.imag }} />
            </li>
          ))}
        </ul>
      </div>
    </>


  );
}
