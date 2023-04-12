import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { AnyZodObject } from "zod"

const bodyParser = require("body-parser")

export const zodValidator = (schema: AnyZodObject) => 
    async (req:Request, res:Response, next:NextFunction) => {
    try{
        await schema.parseAsync({
            ...req.body
        });
        return next();
    }
    catch(error){
        return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}


export const middlewares = [
    bodyParser.json(),
]

