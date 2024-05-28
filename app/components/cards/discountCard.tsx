import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Select from 'react-select';

export interface Discount {
  discount_id?: number;
  discount_added_by: number;
  discount_type: string;
  discount_value: number;
}

// Sample discount data, replace this with actual data fetching logic
const initialDiscount: Discount = {
  discount_id: 1,
  discount_added_by: 100,
  discount_type: 'Percentage',
  discount_value: 10.0,
};

const discountOptions = [
  { value: 'Percentage', label: 'Percentage' },
  { value: 'Fixed Amount', label: 'Fixed Amount' },
];

const DiscountCard: React.FC<{ id: number }> = () => {
  const [discount, setDiscount] = useState<Discount>(initialDiscount);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    // Simulate a delete action, in a real application you would make an API call here
    console.log('Discount deleted:', discount.discount_id);
    setDiscount({ discount_id: undefined, discount_added_by: 0, discount_type: '', discount_value: 0 });
  };

  const handleSaveClick = () => {
    // Simulate a save action, in a real application you would make an API call here
    console.log('Discount updated:', discount);
    setIsEditing(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDiscount({ ...discount, [name]: value });
  };

  const handleSelectChange = (selectedOption: any) => {
    setDiscount({ ...discount, discount_type: selectedOption.value });
  };

  return (
    <Card className="shadow-md p-4">
      <CardHeader>
        <CardTitle>Discount Details</CardTitle>
        <CardDescription>Manage discount information</CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-2">
            <Select
              value={discountOptions.find(option => option.value === discount.discount_type)}
              onChange={handleSelectChange}
              options={discountOptions}
              className="w-full"
              placeholder="Select Discount Type"
            />
            <Input
              type="number"
              name="discount_value"
              value={discount.discount_value}
              onChange={handleInputChange}
              placeholder="Discount Value"
              className="w-full"
            />
            <Button onClick={handleSaveClick} className="mt-2">Save</Button>
          </div>
        ) : (
          <div className="space-y-2">
            <p><strong>Discount Type:</strong> {discount.discount_type}</p>
            <p><strong>Discount Value:</strong> {discount.discount_value}</p>
            <Button onClick={handleEditClick} className="mt-2">Edit</Button>
            <Button onClick={handleDeleteClick} className="mt-2" variant="destructive">Delete</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default DiscountCard;
