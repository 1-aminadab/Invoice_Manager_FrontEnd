import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import DiscountCard from './discountCard'; // Adjust the import path as needed
import TaxCard from './taxCard'; // Adjust the import path as needed
import { RootState } from '@/app/lib/store';
import { useSelector } from 'react-redux';

export interface Product {
  product_id?: number;
  product_added_by: number;
  product_name: string;
  description?: string;
  price: number;
  tax_id?: number;
  discount_id?: number;
}

const initialProduct: Product = {
  product_id: undefined,
  product_added_by: 0,
  product_name: '',
  description: '',
  price: 0,
  tax_id: undefined,
  discount_id: undefined,
};

const ProductCard: React.FC = () => {
  const { user } = useSelector((store: RootState) => store.user);
  const { selectedProduct } = useSelector((store: RootState) => store.product);
  const [product, setProduct] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      setProduct(null);
    }
    setLoading(false);
  }, [selectedProduct]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    console.log('Product deleted:', product?.product_id);
    setProduct({
      product_id: undefined,
      product_added_by: 0,
      product_name: '',
      description: '',
      price: 0,
      tax_id: undefined,
      discount_id: undefined,
    });
  };

  const handleSaveClick = () => {
    console.log('Product updated:', product);
    setIsEditing(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((prevProduct:any) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <Card className="shadow-md p-4">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>Manage product information</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading...</div>
        ) : product ? (
          isEditing ? (
            <div className="space-y-2">
              <Input
                type="text"
                name="product_name"
                value={product.product_name}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="w-full"
              />
              <Input
                type="text"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full"
              />
              <Input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="w-full"
              />
              <Button onClick={handleSaveClick} className="mt-2">Save</Button>
            </div>
          ) : (
            <div className="space-y-2">
              <p><strong>Product Name:</strong> {product.product_name}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <Button onClick={handleEditClick} className="mt-2">Edit</Button>
              <Button onClick={handleDeleteClick} className="mt-2" variant="destructive">Delete</Button>
            </div>
          )
        ) : (
          <div className="text-center text-2xl">Product not selected</div>
        )}
      </CardContent>
      {product && (
        <CardContent>
          {product.discount_id && <DiscountCard id={product.discount_id} />}
          {product.tax_id && <TaxCard id={product.tax_id} />}
        </CardContent>
      )}
    </Card>
  );
};

export default ProductCard;
