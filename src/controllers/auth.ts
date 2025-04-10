import { RequestHandler } from "express";
import { authSigninSchema } from "../schemas/auth-signin";
import { authSignUpSchema } from "../schemas/auth-signup";
import { create, getUserByEmail } from '../services/user';
import { generateOTP, validateOtp } from "../services/otp";
import { sendEmail } from "../libs/mailtrap";
import { authUseOTPSchema } from "../schemas/auth-useOtp";
import { createToken } from "../libs/jwt";

export const signin: RequestHandler = async (req, res) => {
    const data = authSigninSchema.safeParse(req.body);

    if(!data.success){
        res.status(500).json({ error: data.error.flatten().fieldErrors });
        return;
    }
    
    const user = await getUserByEmail(data.data.email);

    if(!user) {
        res.status(500).json({ error: 'User not found!' });
        return;
    }
    const otp = await generateOTP(user.id);
    await sendEmail(
        user.email,
        'Your access code is: ' +otp.code,
        'The OTP code is: ' +otp.code
    )
        
    res.status(201).json({ id: otp.id });
    
}

export const signup: RequestHandler = async (req, res) => {
    const data = authSignUpSchema.safeParse(req.body);

    if(!data.success){
        res.status(500).json({ error: data.error.flatten().fieldErrors });
        return;
    }

    const user = await getUserByEmail(data.data.email);

    if(user) {
        res.status(500).json({ error: 'User already exists!' });
        return;
    }

    const newUser = await create(data.data.name, data.data.email);

    res.status(201).json(newUser);
    return;

}

export const useOTP: RequestHandler = async (req, res) => {
    const data = authUseOTPSchema.safeParse(req.body);

    if(!data.success){
        res.status(500).json({ error: data.error.flatten().fieldErrors });
        return;
    }

    const user = await validateOtp(data.data.id, data.data.code);

    if(!user){
        res.status(500).json({ error: 'Invalid/Expired OTP'});
        return;
    }

    const token = createToken(user.id);

    res.json({token, user});
}