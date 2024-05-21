import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const products = await prisma.product.findMany();
            res.status(200).json(products);
            break;
        case 'POST':
            const { product_name, product_description, unit_price, tax_id, discount_id } = req.body;
            const newProduct = await prisma.product.create({
                data: { product_name, product_description, unit_price, tax_id, discount_id },
            });
            res.status(201).json(newProduct);
            break;
        // Add PUT and DELETE methods for updating and deleting products
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
