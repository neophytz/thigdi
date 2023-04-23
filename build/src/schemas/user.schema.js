"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userValidator = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = __importDefault(require("zod"));
exports.userValidator = zod_1.default.object({
    name: zod_1.default.string().trim().toLowerCase().min(3, "Name should be greater than or equal to 3 chars.").max(100, "Name should be lesser than or equal to 100 chars."),
    email: zod_1.default.string().trim().toLowerCase().email("Please provide a valid email").min(3, "Email should be greater than or equal to 3 chars.").max(100, "Email should be lesser than or equal to 100 chars."),
    phone: zod_1.default.number()
});
// skeleton + rules.
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 100, // specify the maximum length of the attribute.
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 100, // specify the maximum length of the attribute.
    },
    phone: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});
// now we have to make a table aka Collection.
exports.User = (0, mongoose_1.model)("User", UserSchema);
