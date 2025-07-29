"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestQuery = exports.validateRequestParams = exports.validateRequestBody = void 0;
const zod_1 = require("zod");
const validate = (schema, source) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req[source]);
            next();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                res.status(400).json({
                    message: `Invalid ${source} schema`,
                    errors: err.issues,
                });
            }
            else {
                next(err);
            }
        }
    };
};
const validateRequestBody = (schema) => {
    return validate(schema, 'body');
};
exports.validateRequestBody = validateRequestBody;
const validateRequestParams = (schema) => {
    return validate(schema, 'params');
};
exports.validateRequestParams = validateRequestParams;
const validateRequestQuery = (schema) => {
    return validate(schema, 'query');
};
exports.validateRequestQuery = validateRequestQuery;
