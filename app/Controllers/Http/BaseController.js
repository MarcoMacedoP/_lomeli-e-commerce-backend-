
/**
 * Base controller with base http utils
 * @alias BaseController
 * @group Http
 *
 * @class BaseController
 * @constructor 
 *
 */
class BaseController {
    constructor({ controllerName }) {
        this.controllerName = controllerName
    }
    notFound({ response }) {
        return response.notFound({
            message: `${this.controllerName} not found`
        })
    }
    /** Merge an object  and return the save
     * 
     * @param {object} object  
     */
    async forInObject(object, callback) {
        Object.keys(object).forEach(key => key &&
            callback(key))
    }
}
module.exports = BaseController;