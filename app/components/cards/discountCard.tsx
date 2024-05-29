import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Select from 'react-select';
import axios from 'axios';
import { deleteDiscountAPI, getDiscountAPI, updateDiscountAPI } from '@/app/apis';

export interface Discount {
  discount_id?: number;
  discount_added_by: number;
  discount_type: string;
  discount_value: number;
}

const discountOptions = [
  { value: 'Percentage', label: 'Percentage' },
  { value: 'Fixed Amount', label: 'Fixed Amount' },
];

const DiscountCard: React.FC<{ id: number; }> = ({ id}) => {
  const [discount, setDiscount] = useState<Discount | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await getDiscountAPI(id);
        console.log('====================================');
        console.log(response.data.data);
        console.log('====================================');
        setDiscount(response.data.data);
        setMessage('Discount fetched successfully.');
      } catch (error) {
        console.error('Error fetching discount:', error);
        setMessage('Error fetching discount.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDiscount();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteDiscountAPI(id);
      
      setMessage('Discount deleted successfully.');
    } catch (error) {
      console.error('Error deleting discount:', error);
      setMessage('Error deleting discount.');
    }
  };

  const handleSaveClick = async () => {
    try {
      if (discount) {
        await updateDiscountAPI(id, discount);
        setIsEditing(false);
        setMessage('Discount updated successfully.');
      }
    } catch (error) {
      console.error('Error updating discount:', error);
      setMessage('Error updating discount.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDiscount((prevDiscount) => (prevDiscount ? { ...prevDiscount, [name]: value } : null));
  };

  const handleSelectChange = (selectedOption: any) => {
    setDiscount((prevDiscount) => (prevDiscount ? { ...prevDiscount, discount_type: selectedOption.value } : null));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!discount) {
    return <div>No discount found.</div>;
  }

  return (
    <Card className="shadow-md p-4">
      <CardHeader>
        <CardTitle>Discount Details</CardTitle>
        <CardDescription>Manage discount information</CardDescription>
      </CardHeader>
      <CardContent>
        {message && <p>{message}</p>}
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
};

export default DiscountCard;
