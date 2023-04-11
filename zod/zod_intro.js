"use strict";
// console.log("hello from zod")
exports.__esModule = true;
var z = require("zod");
// structure of todo
// const str = {
//     title:"some title",
//     isCompleted: true
// }
// we have created a validator or schema or structure.
// interface todoValidatorTypescript {
//     title: string,
//     isCompleted : boolean
// }
// zod rules
var todoValidator = z.object({
    title: z.string(),
    isCompleted: z.boolean().optional()
});
// create a type of these rules.
// type todoValidatorZodType = z.infer<typeof todoValidator>
// how we use validation in typescript
// const todoBody : todoValidatorTypescript= {
// title:"I am title",
// isCompleted:true
// }
// const todoBody : todoValidatorZodType= {
// title:"I am title",
// isCompleted:true
// }
var todoBody = {
    title: "I am title",
    isCompleted: true
};
// to check whether data fulfills the rules or not.
// method 1 -> parse 
// console.log(todoValidator.parse(todoBody)); // it will crash my api when data is not fullfilling the rules
// method 2 -> safeParse
console.log(todoValidator.safeParse(todoBody));
// console.log(todoBody)
