import mongoose, { Model, Schema } from 'mongoose';
import { IMember } from "@/models/Interfaces";

const MemberSchema: Schema<IMember> = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Email address is not valid']
    },
}, { timestamps: true });

const MemberModel: Model<IMember> = (mongoose.models.Member as mongoose.Model<IMember>) || mongoose.model<IMember>('Member', MemberSchema);

export default MemberModel;