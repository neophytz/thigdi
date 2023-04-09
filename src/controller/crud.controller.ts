// this can be little hard to understand, but if your OOPS concepts are solid, it's cake walk.
import { StatusCodes } from "http-status-codes";
import { BaseController } from "./base.controller";
import { Model, Document } from 'mongoose';
import { Response } from "express";

/**
 * It enables all CRUD operations on a mongodb schema using its model.
 * @param Model
*/
export class CRUDController<T> extends BaseController {
    private table_name = "";
    constructor(private model: Model<T>) {
        super()
        this.table_name = this.model.collection.collectionName.slice(0,-1);
    }

    private error_handler(res: Response, error: Error | any, status_code: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR) {
        return res.status(status_code).json(this.format_error(error))
    }

    // read
    public async get(res: Response, query: any = {}) {
        try {
            const data = await this.model.find(query)
            return res.status(StatusCodes.OK).json(this.format_res(data))
        } catch (error: unknown) {
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
        } catch (error: unknown) {
            this.error_handler(res, error)
        }
    }

    public async create(res: Response, document: any){
        try {
            const newEntry = await this.model.create(document);
            return res.status(StatusCodes.CREATED).json(this.format_res(newEntry, `${this.table_name} created successfully.`))
        } catch (error: unknown) {
            this.error_handler(res, error)
        }
    }

    /**
     * Function that updates a given document based on id.
     * @param res Response
     * @param id - Document Id that needs to be updated
     * @param data - Value that needs to updated in the Document.
     * @returns completes the request,
     */
    public async update(res: Response, id: string, data: any){
        try {
            const _updatedDoc = await this.model.findByIdAndUpdate(id, data);
            return res.status(StatusCodes.OK).json(this.format_res(_updatedDoc, `Given ${this.table_name} updated successfully.`))
        } catch (error: unknown) {
            this.error_handler(res, error)
        }
    }
    
    /**
     * Methods to delete a document from the table using _id.
     * @param res Response 
     * @param id Document that needs to be deleted
     * @returns Completed the request
     */
    public async delete(res: Response, id: string){
        try {
            const deleted = await this.model.findByIdAndDelete(id)
            return res.status(StatusCodes.OK).json(this.format_res(deleted, `Given ${this.table_name} deleted successfully.`))
        } catch (error: unknown) {
            this.error_handler(res, error)
        }
    }
}
