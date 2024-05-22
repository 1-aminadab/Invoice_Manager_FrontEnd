import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card } from "@/app/components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";



const initialCustomerForm = {
  first_name: '',
  last_name: '',
  email: '',
  hashedRt: '',
  phone: '',
  address: '',
  city: '',
  country: ''
};

export default function FromTo() {
  const [formData, setFormData] = useState(initialCustomerForm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="flex h-screen w-full pl-[56px] ">
      <form className="grid lg:grid-cols-1 w-full items-start gap-6 overflow-auto p-4 pt-0" onSubmit={handleSubmit}>
        
        <Card>
        
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">User Information</legend>
            {Object.keys(initialCustomerForm).map((key) => (
              <div key={key} className="grid gap-3">
                <Label className='text-sm' htmlFor={key}>{key.replace('_', ' ').toUpperCase()}</Label>
                <Input 
                  id={key} 
                  type={key === 'email' ? 'email' : 'text'} 
                  placeholder={key} 
                  value={formData[key as keyof typeof formData]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <Button type="submit">Submit</Button>
          </fieldset>
        </Card>
      </form>
      <form className="grid lg:grid-cols-1 w-full items-start gap-6 overflow-auto p-4 pt-0" onSubmit={handleSubmit}>
        <Card>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Customer Information</legend>
            {Object.keys(initialCustomerForm).map((key) => (
              <div key={key} className="grid gap-3">
                <Label htmlFor={key}>{key.replace('_', ' ').toUpperCase()}</Label>
                <Input 
                  id={key} 
                  type={key === 'email' ? 'email' : 'text'} 
                  placeholder={key} 
                  value={formData[key as keyof typeof formData]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <Button type="submit">Submit</Button>
          </fieldset>
        </Card>
      </form>
    </div>
  );
}
