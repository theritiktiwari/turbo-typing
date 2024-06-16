import UserModel from "@/models/User";
import { Response } from "@/types/response";
import { getSession } from "next-auth/react";

interface UpdateUserPayload {
    id: string;
    username?: string;
    email?: string;
    role?: string;
}

export class UserService {
    private static AdminCheck(context: any) {
        if (!context?.session || context?.session?.user?.role !== "ADMIN") {
            return new Response("Unauthorized Access.").error();
        }
    }

    private static userVaildationCheck(payload: any) {
        if (payload?.username && payload?.username?.length < 3 && payload?.username?.length > 20) {
            return new Response("username must be between 3 to 20 characters long.").error();
        }

        if (payload?.email && !/^\S+@\S+\.\S+$/.test(payload?.email)) {
            return new Response("Invalid email address.").error();
        }

        if (payload?.role && !["USER", "ADMIN"].includes(payload?.role)) {
            return new Response("Invalid role.").error();
        }
    }

    public static async getUserByEmail(email: string) {
        return await UserModel.findOne({ email });
    }

    public static async authenticateUser(context: any) {
        try {
            const cookies = context.headers.get("cookie") || "";
            const session = await getSession({ req: { headers: { cookie: cookies } } });

            if (!session) {
                return null;
            }

            return session;
        } catch (error) {
            console.error("[AUTHENTICATE_USER]", error);
        }
    }

    public static async createUser(payload: { email: string }) {
        try {
            const { email } = payload;

            if (!email) {
                return false;
            }

            const username = email.split("@")[0];

            const existingUser = await UserService.getUserByEmail(email);
            if (existingUser) {
                return true;
            }

            const newUser = new UserModel({
                username,
                email,
                role: "USER",
            });

            await newUser.save();

            return true;
        } catch (error) {
            console.error("[NEXT_AUTH_OAUTH_SIGN_IN]", error);
            return false;
        }
    }

    public static async getCurrentUser(context: any) {
        try {
            if (!context?.session) {
                return new Response("Unauthorized Access.").error();
            }

            const user = await UserService.getUserByEmail(context.session.user.email);
            if (!user) {
                return new Response("User not found.").error();
            }

            return new Response("User found.", user).data();
        } catch (error) {
            console.error("[GET_CURRENT_USER]", error);
        }
    }

    public static async getUser(payload: { id: string }, context: any) {
        try {
            const unauthorize = UserService.AdminCheck(context);
            if (unauthorize) return unauthorize;

            const user = await UserModel.findById({ _id: payload.id });
            if (!user) {
                return new Response("User not found.").error();
            }

            return new Response("User found.", user).data();
        } catch (error) {
            console.error("[GET_USER]", error);
        }
    }

    public static async getUsers(context: any) {
        try {
            const unauthorize = UserService.AdminCheck(context);
            if (unauthorize) return unauthorize;

            const users = await UserModel.find();
            if (!users) {
                return new Response("Users not found.").error();
            }

            return new Response("Users found.", users).data();
        } catch (error) {
            console.error("[GET_ALL_USERS]", error);
        }
    }

    public static async updateUser(payload: UpdateUserPayload, context: any) {
        try {
            if (!context?.session) {
                return new Response("Unauthorized Access.").error();
            }

            if (Object.keys(payload).length === 1 && payload?.id) {
                return new Response("Nothing to update.").error();
            }

            const validation = UserService.userVaildationCheck(payload);
            if (validation) return validation;

            const user = await UserModel.findById(payload.id);
            if (!user) {
                return new Response("User not found.").error();
            }

            if (context.session.user.role === "ADMIN") {
                user.username = payload.username ?? user.username;
                user.email = payload.email ?? user.email;
                user.role = payload.role ?? user.role;
            }

            if (context.session.user.role === "USER" && context.session.user._id !== payload.id) {
                if (user?.usernameChangeDate) {
                    const changeDate = new Date(user?.usernameChangeDate);
                    if (changeDate.getDate() + 30 > new Date().getDate()) {
                        return new Response("You can change your username only once in 30 days.").error();
                    }
                }
                user.username = payload?.username ?? user.username;
            }

            await user.save();

            return new Response("User updated successfully.").success();
        } catch (error) {
            console.error("[UPDATE_USER]", error);
        }
    }

    public static async deleteUser(payload: { id: string }, context: any) {
        try {
            const unauthorize = UserService.AdminCheck(context);
            if (unauthorize) return unauthorize;

            if (context.session.user._id === payload.id) {
                return new Response("You can not delete your own account.").error();
            }

            const user = await UserModel.findByIdAndDelete(payload.id);
            if (!user) {
                return new Response("User not found.").error();
            }

            return new Response("User deleted successfully.").success();
        } catch (error) {
            console.error("[DELETE_USER]", error);
        }
    }
}