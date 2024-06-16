import mongoose, { Model, Schema } from 'mongoose';
import { ILesson } from "@/models/Interfaces";

const LessonSchema: Schema<ILesson> = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    level: { type: Number, required: true },
    difficulty: { type: String, required: true, enum: ['EASY', 'MEDIUM', 'HARD'] },
}, { timestamps: true });

const LessonModel: Model<ILesson> = (mongoose.models.Lesson as mongoose.Model<ILesson>) || mongoose.model<ILesson>('Lesson', LessonSchema);

export default LessonModel;