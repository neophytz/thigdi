import { Document, Schema, model } from "mongoose";
import z from 'zod';

const todoValidator = z.object({
    title:z.string().trim().toLowerCase().min(3, "less than 3 chars").max(100),
    isCompleted:z.boolean().optional().default(false),
    // createdAt:z.date().optional().default(new Date())
})

type Todo = z.infer<typeof todoValidator>

export interface ITodo extends Todo, Document {}

// skeleton + rules.
const TodoSchema = new Schema<ITodo>({
    title: {
        type: String,
        required: true,
        trim: true, // remove space from front and back,
        lowercase: true, // convert the name to lowercase before saving
        minLength: 3, // specify the minimum length of the attribute.
        maxLength: 100, // specify the maximum length of the attribute.
    },
    isCompleted: {
        type: Boolean,
        required: false,
        default: false,
    },
}, {
    timestamps: true
})

// now we have to make a table aka Collection.
export const Todo = model<ITodo>("Todo", TodoSchema);
