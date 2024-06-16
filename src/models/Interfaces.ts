import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    usernameChangeDate?: Date;
    email: string;
    experience: number;
    level: number;
    badges?: string[];
    typingLessonsProgress?: { [lessonId: string]: boolean };
    touchTypingProgress?: number;
    instagramUsername?: string;
    twitterUsername?: string;
    linkedinUsername?: string;
    website?: string;
    role: string;
}

export interface ILesson extends Document {
    title: string;
    content: string;
    level: number;
    difficulty: string;
}

export interface ITestResult extends Document {
    userId: Schema.Types.ObjectId;
    wpm: number;
    accuracy: number;
    duration: number; // Duration of the typing test in seconds
    textSnippet: string; // The paragraph or text snippet used for the test
}