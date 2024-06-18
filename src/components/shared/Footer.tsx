"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CircleDollarSign, CodeXml, GlobeLock, Mail, NotepadText, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Separator } from "@/components/ui/separator";
import { ContactModal } from "./modals/contact-modal";

export default function Footer() {
    const [mounted, setMounted] = useState(false);
    const [openContactModal, setOpenContactModal] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Turbo Typing";
    const heart = "\uD83D\uDC99"; // blue heart emoji

    const copyright = (year: number) => {
        const currentYear = new Date().getFullYear();
        if (year > currentYear) return currentYear;
        return year === currentYear ? year : `${year}-${currentYear % 100}`;
    }

    return (
        <footer className="footer">
            <div className="flex justify-between items-start md:items-center">
                <div className="flex-center gap-5 md:gap-7">
                    <ul className={"text-xs flex-items-start flex-col md:flex-row gap-5 md:gap-7"}>
                        <ContactModal
                            isOpen={openContactModal}
                            onClose={() => setOpenContactModal(false)}
                        />
                        <li className="flex-center gap-1 cursor-pointer" onClick={() => setOpenContactModal(true)}>
                            <Mail size={"1rem"} /> Contact
                        </li>

                        {/* TODO: Add modal to support links */}
                        <Link href={"/"}>
                            <li className="flex-center gap-1">
                                <CircleDollarSign size={"1rem"} /> Support
                            </li>
                        </Link>

                        <Link href={"https://github.com/theritiktiwari/turbo-typing"} target="_blank">
                            <li className="flex-center gap-1">
                                <CodeXml size={"1rem"} /> GitHub
                            </li>
                        </Link>
                    </ul>

                    <ul className={"text-xs flex-items-start flex-col md:flex-row gap-5 md:gap-7"}>
                        <Link href={"/pages/terms-of-service"}>
                            <li className="flex-center gap-1">
                                <NotepadText size={"1rem"} /> Terms
                            </li>
                        </Link>
                        <Link href={"/pages/security-policy"}>
                            <li className="flex-center gap-1">
                                <ShieldCheck size={"1rem"} /> Securtity
                            </li>
                        </Link>
                        <Link href={"/pages/privacy-policy"}>
                            <li className="flex-center gap-1">
                                <GlobeLock size={"1rem"} /> Privacy
                            </li>
                        </Link>
                    </ul>
                </div>

                {/* toggle themes */}
                <ThemeToggle />
            </div>
            <Separator className="my-4 bg-muted-foreground" />
            <div className="text-xs text-center">
                <p>&copy; {copyright(2024)} {APP_NAME}. All rights reserved.</p>
                <p>Made with {heart} by <a href="https://theritiktiwari.vercel.app" target="_blank" rel="noopener noreferrer" className="link">Ritik Tiwari</a>.</p>
            </div>
        </footer>
    );
}