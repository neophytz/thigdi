"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDController = void 0;
// this can be little hard to understand, but if your OOPS concepts are solid, it's cake walk.
const http_status_codes_1 = require("http-status-codes");
const base_controller_1 = require("./base.controller");
/**
 * It enables all CRUD operations on a mongodb schema using its model.
 * @param Model
*/
class CRUDController extends base_controller_1.BaseController {
    constructor(model) {
        super();
        this.model = model;
        this.table_name = "";
        this.table_name = this.model.collection.collectionName.slice(0, -1);
    }
    error_handler(res, error, status_code = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) {
        return res.status(status_code).json(this.format_error(error));
    }
    // read
    get(res, query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.model.find(query);
                return res.status(http_status_codes_1.StatusCodes.OK).json(this.format_res(data));
            }
            catch (error) {
                this.error_handler(res, error);
            }
        });
    }
    getById(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.model.findById(id);
                if (data) {
                    return res.status(http_status_codes_1.StatusCodes.OK).json(this.format_res(data));
                }
                this.error_handler(res, new Error("Not found"), http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            catch (error) {
                this.error_handler(res, error);
            }
        });
    }
    create(res, document) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newEntry = yield this.model.create(document);
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(this.format_res(newEntry, `${this.table_name} created successfully.`));
            }
            catch (error) {
                this.error_handler(res, error);
            }
        });
    }
    /**
     * Function that updates a given document based on id.
     * @param res Response
     * @param id - Document Id that needs to be updated
     * @param data - Value that needs to updated in the Document.
     * @returns completes the request,
     */
    update(res, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _updatedDoc = yield this.model.findByIdAndUpdate(id, data);
                return res.status(http_status_codes_1.StatusCodes.OK).json(this.format_res(_updatedDoc, `Given ${this.table_name} updated successfully.`));
            }
            catch (error) {
                this.error_handler(res, error);
            }
        });
    }
    /**
     * Methods to delete a document from the table using _id.
     * @param res Response
     * @param id Document that needs to be deleted
     * @returns Completed the request
     */
    delete(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield this.model.findByIdAndDelete(id);
                return res.status(http_status_codes_1.StatusCodes.OK).json(this.format_res(deleted, `Given ${this.table_name} deleted successfully.`));
            }
            catch (error) {
                this.error_handler(res, error);
            }
        });
    }
}
exports.CRUDController = CRUDController;
