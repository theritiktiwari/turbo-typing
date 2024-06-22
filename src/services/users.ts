"use server";

import UserModel from "@/models/User";
import { Response } from "@/types/response";
import { serverSession } from "@/helper/serverSession";

interface UpdateUserPayload {
    id: string;
    username?: string;
    level?: number;
    experience?: number;
    email?: string;
    role?: string;
}

export async function AdminCheck(session: any) {
    if (!session || session?.user?.role !== "ADMIN") {
        return new Response("Unauthorized Access.").error();
    }
}

function UserVaildationCheck(payload: any) {
    if (payload?.username && payload?.username?.length < 3 || payload?.username?.length > 20) {
        return new Response("Username must be between 3 and 20 characters.").error();
    }

    if (payload?.username && !/^[a-zA-Z0-9_]*$/.test(payload?.username)) {
        return new Response("No special characters allowed in username.").error();
    }

    if (payload?.level && payload?.level < 1 && isNaN(payload?.level)) {
        return new Response("Invalid level.").error();
    }

    if (payload?.experience && isNaN(payload?.experience)) {
        return new Response("Invalid experience.").error();
    }

    if (payload?.email && !/^\S+@\S+\.\S+$/.test(payload?.email)) {
        return new Response("Invalid email address.").error();
    }

    if (payload?.role && !["USER", "ADMIN"].includes(payload?.role)) {
        return new Response("Invalid role.").error();
    }
}

function CheckTheDate(pastDate: Date): boolean {
    const currentDate = new Date();
    const thirtyDaysInMillis = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    return (currentDate.getTime() - pastDate.getTime()) >= thirtyDaysInMillis;
};

export async function GetUserByEmail(email: string) {
    return await UserModel.findOne({ email });
}

export async function AddUser(payload: { email: string }) {
    try {
        const { email } = payload;

        if (!email) {
            return false;
        }

        const username = email.split("@")[0];

        // remove the white spaces and special characters
        const formattedUsername = username.replace(/\s/g, "").replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();

        const existingUser = await GetUserByEmail(email);
        if (existingUser) {
            return true;
        }

        const newUser = new UserModel({
            username: formattedUsername,
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

export async function GetCurrentUser() {
    try {
        const session = await serverSession();
        if (!session) {
            return new Response("Unauthorized Access.").error();
        }

        const user = await GetUserByEmail(session?.user?.email);
        if (!user) {
            return new Response("User not found.").error();
        }

        return new Response("User found.", user).data();
    } catch (error) {
        console.error("[GET_CURRENT_USER]", error);
    }
}

export async function UpdateUser(payload: UpdateUserPayload) {
    try {
        const session = await serverSession();
        if (!session) {
            return new Response("Unauthorized Access.").error();
        }

        if (Object.keys(payload).length === 1 && payload?.id) {
            return new Response("Nothing to update.").error();
        }

        const validation = UserVaildationCheck(payload);
        if (validation) return validation;

        const user = await UserModel.findById(payload.id);
        if (!user) {
            return new Response("User not found.").error();
        }

        if (payload?.username) {
            // remove white spaces and convert to lowercase
            payload.username = payload.username?.replace(/\s/g, "").toLowerCase();
        }

        if (session?.user?.role === "ADMIN") {
            user.username = payload.username ?? user.username;
            user.email = payload.email ?? user.email;
            user.role = payload.role ?? user.role;
            user.level = payload.level ?? user.level;
            user.experience = payload.experience ?? user.experience;
        }

        if (session?.user?.role === "USER" && session?.user?._id === payload.id) {
            if (payload?.username) {
                if (user?.usernameChangeDate) {
                    const changeDate = new Date(user?.usernameChangeDate);
                    if (!CheckTheDate(changeDate)) {
                        return new Response("You can change your username only once in 30 days.").error();
                    }
                }
                user.username = payload?.username ?? user.username;
                user.usernameChangeDate = new Date();
            }

            user.level = payload.level ?? user.level;
            user.experience = payload.experience ?? user.experience;
        }

        await user.save();

        return new Response("User updated successfully.").success();
    } catch (error) {
        console.error("[UPDATE_USER]", error);
        return new Response("Something went wrong.").error();
    }
}

export async function GetUser(payload: { id: string }) {
    try {
        const session = await serverSession();
        const unauthorize = AdminCheck(session);
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

export async function GetUsers() {
    try {
        const session = await serverSession();
        const unauthorize = AdminCheck(session);
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

export async function DeleteUser(payload: { id: string }) {
    try {
        const session = await serverSession();
        const unauthorize = AdminCheck(session);
        if (unauthorize) return unauthorize;

        if (session?.user?._id === payload.id) {
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

export async function CheckUsername(payload: { username: string, id: string }) {
    try {
        const session = await serverSession();
        if (!session) {
            return new Response("Unauthorized Access.").error();
        }

        const validation = UserVaildationCheck(payload);
        if (validation) return validation;

        const currentUser = await UserModel.findById(payload.id);

        if (currentUser?.usernameChangeDate) {
            const changeDate = new Date(currentUser?.usernameChangeDate);
            if (!CheckTheDate(changeDate)) {
                return new Response("You can change your username only once in 30 days.").error();
            }
        }

        const existingUser = await UserModel.findOne({ username: payload.username });
        if (existingUser) {
            return new Response("Username is not available.").error();
        }

        return new Response("Username is available.").success();
    } catch (error) {
        console.error("[CHECK_USERNAME]", error);
        return new Response("Something went wrong.").error();
    }
}