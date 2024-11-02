import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';  // Import ZodError
import ResponseBuilder from '../handler/responseBuilder';
const validate = (schema: ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {  
                const messages = error.errors.map(err => err.message); 
                return res.status(400).json({ errors: messages });
            } else {
                return ResponseBuilder.BadRequest(res, 'Invalid request');
            }
        }
    };
};

export default validate;
