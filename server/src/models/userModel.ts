import mongoose, { Document, Schema, Types } from "mongoose";

export interface UserDocument extends Document {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
}

const UserSchema: Schema<UserDocument> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
