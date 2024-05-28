import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Tax {
  tax_id?: number;
  tax_added_by: number;
  tax_name: string;
  tax_rate: number;
}

// Sample tax data, replace this with actual data fetching logic
const initialTax: Tax = {
  tax_id: 1,
  tax_added_by: 100,
  tax_name: 'VAT',
  tax_rate: 15.0,
};

const TaxCard:React.FC<{id:number}> = ({id})=> {
  const [tax, setTax] = useState<Tax>(initialTax);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    // Simulate a delete action, in a real application you would make an API call here
    console.log('Tax deleted:', tax.tax_id);
    setTax({ tax_id: undefined, tax_added_by: 0, tax_name: '', tax_rate: 0 });
  };

  const handleSaveClick = () => {
    // Simulate a save action, in a real application you would make an API call here
    console.log('Tax updated:', tax);
    setIsEditing(false);
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setTax({ ...tax, [name]: value });
  };

  return (
    <Card className="shadow-md p-4">
      <CardHeader>
        <CardTitle className='text-underscore'>Tax Details</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-2">
            <Input
              type="text"
              name="tax_name"
              value={tax.tax_name}
              onChange={handleInputChange}
              placeholder="Tax Name"
              className="w-full"
            />
            <Input
              type="number"
              name="tax_rate"
              value={tax.tax_rate}
              onChange={handleInputChange}
              placeholder="Tax Rate"
              className="w-full"
            />
            <Button onClick={handleSaveClick} className="mt-2">Save</Button>
          </div>
        ) : (
          <div className="space-y-2">
            <p><strong>Tax Name:</strong> {tax.tax_name}</p>
            <p><strong>Tax Rate:</strong> {tax.tax_rate}%</p>
            <Button onClick={handleEditClick} className="mt-2">Edit</Button>
            <Button onClick={handleDeleteClick} className="mt-2" variant="destructive">Delete</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TaxCard;
