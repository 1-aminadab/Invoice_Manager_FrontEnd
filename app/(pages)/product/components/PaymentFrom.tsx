'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem } from '@/app/components/ui/select';
import { ArrowRightIcon } from 'lucide-react';
import { Payment } from '@/app/types/type';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPayment } from '@/app/lib/features/InvoiceSlice';

const PaymentForm = () => {
  const dispatch = useDispatch();
  const [payment, setPayment] = useState<Payment>({
    payment_date: new Date(),
    payment_amount: 0,
    payment_method: '',
    payment_status: '',
  });
  console.log("payment result", payment);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPayment((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setPayment((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    dispatch(addNewPayment(payment));
    console.log(payment);

  }, [payment, dispatch]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { payment_date, payment_amount, payment_method, payment_status } = payment;

    if (payment_date && payment_amount && payment_method && payment_status) {
      try {
        await axios.post('/api/payments', payment);
        console.log('Payment added successfully:', payment);
      } catch (error) {
        console.error('Error adding payment:', error);
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <CardTitle>Add New Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="invoice_id">Invoice ID</Label>
            <Input
              id="invoice_id"
              type="number"
              value={payment.invoice_id || ''}
              onChange={(e) => setPayment((prev) => ({ ...prev, invoice_id: parseInt(e.target.value) }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="payment_date">Payment Date</Label>
            <Input
              id="payment_date"
              type="date"
              value={payment.payment_date.toISOString().split('T')[0]}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          <div>
            <Label htmlFor="payment_amount">Payment Amount</Label>
            <Input
              id="payment_amount"
              type="number"
              step="0.01"
              value={payment.payment_amount || ''}
              onChange={(e) => setPayment((prev) => ({ ...prev, payment_amount: parseFloat(e.target.value) }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="payment_method">Payment Method</Label>
            {/* {newPayment?.payment_method} */}
            <Select
              value={payment.payment_method}
              onValueChange={(value) => handleSelectChange('payment_method', value)}
            >
              <SelectTrigger id="payment_method">
                <SelectValue placeholder="Select Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="payment_status">Payment Status</Label>
            <Select
              value={payment.payment_status}
              onValueChange={(value) => handleSelectChange('payment_status', value)}
            >
              <SelectTrigger id="payment_status">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">
            Next
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
