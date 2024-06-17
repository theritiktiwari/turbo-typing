"use client"

import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();

    const getActiveClass = (currentTheme: string) => {
        return theme === currentTheme ? 'bg-main text-main-foreground' : ''
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