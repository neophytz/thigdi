import { Document, Schema, model } from "mongoose";

export interface ITodo extends Document {
    title: string,
    isCompleted: boolean,
}

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
