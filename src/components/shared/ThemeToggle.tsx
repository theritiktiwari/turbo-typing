"use client"

import { useEffect, useState } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const getActiveClass = (currentTheme: string) => {
        return theme === currentTheme ? 'bg-main text-main-foreground' : ''
    }

    if (!mounted) {
        return null; // Avoid rendering until the theme is resolved
    }

    return (
        <section className={className}>
            <div className={"theme-toggle"}>
                <div
                    onClick={() => setTheme("light")}
                    className={`theme-toggle-icon ${getActiveClass("light")}`}
                >
                    <Sun />
                </div>
                <div
                    onClick={() => setTheme("system")}
                    className={`theme-toggle-icon ${getActiveClass("system")}`}
                >
                    <Monitor />
                </div>
                <div
                    onClick={() => setTheme("dark")}
                    className={`theme-toggle-icon ${getActiveClass("dark")}`}
                >
                    <Moon />
                </div>
            </div>
        </section>
    );
};