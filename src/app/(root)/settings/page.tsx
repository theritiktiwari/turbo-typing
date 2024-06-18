"use client";

import { useEffect, useState } from "react";
import { ArrowDownAZ, CaseSensitive, Gauge, Save, Star, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSetting } from "@/hooks/use-setting";
import { languages } from "@/constants/language";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { fonts } from "@/constants/fonts";

export default function Page() {
    const [isMounted, setIsMounted] = useState(false);
    const setting = useSetting();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <div className="main-container">
                <p className="description-text text-center mb-6">
                    Configure your Turbo Typing experience.
                </p>

                {/* Difficulty Level */}
                <div className="settings-box">
                    <div className="w-full md:w-[50%] space-y-2">
                        <div className="settings-title">
                            <Star /> Test Difficulty
                        </div>
                        <div className="description-text">
                            Beginner is for those who are new to typing or looking to build a strong foundation. Intermediate is tailored, who are looking to enhance their skills. Expert aimed at advanced users who are confident in their typing skills and seek to master their typing proficiency.
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div
                            aria-label="beginner"
                            className={cn("settings-toggle", setting.difficulty === "BEGINNER" ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateDifficulty("BEGINNER")}
                        >
                            Beginner
                        </div>
                        <div
                            aria-label="intermediate"
                            className={cn("settings-toggle", setting.difficulty === "INTERMEDIATE" ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateDifficulty("INTERMEDIATE")}
                        >
                            Intermediate
                        </div>
                        <div
                            aria-label="expert"
                            className={cn("settings-toggle", setting.difficulty === "EXPERT" ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateDifficulty("EXPERT")}
                        >
                            Expert
                        </div>
                    </div>
                </div>

                {/* Set the Language */}
                <div className="settings-box mt-5">
                    <div className="w-full md:w-[50%] space-y-2">
                        <div className="settings-title">
                            <ArrowDownAZ /> Language
                        </div>
                        <div className="description-text">
                            Change the type of language you want.
                        </div>
                    </div>
                    <Select
                        onValueChange={(value) => setting.updateLanguage(value)}
                        defaultValue={setting.language}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {Object.keys(languages).map((key) => (
                                    <SelectItem key={key} value={key} className="cursor-pointer">
                                        {languages[key]}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Typing Unit */}
                <div className="settings-box mt-5">
                    <div className="w-full md:w-[50%] space-y-2">
                        <div className="settings-title">
                            <Gauge /> Typing Unit
                        </div>
                        <div className="description-text">
                            Display typing speed in the specified unit.
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div
                            className={cn("settings-toggle", setting.unit === "WPM" ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateUnit("WPM")}
                        >
                            WPM
                        </div>
                        <div
                            className={cn("settings-toggle", setting.unit === "CPM" ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateUnit("CPM")}
                        >
                            CPM
                        </div>
                        <div
                            className={cn("settings-toggle", setting.unit === "WPS" ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateUnit("WPS")}
                        >
                            WPS
                        </div>
                        <div
                            className={cn("settings-toggle", setting.unit === "CPS" ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateUnit("CPS")}
                        >
                            CPS
                        </div>
                    </div>
                </div>

                {/* Font Size */}
                <div className="settings-box mt-5">
                    <div className="w-full md:w-[50%] space-y-2">
                        <div className="settings-title">
                            <Type /> Font Size
                        </div>
                        <div className="description-text">
                            Change the font size of the editor.
                        </div>
                    </div>
                    <div className="flex-center gap-2">
                        <Input
                            type="number"
                            className="w-[180px]"
                            value={setting.fontSize}
                            onChange={(e) => setting.updateFontSize(e.target.value)}
                        />
                    </div>
                </div>

                {/* Font Family */}
                <div className="settings-box mt-5">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="w-full space-y-2">
                            <div className="settings-title">
                                <CaseSensitive /> Font Family
                            </div>
                            <div className="description-text">
                                Select the font family for the editor.
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-7 gap-3 w-full place-items-stretch">
                            {fonts?.map((font) => (
                                <div
                                    className={cn("settings-toggle md:w-[180px]", setting.fontFamily === font ? "bg-main text-main-foreground" : "bg-secondary")}
                                    onClick={() => setting.updateFontFamily(font)}
                                >
                                    {font}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}