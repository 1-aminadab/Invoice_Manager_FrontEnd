import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Card, CardHeader } from '@/app/components/ui/card';
import { Textarea } from '@/app/components/ui/text-area';

// Dummy data for products
const products = [
  { id: 1, name: 'Product 1', unit_price: 10.00, tax: 0.05, discount: 0.10 },
  { id: 2, name: 'Product 2', unit_price: 20.00, tax: 0.10, discount: 0.15 },
  { id: 3, name: 'Product 3', unit_price: 30.00, tax: 0.15, discount: 0.20 },
];

interface Product {
  id: number;
  name: string;
  unit_price: number;
  tax: number;
  discount: number;
}

interface InvoiceItem {
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  tax: number;
  discount: number;
}

const InvoiceForm: React.FC = () => {
  const [items, setItems] = useState<InvoiceItem[]>([
    { product_id: 0, quantity: 1, unit_price: 0, total_price: 0, tax: 0, discount: 0 },
  ]);

  const handleProductChange = (index: number, product_id: number) => {
    const selectedProduct = products.find(product => product.id === product_id);
    if (!selectedProduct) return;

    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      product_id: selectedProduct.id,
      unit_price: selectedProduct.unit_price,
      tax: selectedProduct.tax,
      discount: selectedProduct.discount,
    };
    calculateTotalPrice(index, updatedItems);
    setItems(updatedItems);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = quantity;
    calculateTotalPrice(index, updatedItems);
    setItems(updatedItems);
  };

  const calculateTotalPrice = (index: number, items: InvoiceItem[]) => {
    const item = items[index];
    const basePrice = item.unit_price * item.quantity;
    const discountAmount = basePrice * item.discount;
    const taxedAmount = (basePrice - discountAmount) * item.tax;
    const totalPrice = basePrice - discountAmount + taxedAmount;

    items[index].total_price = parseFloat(totalPrice.toFixed(2));
  };

  const addItem = () => {
    setItems([
      ...items,
      { product_id: 0, quantity: 1, unit_price: 0, total_price: 0, tax: 0, discount: 0 },
    ]);
  };

  const getAvailableProducts = () => {
    const selectedProductIds = items.map(item => item.product_id);
    return products.filter(product => !selectedProductIds.includes(product.id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Invoice Items</h2>
      {items.map((item, index) => (
        <Card key={index} className="mb-6 p-4 border rounded shadow">
          <CardHeader className="mb-4">
            <h3 className="text-xl font-semibold">Product {index + 1}</h3>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product</label>
              <Select onValueChange={(value) => handleProductChange(index, parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={(0).toString()}>Select a product</SelectItem>
                  {getAvailableProducts().map(product => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded p-2"
                value={item.quantity}
                min={1}
                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Unit Price</label>
              <Textarea
                value={item.unit_price.toFixed(2)}
                readOnly
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Price</label>
              <Textarea
                value={item.total_price.toFixed(2)}
                readOnly
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
          </div>
        </Card>
      ))}
      <Button onClick={addItem} className="mt-4">Add Product</Button>
    </div>
  );
};

export default InvoiceForm;
