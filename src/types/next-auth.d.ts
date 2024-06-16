import "next-auth";

declare module "next-auth" {
    interface User {
        _id?: string;
        username?: string
        email?: string;
        role?: string;
    }

    interface Session {
        user: User & DefaultSession["user"];
    }

    interface JWT {
        _id?: string;
        username?: string;
        email?: string;
        role?: string;
    }
}