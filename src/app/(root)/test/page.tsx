"use client";

import { useSetting } from "@/hooks/use-setting";
import { TypingTest } from "@/components/shared/TypingTest";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import languageList from "@/constants/languages/_list.json";
import { useSession } from "next-auth/react";
import { addTestResult } from "@/services/tests";
import { UpdateUser } from "@/services/users";

interface JSONList {
    [key: string]: string;
}

export default function Page() {
    const { data: session, update } = useSession();

    const setting = useSetting();
    const languages: JSONList = languageList;
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [isMounted, setIsMounted] = useState(false);
    const [time, setTime] = useState(setting?.time);
    const [paragraph, setParagraph] = useState<string>("");
    const [characters, setCharacters] = useState<string[]>([]);
    const [words, setWords] = useState<string[]>([]);
    const [correctWords, setCorrectWords] = useState<string[]>([]);
    const [mistakes, setMistakes] = useState(0);
    const [result, setResult] = useState({
        wordTyped: 0,
        correctCharacters: 0,
        accuracy: 0,
        language: "",
        time: "",
        speed: ""
    });

    const debounce = (func: Function, wait: number) => {
        let timeout: NodeJS.Timeout;
        return (...args: any) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    const loadWords = useCallback(debounce(async () => {
        try {
            const { language } = setting;
            const languageName = await import(`@/constants/languages/${language}.json`);
            const wordsArray = languageName.default[setting.difficulty];
            wordsArray.push(...wordsArray);
            wordsArray.sort(() => Math.random() - 0.5);

            const wordsToParagraph = wordsArray.join(" ");
            setParagraph(wordsToParagraph);
        } catch (error) {
            console.error("Error while loading words:", error);
        }
    }, 300), [setting]);

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
            saveResult();
        }
        if (time === 0) {
            saveResult();
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

    const saveResult = async () => {
        // show the result to the user 
        const wordTyped = correctWords.length;
        const charactersTyped = characters.filter((char) => char !== " ").length;
        const correctCharacters = correctWords.reduce((acc, word) => acc + word.length, 0);
        const accuracy = correctCharacters > 0 ? Math.floor(100 - ((mistakes / charactersTyped) * 100)) : 0;
        const language = languages[setting.language];
        const time = setting.time;
        const unit = setting.unit;
        const wpm = accuracy > 0 ? Math.round(((charactersTyped - mistakes) / 5) / (setting.time / 60)) : 0;
        const cpm = accuracy > 0 ? Math.round((charactersTyped - mistakes) / (setting.time / 60)) : 0;
        const wps = accuracy > 0 ? Math.round(((charactersTyped - mistakes) / 5) / setting.time) : 0;
        const cps = accuracy > 0 ? Math.round((charactersTyped - mistakes) / setting.time) : 0;

        let speed = "";
        if (unit === "WPM") {
            speed = `${wpm} ${unit}`;
        } else if (unit === "CPM") {
            speed = `${cpm} ${unit}`;
        } else if (unit === "WPS") {
            speed = `${wps} ${unit}`;
        } else if (unit === "CPS") {
            speed = `${cps} ${unit}`;
        }

        setResult({
            wordTyped,
            correctCharacters,
            accuracy,
            language,
            time: `${time} Sec`,
            speed
        });

        if (session?.user) {
            // save the result to the database
            await addTestResult({
                userId: session.user?._id,
                wpm,
                wps,
                cpm,
                cps,
                accuracy,
                duration: time,
                language: setting.language
            });

            // calculate experience and level
            const baseExp = setting.difficulty === "beginner" ? 10 : setting.difficulty === "intermediate" ? 20 : 30;
            const timeFactor = time / 10;
            const accuracyFactor = accuracy / 100;
            const speedFactor = wpm / 10;
            const mistakeFactor = mistakes > 0 ? 1 / mistakes : 1;

            const oldExperience = session.user?.experience;
            const experience = Math.floor(baseExp * timeFactor * accuracyFactor * speedFactor * mistakeFactor) + oldExperience;
            const level = Math.floor(experience / 200) + 1;

            // save the new experience and level to the database
            const response = await UpdateUser({ id: session?.user?._id, level, experience });

            // update the session with the new experience and level
            if (response.success) {
                update({ level, experience });
            }
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

            {time === 0 && (
                <div className="typing-test__results">
                    <div className="results__box">
                        <span>Language</span>
                        <span className="md:hidden">:</span>
                        <span className="font-medium md:text-2xl">{result.language}</span>
                    </div>

                    <div className="results__box">
                        <span>Speed</span>
                        <span className="md:hidden">:</span>
                        <span className="font-medium md:text-2xl">{result.speed}</span>
                    </div>

                    <div className="results__box">
                        <span>Accuracy</span>
                        <span className="md:hidden">:</span>
                        <span className="font-medium md:text-2xl">{`${result.accuracy} %`}</span>
                    </div>

                    <div className="results__box">
                        <span>Test Time</span>
                        <span className="md:hidden">:</span>
                        <span className="font-medium md:text-2xl">{result.time}</span>
                    </div>

                    <div className="results__box">
                        <span>Characters</span>
                        <span className="md:hidden">:</span>
                        <span className="font-medium md:text-2xl">
                            <span className="text-success">{result.correctCharacters}</span>
                            <span> / </span>
                            <span className="text-destructive">{mistakes}</span>
                        </span>
                    </div>
                    <div className="results__box">
                        <span>Total Words</span>
                        <span className="md:hidden">:</span>
                        <span className="font-medium md:text-2xl">{result.wordTyped}</span>
                    </div>
                </div>
            )}

        </div>
    );
}