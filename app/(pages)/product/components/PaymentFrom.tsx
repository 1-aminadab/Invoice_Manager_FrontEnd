'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardTitle,} from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectGroup } from '@/app/components/ui/select';
import { SelectItem } from '@radix-ui/react-select';

const PaymentForm = () => {
    const [invoiceId, setInvoiceId] = useState<number | null>(null);
    const [paymentDate, setPaymentDate] = useState('');
    const [paymentAmount, setPaymentAmount] = useState<number | null>(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (invoiceId && paymentDate && paymentAmount && paymentMethod && paymentStatus) {
            const newPayment = {
                invoice_id: invoiceId,
                payment_date: paymentDate,
                payment_amount: paymentAmount,
                payment_method: paymentMethod,
                payment_status: paymentStatus,
            };
            await axios.post('/api/payments', newPayment);
            // Optionally reset form or provide feedback
        } else {
            // Handle validation errors
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
                            value={invoiceId || ''}
                            onChange={(e) => setInvoiceId(parseInt(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="payment_date">Payment Date</Label>
                        <Input
                            id="payment_date"
                            type="date"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="payment_amount">Payment Amount</Label>
                        <Input
                            id="payment_amount"
                            type="number"
                            step="0.01"
                            value={paymentAmount || ''}
                            onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="payment_method">Payment Method</Label>
                        <Input
                            id="payment_method"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="payment_status">Payment Status</Label>
                        <Select
                           
                        > 
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="select">Select Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                           
                        </Select>
                    </div>
                    <Button type="submit">Add Payment</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default PaymentForm;
