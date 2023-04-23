"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.todoValidator = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = __importDefault(require("zod"));
exports.todoValidator = zod_1.default.object({
    title: zod_1.default.string().trim().toLowerCase().min(3, "title should be greater than or equal to 3 chars.").max(100, "title should be less than or equal to 100 chars."),
    isCompleted: zod_1.default.boolean().optional().default(false),
});
// skeleton + rules.
const TodoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 100, // specify the maximum length of the attribute.
    },
    isCompleted: {
        type: Boolean,
        required: false,
        default: false,
    },
}, {
    timestamps: true
});
// now we have to make a table aka Collection.
exports.Todo = (0, mongoose_1.model)("Todo", TodoSchema);
