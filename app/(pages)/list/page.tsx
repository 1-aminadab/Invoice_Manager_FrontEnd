'use client'
import React, { useEffect, useState } from 'react';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
 
} from './api';
import { Product } from './api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip';

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const products = await fetchProducts();
      // console.log(products.data);
      
      // setProducts(products.data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  const handleCreateProduct = async (product: Omit<Product, 'id'>) => {
    const newProduct = await createProduct(product);
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = async (id: number, updatedProduct: Partial<Product>) => {
    const newProduct = await updateProduct(id, updatedProduct);
    setProducts(products.map((product) => (product.product_id === id ? newProduct : product)));
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.product_id !== id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        {/* Header Content */}
        <div className="relative ml-auto flex-1 md:grow-0">
          <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" />
        </div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total Sales</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products && products.map((product,index) => (
                  <TableRow key={index}>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell><Badge variant="outline">{product.price}</Badge></TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.tax_id}</TableCell>
                    <TableCell>{new Date().getFullYear()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUpdateProduct(product.product_id, { /* updated data */ })}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteProduct(product.product_id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>{products.length}</strong> products
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
