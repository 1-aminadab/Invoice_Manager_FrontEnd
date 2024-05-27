import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Card } from "@/app/components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { addNewCustomer } from '@/app/lib/features/InvoiceSlice';

export interface User {
  user_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  country?: string;
}

const initialUserForm: User = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  phoneNumber: '',
  address: '',
  city: '',
  country: ''
};

const dummyCustomers = [
  { id: 1, label: 'John Doe', value: { first_name: 'John', last_name: 'Doe', email: 'john@example.com', password: 'password123', phoneNumber: '1234567890', address: '123 Main St', city: 'Anytown', country: 'USA' } },
  { id: 2, label: 'Jane Smith', value: { first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', password: 'password123', phoneNumber: '0987654321', address: '456 Elm St', city: 'Othertown', country: 'Canada' } }
];

export default function FormComponent() {
  const user = useSelector((state: { user: User }) => state.user); // Simulate getting a user from Redux
  const [userData, setUserData] = useState<User>(initialUserForm);
  const [customerData, setCustomerData] = useState<User>(initialUserForm);
  const [isFormValid, setIsFormValid] = useState(false);
 const dispatch = useDispatch()
  useEffect(() => {
    // Simulate setting initial user data from Redux
    if (user) {
      setUserData(user);
    }
  }, [user]);

  useEffect(() => {
    
    const allFieldsFilled = Object.values(customerData).every(field => field !== '');
    setIsFormValid(allFieldsFilled);
    dispatch(addNewCustomer(customerData))
  }, [customerData, dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, formType: 'user' | 'customer') => {
    const { id, value } = e.target;
    if (formType === 'user') {
      setUserData({
        ...userData,
        [id]: value
      });
    } else {
      setCustomerData({
        ...customerData,
        [id]: value
      });
    }
  };

  const handleCustomerSelect = (selectedOption: any) => {
    setCustomerData(selectedOption.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('User data:', userData);
    console.log('Customer data:', customerData);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full pl-[56px] gap-6 p-4">
      <form className="flex-1" onSubmit={handleSubmit}>
        <Card className="mb-6 lg:mb-0">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">User Information</legend>
            {Object.keys(initialUserForm).map((key) => (
              <div key={key} className="grid gap-3">
                <Label className='text-sm' htmlFor={key}>{key.replace('_', ' ').toUpperCase()}</Label>
                <Input
                  id={key}
                  type={key === 'email' ? 'email' : 'text'}
                  placeholder={key}
                  value={userData[key as keyof User] as string}
                  onChange={(e) => handleInputChange(e, 'user')}
                />
              </div>
            ))}
          </fieldset>
        </Card>
      </form>
      <form className="flex-1" onSubmit={handleSubmit}>
        <Card>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Customer Information</legend>
            <div className="grid gap-3">
              <Label className='text-sm' htmlFor="customer_select">Select Customer</Label>
              <Select
                id="customer_select"
                options={dummyCustomers}
                onChange={handleCustomerSelect}
              />
            </div>
            {Object.keys(initialUserForm).map((key) => (
              <div key={key} className="grid gap-3">
                <Label className='text-sm' htmlFor={key}>{key.replace('_', ' ').toUpperCase()}</Label>
                <Input
                  id={key}
                  type={key === 'email' ? 'email' : 'text'}
                  placeholder={key}
                  value={customerData[key as keyof User] as string}
                  onChange={(e) => handleInputChange(e, 'customer')}
                />
              </div>
            ))}
            <Button type="button" disabled={!isFormValid} onClick={handleSubmit}>Next</Button>
          </fieldset>
        </Card>
      </form>
    </div>
  );
}
