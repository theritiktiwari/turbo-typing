"use client";

import { useSetting } from "@/hooks/use-setting";
import { TypingTest } from "@/components/shared/TypingTest";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import languageList from "@/constants/languages/_list.json";

interface JSONList {
    [key: string]: string;
}

export default function Page() {
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

    const loadWords = async () => {
        try {
            const { language } = setting;
            const module = await import(`@/constants/languages/${language}.json`);
            const wordsArray = module.default[setting.difficulty];
            wordsArray.push(...wordsArray);
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

    const saveResult = () => {
        // show the result to the user 
        const wordTyped = correctWords.length;
        const charactersTyped = characters.filter((char) => char !== " ").length;
        const correctCharacters = correctWords.reduce((acc, word) => acc + word.length, 0);
        const accuracy = Math.floor(100 - ((mistakes / charactersTyped) * 100));
        const language = languages[setting.language];
        const time = setting.time;
        const unit = setting.unit;
        const wpm = Math.round(((charactersTyped - mistakes) / 5) / (setting.time / 60));
        const cpm = Math.round((charactersTyped - mistakes) / (setting.time / 60));
        const wps = Math.round((charactersTyped - mistakes) / setting.time);
        const cps = Math.round((charactersTyped - mistakes) / setting.time);

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

        //TODO: Save the result to the database if loggedin 
    }

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