import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from "@/models/Interfaces";

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Email address is not valid']
    },
    instagramUsername: { type: String },
    twitterUsername: { type: String },
    linkedinUsername: { type: String },
    website: { type: String },
    badges: { type: [String], default: [] },
    experience: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    usernameChangeDate: { type: Date, default: Date.now },
    typingLessonsProgress: { type: Map, of: Boolean, default: {} },
    touchTypingProgress: { type: Number, default: 0 },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
}, { timestamps: true });

const UserModel: Model<IUser> = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
