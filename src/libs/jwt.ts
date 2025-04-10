import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ExtendedRequest } from '../types/extended-request';

export const createToken = (id: number) => {
    return jwt.sign({ id }, process.env.JWT_KEY as string);
}

export const verifyToken = async (req : ExtendedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    
    if(!authHeader) {
        res.status(401).json({ error: 'Access denied!' });
        return;
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.JWT_KEY as string,
        (err, decoded: any) => {
            if(err){
                res.status(500).json({ error: 'Access denied!' });
                return;
            }

            req.userId = decoded.id;
            next();
        }
    );
}