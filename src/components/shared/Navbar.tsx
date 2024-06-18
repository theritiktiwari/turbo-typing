"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Info, Keyboard, LogOut, Settings, UserRound } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Loader } from "@/components/ui/loader";

const Logo = () => {
    const logo = process.env.NEXT_PUBLIC_APP_NAME ?? "Speed Typing";

    return (
        <div className="flex-center gap-3">
            <div className="w-[40px] h-[40px]">
                <Image
                    src="/images/logo.png"
                    className="drop-shadow-[0_0_5px_rgba(0,0,0,0.3)] dark:drop-shadow-none"
                    alt="Logo"
                    width={2000}
                    height={2000}
                />
            </div>
            <h1 className="hidden md:block link text-2xl font-bold">{logo}</h1>
        </div>
    );
}

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Loader />;
    }

    const username = session?.user?.username?.length > 15 ? `${session?.user?.username?.slice(0, 15)}...` : session?.user?.username;

    const navRoutes = [
        {
            href: "/",
            icon: <Keyboard />,
            label: "Start Typing",
        },
        {
            href: "/about",
            icon: <Info />,
            label: "About",
        },
        {
            href: "/settings",
            icon: <Settings />,
            label: "Settings",
        },
    ]

    return (
        <TooltipProvider>
            <header className="navbar">
                <div className="flex-between">
                    {/* Logo and nav routes */}
                    <div className="flex-around gap-7">
                        <Link href={"/"}>
                            <Logo />
                        </Link>

                        <nav className={"flex-center gap-5 md:gap-7"}>
                            {navRoutes?.map((route: any) => (
                                <Link
                                    key={route?.href}
                                    href={route?.href}
                                >
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            {route?.icon}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {route?.label}
                                        </TooltipContent>
                                    </Tooltip>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* show if user is not loggedin */}
                    {!session?.user && <Link href={"/auth"}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <UserRound />
                            </TooltipTrigger>
                            <TooltipContent>
                                Login
                            </TooltipContent>
                        </Tooltip>
                    </Link>}

                    {/* show if user is loggedin */}
                    {session?.user && <div className="flex-center gap-4">
                        <Link href={"/account"}>
                            <div className="flex-center gap-2">
                                {session?.user?.image ? <span className="w-[30px] h-[30px]">
                                    <Image
                                        src={session?.user?.image}
                                        alt="user-image"
                                        className="rounded-full"
                                        width={250}
                                        height={250}
                                    />
                                </span> : <FaUserCircle className="text-main text-2xl" />}
                                {session?.user?.username && <span className="hidden md:block">{username}</span>}
                                <span className="level-badge">{session?.user?.level ?? 1}</span>
                            </div>
                        </Link>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className="text-destructive cursor-pointer"
                                    onClick={() => signOut()}
                                >
                                    <LogOut /> {/* Signout from next-auth */}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                Logout
                            </TooltipContent>
                        </Tooltip>
                    </div>}
                </div>
            </header>
        </TooltipProvider >
    );
}