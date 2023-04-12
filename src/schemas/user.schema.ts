import { Document, Schema, model } from "mongoose";
import z from 'zod';

export const userValidator = z.object({
    name:z.string().trim().toLowerCase().min(3, "Name should be greater than or equal to 3 chars.").max(100, "Name should be lesser than or equal to 100 chars."),
    email:z.string().trim().toLowerCase().email("Please provide a valid email").min(3, "Email should be greater than or equal to 3 chars.").max(100, "Email should be lesser than or equal to 100 chars."),
    phone: z.number()
})

type User = z.infer<typeof userValidator>
export interface IUser extends User, Document {}

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
