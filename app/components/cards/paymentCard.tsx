import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const paymentMethodOptions = [
  { value: 'Credit Card', label: 'Credit Card' },
  { value: 'Bank Transfer', label: 'Bank Transfer' },
  { value: 'PayPal', label: 'PayPal' },
];

const paymentStatusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Failed', label: 'Failed' },
];

export interface Payment {
  payment_id?: number;
  invoice_id?: number;
  payment_date: Date;
  payment_amount: number;
  payment_method: string;
  payment_status: string;
}

const initialPayment: Payment = {
  payment_id: 1,
  invoice_id: 100,
  payment_date: new Date(),
  payment_amount: 200.0,
  payment_method: 'Credit Card',
  payment_status: 'Pending',
};

const PaymentCard: React.FC<{invoiceId:number}> = ({invoiceId}) => {
  const [payment, setPayment] = useState<Payment>(initialPayment);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    // Simulate a delete action, in a real application you would make an API call here
    console.log('Payment deleted:', payment.payment_id);
    setPayment({
      payment_id: undefined,
      invoice_id: undefined,
      payment_date: new Date(),
      payment_amount: 0,
      payment_method: '',
      payment_status: '',
    });
  };

  const handleSaveClick = () => {
    // Simulate a save action, in a real application you would make an API call here
    console.log('Payment updated:', payment);
    setIsEditing(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleDateChange = (date: Date) => {
    setPayment({ ...payment, payment_date: date });
  };

  const handleMethodChange = (selectedOption: any) => {
    setPayment({ ...payment, payment_method: selectedOption.value });
  };

  const handleStatusChange = (selectedOption: any) => {
    setPayment({ ...payment, payment_status: selectedOption.value });
  };

  return (
    <Card className="shadow-md p-4">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Manage payment information</CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-2">
            <DatePicker
              selected={payment.payment_date}
              onChange={handleDateChange}
              className="w-full"
            />
            <Input
              type="number"
              name="payment_amount"
              value={payment.payment_amount}
              onChange={handleInputChange}
              placeholder="Payment Amount"
              className="w-full"
            />
            <Select
              value={paymentMethodOptions.find(option => option.value === payment.payment_method)}
              onChange={handleMethodChange}
              options={paymentMethodOptions}
              className="w-full"
              placeholder="Select Payment Method"
            />
            <Select
              value={paymentStatusOptions.find(option => option.value === payment.payment_status)}
              onChange={handleStatusChange}
              options={paymentStatusOptions}
              className="w-full"
              placeholder="Select Payment Status"
            />
            <Button onClick={handleSaveClick} className="mt-2">Save</Button>
          </div>
        ) : (
          <div className="space-y-2">
            <p><strong>Payment Date:</strong> {payment.payment_date.toDateString()}</p>
            <p><strong>Payment Amount:</strong> ${payment.payment_amount}</p>
            <p><strong>Payment Method:</strong> {payment.payment_method}</p>
            <p><strong>Payment Status:</strong> {payment.payment_status}</p>
            <Button onClick={handleEditClick} className="mt-2">Edit</Button>
            <Button onClick={handleDeleteClick} className="mt-2" variant="destructive">Delete</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PaymentCard;
