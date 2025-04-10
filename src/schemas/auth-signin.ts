import { z } from 'zod';

export const authSigninSchema = z.object({
    email: z.string({ message: 'E-mail field is required!' }).email('Invalid E-mail')
})