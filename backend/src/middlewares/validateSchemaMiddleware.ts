import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { errorUtils } from '../utils/index.js';

export default function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      const errorDetails = validation.error.details[0];
      throw errorUtils.wrongSchemaError(errorDetails.message);
    }

    const validatedSchema = schema.validate(req.body).value;
    res.locals.payload = {
      ...res.locals.payload,
      validSchema: validatedSchema,
    };
    next();
  };
}
