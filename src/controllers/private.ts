import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { getUserById } from "../services/user";

export const verify = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    if(!req.userId){
        res.json(401).json({ erro: 'Access denied!' });
        return;
    }

    const user = await getUserById(req.userId);

    if(!user){
        res.status(400).json({ error: 'User not found!' });
        return;
    }

    res.json({ user });
}