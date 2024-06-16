import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginButtons } from "@/components/shared/LoginButtons";

export const metadata: Metadata = {
    title: "Auth",
};

export default function Page() {
    return (
        <div className="auth-layout">
            <Card className="auth-card">
                <CardHeader>
                    <CardTitle>Login To Your Account</CardTitle>
                    <CardDescription className="mt-3">
                            Authenticate your account to access the full features of our system.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col">
                        <LoginButtons />
                    </div>
                    <CardDescription className="mt-8 text-justify">
                        By Login, you agree with our <Link href="/pages/terms-of-service" className="link underline">Terms of Service</Link> and <Link href="/pages/privacy-policy" className="link underline">Privacy Policy</Link>.
                    </CardDescription>

                    <CardDescription className="mt-3">
                        Continue without Login?<Link href="/" className="ml-1 link">Explore</Link>
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    )
}