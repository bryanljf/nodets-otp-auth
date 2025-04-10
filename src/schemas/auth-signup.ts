import { z } from 'zod';

export const authSignUpSchema = z.object({
    name: z.string({ message: 'Name field is required! '}),
    email: z.string({ message: 'E-mail field is required! '}).email(' Invalid E-mail ')
});