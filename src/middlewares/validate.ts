import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../handler/error.response'; 

interface Schema<T> {
    validate(value: T): ValidationResult;
}

const validate = <T>(schema: Schema<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body as T);
        if (error) {
            throw new BadRequestError(error.message);
        }
        next();
    };
};

export default validate