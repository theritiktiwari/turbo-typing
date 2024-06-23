import { Document, Schema } from 'mongoose';

export interface IMember extends Document {
    email: string;
}
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

export interface ITestResult extends Document {
    userId: Schema.Types.ObjectId;
    wpm: number;
    wps: number;
    cpm: number;
    cps: number;
    accuracy: number;
    duration: number; // Duration of the typing test in seconds
    language: string; 
}