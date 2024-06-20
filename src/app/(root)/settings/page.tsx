"use client";

import { useEffect, useState } from "react";
import { ArrowDownAZ, CaseSensitive, Gauge, RotateCw, Settings2, Star, Timer, Type } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useSetting } from "@/hooks/use-setting";
import languageList from "@/constants/languages/_list.json";
import fontList from "@/constants/fonts/_list.json";
import { CheckUsername, UpdateUser } from "@/services/users";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { SettingModal } from "@/components/shared/modals/setting-modal";

interface JSONList {
    [key: string]: string;
}

export default function Page() {
    const [isMounted, setIsMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalType, setModalType] = useState("");
    const [modalValues, setModalValues] = useState("");
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [usernameDescription, setUsernameDescription] = useState<string | null>(null);
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    const setting = useSetting();
    const { data: session, update } = useSession();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const languages: JSONList = languageList;
    const fonts: JSONList = fontList;

    const exportSettings = () => {
        const settings = setting.export();
        // copy to clipboard
        navigator.clipboard.writeText(JSON.stringify(settings, null, 2));
        Toast({ success: true, message: "Settings copied to clipboard." });
    }

    const handleSubmit = async () => {
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

                const response = await UpdateUser({ id: session?.user?._id, username: modalValues });
                Toast(response);
                if (response.success) {
                    update({ username: modalValues });
                }

                setOpen(false);
                setModalValues("");
                setModalType("");
                setUsernameError(null);
                setUsernameDescription(null);
            }
        } catch (error) {
            Toast({ success: false, message: "Something went wrong." });
        } finally {
            setLoading(false);
        }
    }

    const checkUsernameValidity = async (username: string) => {
        if (username.length >= 3 && username.length <= 20) {
            try {
                const response = await CheckUsername({ username, id: session?.user?._id });
                if (response.success) {
                    setUsernameDescription("Username is available.");
                } else {
                    setUsernameError(response?.message);
                }
            } catch (error) {
                Toast({ success: false, message: "Something went wrong." });
            }
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsernameError(null);
        setUsernameDescription(null);

        const value = e.target.value.replace(/\s/g, "").toLowerCase();
        setModalValues(value);

        if (value.length < 3 || value.length > 20) {
            setUsernameError("Username must be between 3 and 20 characters.");
        } else {
            setUsernameError(null);
        }

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        setDebounceTimer(
            setTimeout(() => {
                checkUsernameValidity(value);
            }, 1000)
        );
    };

    const clearValues = () => {
        setOpen(false);
        setModalValues("");
        setModalType("");
        setUsernameError(null);
        setUsernameDescription(null);
    }

    return (
        <>
            <SettingModal
                isOpen={open}
                onClose={clearValues}
                onConfirm={handleSubmit}
                loading={loading}
                type={modalType}
                data={modalValues}
                setData={setModalValues}
                usernameError={usernameError}
                usernameDescription={usernameDescription}
                handleUsernameChange={handleUsernameChange}
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
                            className={cn("settings-toggle", setting.difficulty === "beginner" ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateDifficulty("beginner")}
                        >
                            Beginner
                        </div>
                        <div
                            className={cn("settings-toggle", setting.difficulty === "intermediate" ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateDifficulty("intermediate")}
                        >
                            Intermediate
                        </div>
                        <div
                            className={cn("settings-toggle", setting.difficulty === "expert" ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateDifficulty("expert")}
                        >
                            Expert
                        </div>
                    </div>
                </div>

                {/* Test Time Duration */}
                <div className="settings-box mt-5">
                    <div className="w-full md:w-[50%] space-y-2">
                        <div className="settings-title">
                            <Timer /> Time Duration
                        </div>
                        <div className="description-text">
                            Choose the time duration for the typing test.
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div
                            className={cn("settings-toggle", setting.time === 15 ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateTime(15)}
                        >
                            15 Sec
                        </div>
                        <div
                            className={cn("settings-toggle", setting.time === 30 ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateTime(30)}
                        >
                            30 Sec
                        </div>
                        <div
                            className={cn("settings-toggle", setting.time === 60 ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateTime(60)}
                        >
                            60 Sec
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

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full place-items-stretch">
                            {languages && Object.keys(languages).map((key: any) => (
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

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full place-items-stretch">
                            {fonts && Object.keys(fonts).map((key: any) => (
                                <div
                                    key={key}
                                    className={cn("settings-toggle md:w-[180px]", setting.fontFamily === key ? "bg-main text-main-foreground" : "bg-secondary")}
                                    onClick={() => setting.updateFontFamily(key)}
                                >
                                    {fonts[key]}
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
                {session?.user && <div className="settings-box mt-5">
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
                </div>}

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