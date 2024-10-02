import {z} from 'zod'

const UserValidation = z.object({
    id: z.string().regex(/^\d+$/).transform(Number).optional(),
    username: z.string(),
    mail: z.string(),
    fullname: z.string(),
    dateOfBirth: z.string().transform(Date),
    password: z.string(),
})

const UserAccountValidation = z.object({
    username: z.string(),
    password: z.string(),
    keepLogin: z.enum(['true', 'false']).transform((value) => value === 'true')
})

const UserSchema = {
    UserValidation,
    UserAccountValidation
}

export default UserSchema
module.exports = UserSchema

