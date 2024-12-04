import { z } from 'zod';

const CreatePostValidation = z.object({
    title: z.string()
        .min(1, { message: 'Title is required' }),  
    body: z.string()
        .min(1, { message: 'Body is required' }),    
    
});


const PostSchema = {
    CreatePostValidation
};

export default PostSchema;

