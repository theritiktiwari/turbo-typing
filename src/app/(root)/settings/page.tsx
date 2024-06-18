"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSetting } from "@/hooks/use-setting";

const difficultyLevels = {
    beginner: "beginner",
    intermediate: "intermediate",
    expert: "expert",
}

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
                            className={cn("settings-toggle", setting.difficulty === difficultyLevels.beginner ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateDifficulty(difficultyLevels.beginner)}
                        >
                            Beginner
                        </div>
                        <div
                            aria-label="intermediate"
                            className={cn("settings-toggle", setting.difficulty === difficultyLevels.intermediate ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateDifficulty(difficultyLevels.intermediate)}
                        >
                            Intermediate
                        </div>
                        <div
                            aria-label="expert"
                            className={cn("settings-toggle", setting.difficulty === difficultyLevels.expert ? "bg-main text-main-foreground" : "bg-secondary")}
                            onClick={() => setting.updateDifficulty(difficultyLevels.expert)}
                        >
                            Expert
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}