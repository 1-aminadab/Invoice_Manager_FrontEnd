import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const taxes = await prisma.tax.findMany();
            res.status(200).json(taxes);
            break;
        case 'POST':
            const { tax_name, tax_rate } = req.body;
            const newTax = await prisma.tax.create({
                data: { tax_name, tax_rate },
            });
            res.status(201).json(newTax);
            break;
        // Add PUT and DELETE methods for updating and deleting taxes
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
