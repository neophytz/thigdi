import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string,
    phone: number
}

// skeleton + rules.
const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true, // remove space from front and back,
        lowercase: true, // convert the name to lowercase before saving
        minLength: 3, // specify the minimum length of the attribute.
        maxLength: 100, // specify the maximum length of the attribute.
    },
    email:{
        type: String,
        required: true,
        trim: true, // remove space from front and back,
        lowercase: true, // convert the name to lowercase before saving
        minLength: 3, // specify the minimum length of the attribute.
        maxLength: 100, // specify the maximum length of the attribute.
    },
    phone: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

// now we have to make a table aka Collection.
export const User = model<IUser>("User", UserSchema);
