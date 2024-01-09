import { ValidationFailedError } from '@/core/exceptions';
import { ExtractedErrorsType } from '@/core/types/error';
import { NextFunction, Request, Response } from 'express';
import z, { Schema } from 'zod';

const validateSchema = (schema: Schema) => {
    return (req: Request,res: Response, next: NextFunction) => {
        const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.issues
        .map(issue => [issue.path.join('.'), issue.message])
        .reduce((acc, [key, msg]) => {
          if (key in acc) {
            acc[key].push(msg);
          } else {
            acc[key] = [msg];
          }
          return acc;
        }, {} as ExtractedErrorsType);

      throw new ValidationFailedError('validation failed', errors);
    }
    req.body = parsed.data;
    }
}

export default validateSchema;
