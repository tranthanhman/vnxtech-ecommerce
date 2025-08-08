import { RequestHandler } from 'express';
import { ZodType, ZodError } from 'zod';
import { error } from '../utils/response';

const validate = (
  schema: ZodType,
  source: 'body' | 'params' | 'query'
): RequestHandler => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req[source]);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages = err.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }));
        
        return error(res, `Invalid ${source} data`, 400, errorMessages);
      } else {
        next(err);
      }
    }
  };
};

const validateRequestBody = (schema: ZodType): RequestHandler => {
  return validate(schema, 'body');
};

const validateRequestParams = (schema: ZodType): RequestHandler => {
  return validate(schema, 'params');
};

const validateRequestQuery = (schema: ZodType): RequestHandler => {
  return validate(schema, 'query');
};

export { validateRequestBody, validateRequestParams, validateRequestQuery };
