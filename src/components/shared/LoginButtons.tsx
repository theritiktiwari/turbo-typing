"use client";

import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useOrigin } from "@/hooks/use-origin";
import { Button } from "@/components/ui/button";

export function LoginButtons() {
    const origin = useOrigin();

    return <>
        <div className="flex flex-col gap-2 mt-3">
            <Button
                className="flex-center gap-3"
                onClick={() => signIn('google', {
                    callbackUrl: origin
                })}
            >
                <FaGoogle size={"1.3em"} />
                Sign In with Google
            </Button>

            <Button
                className="flex-center gap-3"
                onClick={() => signIn('github', {
                    callbackUrl: origin
                })}
            >
                <FaGithub size={"1.3em"} />
                Sign In with GitHub
            </Button>
        </div >
    </>
};