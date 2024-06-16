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
    badges: { type: [String] },
    experience: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    usernameChangeDate: { type: Date },
    typingLessonsProgress: { type: Map, of: Boolean },
    touchTypingProgress: { type: Number },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    instagramUsername: { type: String },
    twitterUsername: { type: String },
    linkedinUsername: { type: String },
    website: { type: String },
}, { timestamps: true });

const UserModel: Model<IUser> = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
