import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import dbConnect from "@/lib/db";
import { AddUser, GetUserByEmail } from "@/services/users";

const tokenValue = (token: any, user: any) => {
    token._id = user._id?.toString();
    token.username = user.username;
    token.email = user.email;
    token.role = user.role;
    token.level = user.level;
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),
    ],
    callbacks: {
        async signIn({ user }: { user: any }) {
            await dbConnect();
            return await AddUser(user);
        },
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                token.username = session?.username ?? token.username;
                token.role = session?.role ?? token.role;
                token.level = session?.level ?? token.level;
            }

            await dbConnect();
            const dbUser = await GetUserByEmail(user?.email as string);
            if (dbUser) {
                tokenValue(token, dbUser);
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id?.toString();
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.level = token.level;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET
} satisfies NextAuthOptions;