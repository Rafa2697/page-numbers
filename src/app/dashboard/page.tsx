'use client'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import Formulario from "@/components/ui/formCadastroNum"
export default function Dashboard() {
  const router = useRouter()
  const {data: session, status} = useSession()
  const { toast } = useToast()

  useEffect(() => {
    setTimeout(() => {
      toast({
        title: "Bem vindo ao dashboard",
        description: "Direcionando para o dashboard...",
      })
    }, 1000);
  }, [toast])

  const handleSignOut = async () => {
    await signOut({ redirect: false})
    router.push('/login')
  }

  if (status == "authenticated"){
    
   
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <Formulario />
        <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded-md">Sair</button>
      </div>
    );
  }
  // return router.push('/login')
 
}