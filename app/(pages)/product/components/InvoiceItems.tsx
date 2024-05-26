import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Button } from '@/app/components/ui/button';
import { Card, CardHeader } from '@/app/components/ui/card';
import { Textarea } from '@/app/components/ui/text-area';
import { getDiscount, getProduct, getTax, productsList } from '@/app/lib/calculator/invoice';
import { ArrowRightIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addNewInvoiceItems } from '@/app/lib/features/InvoiceSlice';

interface InvoiceItem {
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
}

const InvoiceForm: React.FC = () => {
  const [items, setItems] = useState<InvoiceItem[]>([
    { product_id: 0, quantity: 1, unit_price: 0, total_price: 0 },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addNewInvoiceItems(items));
  }, [items]);

  const handleProductChange = (index: number, product_id: number) => {
    const selectedProduct = productsList.find(product => product.product_id === product_id);
    if (!selectedProduct) return;

    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        product_id: selectedProduct.product_id,
        unit_price: selectedProduct.price,
      };
      calculateTotalPrice(index, updatedItems);
      return updatedItems;
    });
  };

  const handleQuantityChange = (index: number, quantity: number ) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: quantity,
      };
      calculateTotalPrice(index, updatedItems);
      return updatedItems;
    });
  };

  const calculateTotalPrice = (index: number, items: InvoiceItem[]) => {
    const item = items[index];
    const basePrice = item.unit_price * item.quantity;
    const discountRate = getDiscount(getProduct(item.product_id)?.discount_id || 0)?.discount_value || 0;
    const taxRate = getTax(getProduct(item.product_id)?.tax_id || 0)?.tax_rate || 0;
    const discountAmount = basePrice * discountRate;
    const taxedAmount = (basePrice - discountAmount) * taxRate;
    const totalPrice = basePrice - discountAmount + taxedAmount;

    items[index].total_price = parseFloat(totalPrice.toFixed(2));
  };

  const addItem = () => {
    setItems(prevItems => [
      ...prevItems,
      { product_id: 0, quantity: 1, unit_price: 0, total_price: 0 },
    ]);
  };

  const getAvailableProducts = () => {
    const selectedProductIds = items.map(item => item.product_id);
    return productsList.filter(product => !selectedProductIds.includes(product.product_id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Invoice Items</h2>
      {items.map((item, index) => (
        <Card key={index} className="mb-6 p-4 border rounded shadow">
          <div className='flex items-center contet-between  '> 
            <CardHeader className="mb-4">
            <h3 className="text-xl font-semibold">Product {index + 1}</h3>
          </CardHeader>
          <Button variant="outline">delete</Button>

          </div>
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product</label>
              <Select
                options={getAvailableProducts().map(product => ({ value: product.product_id, label: product.product_name }))}
                onChange={(option) => handleProductChange(index, option?.value || 0)}
                placeholder="Select a product"
              />
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

      <div className='w-[100%] bg-slate-300 flex content-center items-center'>
      <Button type="submit">
            Next
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Button>
      </div>
    </div>
  );
};

export default InvoiceForm;
