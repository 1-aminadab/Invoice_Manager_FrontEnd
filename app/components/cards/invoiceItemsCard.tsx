import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Select from 'react-select';
import { PlusCircle } from 'react-feather';  // Icon for adding new items

const productOptions = [
  { value: 1, label: 'Product 1' },
  { value: 2, label: 'Product 2' },
  { value: 3, label: 'Product 3' },
];

export interface InvoiceItem {
  invoice_item_id?: number;
  invoice_id?: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
}

const initialInvoiceItems: InvoiceItem[] = [
  {
    invoice_item_id: 1,
    invoice_id: 101,
    product_id: 1,
    quantity: 2,
    unit_price: 20.0,
    total_price: 40.0,
  },
  {
    invoice_item_id: 2,
    invoice_id: 102,
    product_id: 2,
    quantity: 1,
    unit_price: 50.0,
    total_price: 50.0,
  },
];

const InvoiceItemCard: React.FC<{id:number}> = ({id}) => {
  const [items, setItems] = useState<InvoiceItem[]>(initialInvoiceItems);

  const handleAddItem = () => {
    setItems([...items, { ...initialInvoiceItems[0], invoice_item_id: items.length + 1 }]);
  };

  const handleDeleteItem = (id: number | undefined) => {
    setItems(items.filter(item => item.invoice_item_id !== id));
  };

  const handleInputChange = (id: number | undefined, name: string, value: any) => {
    const updatedItems = items.map(item => {
      if (item.invoice_item_id === id) {
        const updatedItem = { ...item, [name]: value };
        if (name === 'quantity' || name === 'unit_price') {
          updatedItem.total_price = updatedItem.quantity * updatedItem.unit_price;
        }
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleSelectChange = (id: number | undefined, selectedOption: any) => {
    const updatedItems = items.map(item => {
      if (item.invoice_item_id === id) {
        return { ...item, product_id: selectedOption.value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <Card className="shadow-md p-4">
      <CardHeader>
        <CardTitle>Invoice Items</CardTitle>
        <CardDescription>Manage invoice items</CardDescription>
      </CardHeader>
      <CardContent>
        {items.map(item => (
          <div key={item.invoice_item_id} className="space-y-2 mb-4 p-2 border rounded-lg">
            <Select
              value={productOptions.find(option => option.value === item.product_id)}
              onChange={selectedOption => handleSelectChange(item.invoice_item_id, selectedOption)}
              options={productOptions}
              className="w-full"
              placeholder="Select Product"
            />
            <Input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(item.invoice_item_id, e.target.name, parseInt(e.target.value))}
              placeholder="Quantity"
              className="w-full"
            />
            <Input
              type="number"
              name="unit_price"
              value={item.unit_price}
              onChange={(e) => handleInputChange(item.invoice_item_id, e.target.name, parseFloat(e.target.value))}
              placeholder="Unit Price"
              className="w-full"
            />
            <p><strong>Total Price:</strong> ${item.total_price.toFixed(2)}</p>
            <Button onClick={() => handleDeleteItem(item.invoice_item_id)} variant="destructive">Delete</Button>
          </div>
        ))}
        <Button onClick={handleAddItem} className="mt-4 flex items-center">
          <PlusCircle className="mr-2" /> Add Item
        </Button>
      </CardContent>
    </Card>
  );
};

export default InvoiceItemCard;
