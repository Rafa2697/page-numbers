import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handle = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        try {
          // Fazendo a chamada para a API
          const response = await fetch("https://api-numbers-unisepe.onrender.com/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            console.log('Erro ao autenticar');
            throw new Error("Erro ao autenticar");
            
          }

          const user = await response.json();

          if (user) {
            console.log(`Usuário ${user.name} logado`, user);
            return user; // Retorna o objeto do usuário se autenticado
          }

          return console.log('Credenciais inválidas'); // Retorna null se as credenciais forem inválidas
        } catch (error) {
          console.error("Erro na autenticação:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

export { handle as GET, handle as POST };
