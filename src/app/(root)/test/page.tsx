"use client";

import { useSetting } from "@/hooks/use-setting";
import { TypingTest } from "@/components/shared/TypingTest";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Page() {
    const setting = useSetting();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [isMounted, setIsMounted] = useState(false);
    const [time, setTime] = useState(setting?.time);
    const [paragraph, setParagraph] = useState<string>("");
    const [characters, setCharacters] = useState<string[]>([]);
    const [words, setWords] = useState<string[]>([]);
    const [correctWords, setCorrectWords] = useState<string[]>([]);
    const [mistakes, setMistakes] = useState(0);

    const loadWords = async () => {
        try {
            const { language } = setting;
            const module = await import(`@/constants/languages/${language}.json`);
            const wordsArray = module.default[setting.difficulty];

            wordsArray.sort(() => Math.random() - 0.5);

            const wordsToParagraph = wordsArray.join(" ");
            setParagraph(wordsToParagraph);
        } catch (error) {
            console.error("Error while loading words:", error);
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        loadWords();
    }, [setting]);

    useEffect(() => {
        if (time === 0 && timerRef.current) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            timerRef.current = null;
        }
    }, [time]);

    if (!isMounted) {
        return null;
    }

    const handleTimer = () => {
        if (!timerRef.current) {
            timerRef.current = setInterval(() => {
                setTime((prev) => {
                    if (prev === 1) {
                        if (timerRef.current) {
                            clearInterval(timerRef.current as NodeJS.Timeout);
                            timerRef.current = null;
                        }
                    }
                    return Math.max(prev - 1, 0);
                });
            }, 1000);
        }
    };

    const restartTest = () => {
        setTime(setting.time);
        loadWords();
        if (timerRef.current) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            timerRef.current = null;
        }
    };

    return (
        <div className="typing-test__box">
            <div className="typing-box__top">
                {time === 0 ? <h1>Results</h1> : <h1>Start Typing</h1>}
                {time === 0 ? (
                    <Button variant={"main"} onClick={restartTest}>
                        Restart
                    </Button>
                ) : (
                    <div className="text-main">{time}</div>
                )}
            </div>

            {time !== 0 && (
                <TypingTest
                    paragraph={paragraph}
                    time={time}
                    handleTimer={handleTimer}
                    setting={setting}
                    modifiers={{
                        typedChars: characters,
                        setTypedChars: setCharacters,
                        setMistakeCounter: setMistakes,
                        setCorrectWords: setCorrectWords,
                        completedWords: words,
                        setCompletedWords: setWords
                    }}
                />
            )}
        </div>
    );
}