import { prisma } from '../libs/prisma';

export const getUserByEmail = async (email: string) => {
    try{
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    }
    catch (error) { throw error }
} 

export const getUserById = async (id: number) => {
    try{
        const user = await prisma.user.findUnique({ where: { id } });
        return user;
    }
    catch (error) { throw error }
} 

export const create = async (name: string, email: string) => {
    const user = await prisma.user.create({
        data: {
            name,
            email
        }
    });

    return user;
}