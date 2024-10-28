import { z } from 'zod';

const UserValidation = z.object({
    id: z.string().regex(/^\d+$/).transform(Number).optional(),
    username: z.string()
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(255, { message: 'Username must be 255 characters or less' })
        .min(1, { message: 'Username is required' }),  // Ensuring username is required
    mail: z.string()
        .email({ message: 'Email is invalid' })
        .min(1, { message: 'Email is required' }),      // Ensuring mail is required
    fullname: z.string()
        .min(1, { message: 'Fullname is required' })
        .max(255, { message: 'Fullname must be 255 characters or less' }),
    dateOfBirth: z.string()
        .refine((val) => !isNaN(Date.parse(val)), { message: 'Date of birth must be a valid date' })
        .transform((val) => new Date(val)),
    password: z.string()
        .min(5, { message: 'Password must be at least 5 characters' })
        .max(255, { message: 'Password must be 255 characters or less' })
        .min(1, { message: 'Password is required' })   // Ensuring password is required
});

const UserAccountValidation = z.object({
    username: z.string()
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(255, { message: 'Username must be 255 characters or less' })
        .min(1, { message: 'Username is required' }),
    password: z.string()
        .min(5, { message: 'Password must be at least 5 characters' })
        .max(255, { message: 'Password must be 255 characters or less' })
        .min(1, { message: 'Password is required' }),
    keepLogin: z.enum(['true', 'false'], { 
        required_error: 'keepLogin is required', 
        invalid_type_error: 'keepLogin must be either "true" or "false"' 
    }).transform((value) => value === 'true')
});

const UserSchema = {
    UserValidation,
    UserAccountValidation
};

export default UserSchema;
module.exports = UserSchema;
