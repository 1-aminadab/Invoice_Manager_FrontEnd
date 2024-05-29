import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Product } from '@/app/types/type';
import { getProductsAPI } from '@/app/apis';
import { useDispatch } from 'react-redux';
import { fetchProductsSuccess, setSelectedProduct } from '@/app/lib/features/productSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/store';

function ProductList() {
  const dispatch = useDispatch();
  const {user} = useSelector((store:RootState)=> store.user)
  const [products, setProducts] = useState<Product[] | null>(null);
  const [productSelected, setProductSelected] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const getAllProducts = async () => {
    try {
      const response = await getProductsAPI();
      const data = response.data;

      if (data.status === 200) {
        setProducts(data.data);
        dispatch(fetchProductsSuccess(data.data));
        setIsEmpty(data.data.length === 0);
      } else {
        setProducts([]);
        setIsEmpty(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setIsEmpty(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleRowClick = (product: Product) => {
   dispatch(setSelectedProduct(product))
    setProductSelected(product);
  };

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Products</CardTitle>
        <CardDescription>Recent products from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Loading...</div>
        ) : isEmpty ? (
          <div className="empty-box">No products available.</div>
        ) : (
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
              {products?.map((product) => (
                <TableRow
                  key={product.product_id}
                  onClick={() => handleRowClick(product)}
                  className={`cursor-pointer ${productSelected?.product_id === product.product_id ? 'bg-gray-400 border rounded-md shadow-md' : ''}`}
                >
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{user?.first_name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default ProductList;
