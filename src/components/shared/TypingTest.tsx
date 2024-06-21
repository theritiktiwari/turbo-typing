"use client";

import { useState, useEffect, useRef } from "react";
import { SettingStore } from "@/hooks/use-setting";
import { Loader } from "@/components/ui/loader";

interface TypingTestProps {
    paragraph: string;
    time: number;
    handleTimer: () => void;
    setting: SettingStore;
    modifiers: {
        typedChars: string[];
        setTypedChars: React.Dispatch<React.SetStateAction<string[]>>;
        completedWords: string[];
        setCompletedWords: React.Dispatch<React.SetStateAction<string[]>>;
        setMistakeCounter: React.Dispatch<React.SetStateAction<number>>;
        setCorrectWords: React.Dispatch<React.SetStateAction<string[]>>;
    }
}

export function TypingTest({
    paragraph,
    time,
    handleTimer,
    setting,
    modifiers: {
        typedChars,
        setTypedChars,
        completedWords,
        setCompletedWords,
        setMistakeCounter,
        setCorrectWords
    }
}: TypingTestProps) {
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [checkFocus, setCheckFocus] = useState(false);
    const [currentWord, setCurrentWord] = useState('');
    const [mobileDevice, setMobileDevice] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (document.activeElement === inputRef.current) {
            setCheckFocus(true);
        } else {
            setCheckFocus(false);
        }
    }, [document.activeElement, inputRef.current]);

    useEffect(() => {
        if (time === setting.time) {
            setCurrentCharIndex(0);
            setTypedChars([]);
            setMistakeCounter(0);
            setCompletedWords([]);
            setCorrectWords([]);
            setCurrentWord('');
        }
    }, [time, setting.time]);

    useEffect(() => {
        const paragraphElement = document.querySelector("#typing-test__paragraph") as HTMLElement;
        if (paragraphElement) {
            const lineHeight = parseInt(window.getComputedStyle(paragraphElement).lineHeight!);
            if (currentCharIndex > 0 && currentCharIndex % 100 === 0) {
                const transform = paragraphElement.style.transform;
                const translateY = transform ? parseInt(transform.split("(")[1].split("px")[0]) : 0;
                paragraphElement.style.transform = `translateY(${translateY - lineHeight}px)`;
                paragraphElement.style.transition = "transform 0.3s ease-in-out";
            }
        }
    }, [currentCharIndex]);

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
            setCheckFocus(true);
        }
    };

    const handleCtrlBackspace = () => {
        const currentWord = paragraph.slice(
            currentCharIndex - typedChars.length,
            currentCharIndex
        ).split(" ").pop();

        if (completedWords.includes(currentWord!)) return;

        let newIndex = currentCharIndex;
        while (newIndex > 0 && paragraph[newIndex - 1] !== " ") {
            newIndex--;
        }
        setTypedChars((prev) => prev.slice(0, newIndex));
        setCurrentCharIndex(newIndex);
        setCurrentWord(paragraph.slice(newIndex, currentCharIndex));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 229 && typedChars.length === 0) {
            setMobileDevice(true);
        }
        const currentWordStartIndex = paragraph.slice(0, currentCharIndex).lastIndexOf(" ") + 1;
        const currentWordEndIndex = paragraph.indexOf(" ", currentWordStartIndex + 1);
        const correctWord = paragraph.slice(currentWordStartIndex, currentWordEndIndex === -1 ? undefined : currentWordEndIndex);

        if (e.key === "Backspace") {
            if (typedChars.length === 0) return;

            if (e.ctrlKey || e.altKey) {
                handleCtrlBackspace();
            } else if (typedChars.length > 0 && !completedWords.includes(currentWord)) {
                setTypedChars((prev) => prev.slice(0, -1));
                setCurrentCharIndex((prev) => Math.max(prev - 1, 0));
                setCurrentWord((prev) => prev.slice(0, -1));
            }
        } else if (e.key.length === 1) {
            handleTimer();

            const currentChar = paragraph[currentCharIndex];
            const newChar = e.key;

            if (currentChar === newChar) {
                setTypedChars((prev) => [...prev, newChar]);
                setCurrentCharIndex((prev) => prev + 1);
                setCurrentWord((prev) => prev + newChar);

                if (newChar === " ") {
                    if (!completedWords.includes(currentWord)) {
                        setCompletedWords((prev) => [...prev, currentWord]);
                        if (currentWord.trim() === correctWord) {
                            setCorrectWords((prev) => [...prev, currentWord.trim()]);
                        }
                    }
                    setCurrentWord('');
                }
            } else {
                setTypedChars((prev) => [...prev, newChar]);
                setCurrentCharIndex((prev) => prev + 1);
                setMistakeCounter((prev) => prev + 1);
            }
        } else if (e.key === " ") {
            if (!completedWords.includes(currentWord)) {
                setCompletedWords((prev) => [...prev, currentWord]);
                if (currentWord.trim() === correctWord) {
                    setCorrectWords((prev) => [...prev, currentWord.trim()]);
                }
            }
            setCurrentWord('');
        }
    };

    return (
        <>
            <input
                ref={inputRef}
                type="text"
                className="absolute opacity-0 pointer-events-none"
                onKeyUp={handleKeyDown}
            />
            {mobileDevice ? <div className="p-5 border text-center rounded-md">
                <div className="flex-center w-full h-full">
                    <span className="font-medium">
                        Your mobile device is not compatible with this test. <br />
                        Please use computer/laptop for better experience.
                    </span>
                </div>
            </div> : <div
                className={`typing-test__input`}
                onClick={handleFocus}
            >
                {!checkFocus ? (<div className="flex-center w-full h-full text-[30px]">
                    <span className="font-medium">Click to focus</span>
                </div>) : <>
                    {paragraph.length > 0 ? (
                        <div id="typing-test__paragraph" className={"text-[30px] text-muted-foreground"}>
                            {paragraph.split("").map((char, index) => {
                                let charClass = "";
                                if (index < currentCharIndex) {
                                    charClass = typedChars[index] === char ? "text-success" : "text-destructive";
                                } else if (index === currentCharIndex && currentCharIndex !== 0) {
                                    charClass = "typing-test__current_index relative";
                                }

                                return (
                                    <span key={index} className={charClass}>
                                        {char}
                                    </span>
                                );
                            })}
                        </div>
                    ) : (<Loader />)}
                </>}
            </div>}
        </>
    );
}