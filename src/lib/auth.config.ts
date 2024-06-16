import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import dbConnect from "@/lib/db";
import { UserService } from "@/services/users"

const tokenValue = (token: any, user: any) => {
    token._id = user._id?.toString();
    token.username = user.username;
    token.email = user.email;
    token.role = user.role;
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
            return await UserService.createUser(user);
        },
        async jwt({ token, user }) {
            await dbConnect();
            const dbUser = await UserService.getUserByEmail(user?.email as string);
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