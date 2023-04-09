// this can be little hard to understand, but if your OOPS concepts are solid, it's cake walk.
import { StatusCodes } from "http-status-codes";
import { BaseController } from "./base.controller";
import { Model, Document } from 'mongoose';
import { Response } from "express";

/**
 * It enables all CRUD operations on a mongodb schema.
 * @param Model
*/
export class CRUDController<T> extends BaseController {
    constructor(private model: Model<T>) {
        super()
    }

    private error_handler(res: Response, error: Error, status_code: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR) {
        return res.status(status_code).json(this.format_error(error))
    }

    // read
    public async get(res: Response, query: any) {
        try {
            const data = await this.model.find(query)
            return res.status(StatusCodes.OK).json(this.format_res(data))
        } catch (error) {
            this.error_handler(res, error)
        }
    }

    public async getById(res: Response, id: any){
        try {
            const data = await this.model.findById(id)
            if (data) {
                return res.status(StatusCodes.OK).json(this.format_res(data))
            } 
            this.error_handler(res, new Error("Not found"), StatusCodes.NOT_FOUND)
        } catch (error) {
            this.error_handler(res, error)
        }
    }

    public create(res: Response, document: any){
        try {
            const newEntry = this.model.create(document);
            return res.status(StatusCodes.CREATED).json(this.format_res(newEntry, "Entry created successfully."))
        } catch (error) {
            this.error_handler(res, error)
        }
    }

    // update and delete will do tomorrow.
}
