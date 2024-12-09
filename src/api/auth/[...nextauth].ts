// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Faz a requisição para autenticar o usuário no backend
                const res = await fetch("https://api-numbers-unisepe.onrender.com/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials),
                });

                const user = await res.json();

                // Verifica se o login foi bem-sucedido
                if (res.ok && user) {
                    return user; // Retorna os dados do usuário
                }
                return null; // Retorna null se a autenticação falhar
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Adiciona os dados do usuário ao token JWT
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            // Adiciona os dados do token à sessão
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string,
                    email: token.email as string,
                },
            };
        },
    },
    secret: process.env.NEXTAUTH_SECRET || "seu_segredo",
};

export default NextAuth(authOptions);
