import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Product } from '@/app/types/type';

// Sample product data, replace this with actual data fetching logic
const products: Product[] = [
  {
    product_id: 1,
    product_added_by: 123,
    product_name: 'Product 1',
    description: 'Description for Product 1',
    price: 100.00,
    tax_id: 1,
    discount_id: 1,
  },
  {
    product_id: 2,
    product_added_by: 456,
    product_name: 'Product 2',
    description: 'Description for Product 2',
    price: 150.00,
    tax_id: 2,
    discount_id: 2,
  },
  // Add more products as needed
];

function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Products</CardTitle>
        <CardDescription>Recent products from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Added By</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.product_id}
                onClick={() => handleRowClick(product)}
                className={`cursor-pointer ${selectedProduct?.product_id === product.product_id ? 'bg-gray-400 border rounded-md  shadow-md' : ''}`}
              >
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.product_added_by}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ProductList;
