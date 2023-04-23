"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
/**
 * Base controller class, that provide methods for standard http res and error handling.
 */
class BaseController {
    _formatter(data, message = 'ok', success = true) {
        if (success === false && data.code == 11000) {
            // 11000 is for duplicates.
            message = ``;
            Object.keys(data.keyValue).forEach(key => {
                message += `${key} : ${data.keyValue[key]} already exist in our record. `;
            });
        }
        if (success === false && data.name == "ValidationError")
            message = data.message;
        return { data, success, message };
    }
    format_res(data, message = 'ok') {
        return this._formatter(data, message, true);
    }
    format_error(error, message = 'something went wrong.') {
        return this._formatter(error, message, false);
    }
}
exports.BaseController = BaseController;
