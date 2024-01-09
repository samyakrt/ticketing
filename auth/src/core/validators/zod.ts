import { z } from 'zod';

const errorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_type) {
        if (issue.received === 'undefined' || issue.received === 'null') {
          return { message: 'required'};
        }
        return { message: 'invalid value'};
      }
    if (issue.code === z.ZodIssueCode.invalid_string) {
        if (issue.validation === 'email') {
            return { message: 'invalid email' };
        }
    }
    return { message: ctx.defaultError };
};

z.setErrorMap(errorMap);

export const isEmail = z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Invalid email');


export default z;
