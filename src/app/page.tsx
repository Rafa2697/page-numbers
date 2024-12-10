'use client'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useState, ReactNode, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast"

interface Numero {
  number: string;
  active: boolean;
  local: string;
  image: string;
}
const fetchNumeros = async (): Promise<Numero[]> => {
  try {
    const response = await fetch("https://api-numbers-unisepe.onrender.com/numbers");
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data: Numero[] = await response.json();

    return data;

  } catch (error) {
    console.error("Error fetching numbers:", error);
    throw error;
  }
}
//função que vai renderizar os numeros na função principal
const Item = ({ numero }: { numero: Numero }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  console.log(numero.number)
  return (
    <div className="bg-slate-800 p-2 rounded-lg flex justify-center mt-2 hover:bg-gray-900 shadow-md">
      <HoverCard open={isOpen} onOpenChange={setIsOpen} openDelay={2}>
        <HoverCardTrigger onClick={handleToggle} className="text-white cursor-pointer text-xl">
          <p>{numero.number}</p>
        </HoverCardTrigger>
        <HoverCardContent >
          <Avatar>
            <AvatarImage src={numero.image} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <p>Número: {numero.number}</p>
          <p>Contato: {numero.local}</p>
          <p className={`${numero.active ? "text-green-500" : "text-red-500"}`}>WhatsApp: {numero.active ? "Ativo" : "Inativo"}</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

//função do componente
export default function Home() {
  const { toast } = useToast()
  const [numeros, setNumeros] = useState<Numero[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchNumeros();
        setNumeros(data);
      } catch (error) {
        setError("Error fetching numbers as Error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      toast({
        title: "Dica",
        description: "Clique no número para ver mais detalhes",
      })
    }, 1000);
  }, [toast])

  if (isLoading) {
    return <p>Loading data...</p>;
  }
  if (error) {
    return <p>Error fetching data: {error}</p>;
  }

  return (
    <>

      <div className=" w-full md:w-1/2 h-full md:h-4/5 flex items-center justify-center">
        <ul className="flex flex-col justify-evenly h-full" >
          {numeros.map((numero, index) => (
            <li key={index}>
              <Item numero={numero} />
            </li>
          ))}
        </ul>

      </div>
    </>
  );
};

