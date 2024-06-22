import mongoose, { Schema, Model } from "mongoose";
import { ITestResult } from "@/models/Interfaces";

const TestResultSchema: Schema<ITestResult> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    wpm: { type: Number, required: true },
    wps: { type: Number, required: true },
    cpm: { type: Number, required: true },
    cps: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    duration: { type: Number, required: true },
    language: { type: String, required: true },
}, { timestamps: true });

const TestResultModel: Model<ITestResult> = (mongoose.models.TestResult as mongoose.Model<ITestResult>) || mongoose.model<ITestResult>('TestResult', TestResultSchema);

export default TestResultModel;