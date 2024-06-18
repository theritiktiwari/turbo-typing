"use client";

import { useEffect, useState } from "react";
import { ArrowDownAZ, CaseSensitive, Gauge, RotateCw, Settings2, Star, Type } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useSetting } from "@/hooks/use-setting";
import { languages } from "@/constants/language";
import { fonts } from "@/constants/fonts";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { SettingModal } from "@/components/shared/modals/setting-modal";

export default function Page() {
    const [isMounted, setIsMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalType, setModalType] = useState("");
    const [modalValues, setModalValues] = useState("");

    const setting = useSetting();
    const { data: session } = useSession();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const exportSettings = () => {
        const settings = setting.export();
        // copy to clipboard
        navigator.clipboard.writeText(JSON.stringify(settings, null, 2));
        Toast({ success: true, message: "Settings copied to clipboard." });
    }

    const handleSubmit = () => {
        try {
            setLoading(true);
            if (modalType === "IMPORT_SETTINGS") {
                if (!modalValues) {
                    return Toast({ success: false, message: "Please enter the JSON settings." });
                }

                setting.import(modalValues);
                setOpen(false);
                setModalValues("");
                setModalType("");
            }

            if (modalType === "USERNAME") {
                if (!modalValues) {
                    return Toast({ success: false, message: "Please enter the JSON settings." });
                }

                // TODO: Update the username in database

                setOpen(false);
                setModalValues("");
                setModalType("");
            }
        } catch (error) {
            console.error(error); // FIXME: remove this line
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <SettingModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={handleSubmit}
                loading={loading}
                type={modalType}
                data={modalValues}
                setData={setModalValues}
            />

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
                    <div className="flex flex-col gap-4 w-full">
                        <div className="w-full space-y-2">
                            <div className="settings-title">
                                <ArrowDownAZ /> Language
                            </div>
                            <div className="description-text">
                                Change the type of language you want.
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-7 gap-3 w-full place-items-stretch">
                            {languages && Object.keys(languages).map((key) => (
                                <div
                                    key={key}
                                    className={cn("settings-toggle md:w-[180px]", setting.language === key ? "bg-main text-main-foreground" : "bg-secondary")}
                                    onClick={() => setting.updateLanguage(key)}
                                >
                                    {languages[key]}
                                </div>
                            ))}
                        </div>
                    </div>
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
                                    key={font}
                                    className={cn("settings-toggle md:w-[180px]", setting.fontFamily === font ? "bg-main text-main-foreground" : "bg-secondary")}
                                    onClick={() => setting.updateFontFamily(font)}
                                >
                                    {font}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Import/Export Setings */}
                <div className="settings-box mt-5">
                    <div className="w-full md:w-[50%] space-y-2">
                        <div className="settings-title">
                            <Settings2 /> Import or Export
                        </div>
                        <div className="description-text">
                            Import or export the settings as JSON.
                        </div>
                    </div>
                    <div className="flex-center gap-2">
                        <Button
                            onClick={() => {
                                setModalType("IMPORT_SETTINGS");
                                setOpen(true);
                            }}
                            variant={"secondary"}
                        >
                            Import
                        </Button>
                        <Button
                            onClick={exportSettings}
                            variant={"secondary"}
                        >
                            Export
                        </Button>
                    </div>
                </div>

                {/* Update username */}
                <div className="settings-box mt-5">
                    <div className="w-full md:w-[50%] space-y-2">
                        <div className="settings-title">
                            <Settings2 /> Update Username
                        </div>
                        <div className="description-text">
                            You can only change the username once in every 30 days.
                        </div>
                    </div>
                    <div className="flex-center gap-2">
                        <Button
                            onClick={() => {
                                setModalType("USERNAME");
                                setModalValues(session?.user?.username ?? "");
                                setOpen(true);
                            }}
                            variant={"destructive"}
                        >
                            Update Username
                        </Button>
                    </div>
                </div>

                {/* Reset all Settings */}
                <div className="settings-box mt-5">
                    <div className="w-full md:w-[50%] space-y-2">
                        <div className="settings-title">
                            <RotateCw /> Reset Settings
                        </div>
                        <div className="description-text flex flex-col gap-1">
                            Resets settings to the default.
                            <span className="text-destructive font-medium">You can&apos;t undo this action!</span>
                        </div>
                    </div>
                    <div className="flex-center gap-2">
                        <Button
                            onClick={() => setting.reset()}
                            variant={"destructive"}
                        >
                            Reset Settings
                        </Button>
                    </div>
                </div>

            </div>
        </>
    );
}