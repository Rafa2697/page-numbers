
'use client'
import { useRouter, usePathname } from 'next/navigation'
import { CiLogin } from "react-icons/ci";
import { GoSignIn } from "react-icons/go";
import Link from "next/link";
export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginRoute = pathname === '/login';

  return (
    <header className="bg-slate-800 text-white p-4 grid grid-cols-3 w-screen items-center">
      <div></div> {/* Coluna vazia */}
      <h1 className="text-2xl font-bold text-center">Contatos UNISEPE</h1>

      <div className="flex justify-end col-span-1">
        {isLoginRoute ? (
          <Link href="/">
            <GoSignIn className="cursor-pointer hover:text-lime-500" size={30} />
          </Link>
        ) : (
          <Link href="/login">
            <CiLogin className="cursor-pointer hover:text-lime-500" size={30} />
          </Link>
        )}


      </div>

    </header>
  );
}