import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const discounts = await prisma.discount.findMany();
            res.status(200).json(discounts);
            break;
        case 'POST':
            const { discount_name, discount_type, discount_value } = req.body;
            const newDiscount = await prisma.discount.create({
                data: { discount_name, discount_type, discount_value },
            });
            res.status(201).json(newDiscount);
            break;
        // Add PUT and DELETE methods for updating and deleting discounts
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
