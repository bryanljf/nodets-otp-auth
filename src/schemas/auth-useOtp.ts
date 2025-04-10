import { z } from "zod";

export const authUseOTPSchema = z.object({
    id: z.string({ message: 'OTP ID is required! '}),
    code: z.string({ message: 'OTP Code is required!' }).length(6, 'Invalid Code!')
});