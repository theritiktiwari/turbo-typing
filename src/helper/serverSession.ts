"use server";

import { authOptions } from "@/lib/auth.config";
import { getServerSession } from "next-auth";

export async function serverSession() {
    return getServerSession(authOptions);
}