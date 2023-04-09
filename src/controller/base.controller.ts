/**
 * Base controller class, that provide methods for standard http res and error handling. 
 */
export class BaseController {

    private _formatter (data: any, message: string = 'ok', success: boolean = true) {
        if (success === false && data.code == 11000) { 
            // 11000 is for duplicates.
            message = ``;
            Object.keys(data.keyValue).forEach(key => {
                message += `${key} : ${data.keyValue[key]} already exist in our record. `
            })
        }
        if (success === false && data.name == "ValidationError") message = data.message;

        return { data, success, message }
    }

    public format_res (data: any, message: string = 'ok') {
        return this._formatter(data, message, true)
    }

    public format_error (error: Error, message: string = 'something went wrong.') {
        return this._formatter(error, message, false)
    }

}