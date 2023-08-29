import NextAuth, { AuthOptions } from "next-auth";
import { prisma } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";

const loginSchema = z
  .object({
    email: z.coerce.string().min(1).email(),
    password: z.coerce.string().min(8),
  })
  .required();

// NOTE: Exported to be used to get data from Serverside Component
export const NextAuthOptions: AuthOptions = {
  pages: {
    signIn: "/auth",
    newUser: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "next@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        let parsedLoginSchema = loginSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (!parsedLoginSchema.success) {
          return null;
        }

        let loginData = parsedLoginSchema.data;

        const user = await prisma.user.findFirst({
          where: {
            email: loginData.email,
          },
        });

        if (user == null) {
          return null;
        }

        if (!bcrypt.compareSync(loginData.password, user.password)) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user });
      if (user) {
        return {
          ...token,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
          id: token.sub,
        },
      };
    },
  },
};

const handler = NextAuth(NextAuthOptions);

import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function DELETE(req: NextRequest) {
  const session = await getServerSession(NextAuthOptions);

  if (!session?.user) {
    redirect("/auth");
  }

  await prisma.user.delete({
    where: {
      id: session.user.id,
    },
  });

  cookies().delete("next-auth.session-token");
  redirect("/auth");
}

export { handler as GET, handler as POST, DELETE };
