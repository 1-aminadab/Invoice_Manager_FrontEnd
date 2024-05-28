import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import InvoiceItemCard from './invoiceItemsCard';
import PaymentCard from './paymentCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

export interface Invoice {
  invoice_id?: number;
  invoice_number: string;
  from_customer_id: number;
  to_customer_id: number;
  date_issued?: Date | string;
  due_date?: Date | string;
  status: string;
  total_amount: number;
  tax_amount: number;
  subtotal: number;
}

const statusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Fulfilled', label: 'Fulfilled' },
  { value: 'Cancelled', label: 'Cancelled' },
];
const initialInvoice: Invoice = {
  invoice_id: 1,
  invoice_number: 'INV001',
  from_customer_id: 123,
  to_customer_id: 456,
  date_issued: '2023-05-01',
  due_date: '2023-06-01',
  status: 'Fulfilled',
  total_amount: 250.00,
  tax_amount: 20.00,
  subtotal: 230.00,
};

const InvoiceCard: React.FC= () => {
  const [invoice, setInvoice] = useState<Invoice>(initialInvoice);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    console.log('Invoice deleted:', invoice.invoice_id);
    // Add delete logic here
  };

  const handleSaveClick = () => {
    console.log('Invoice updated:', invoice);
    setIsEditing(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleSelectChange = (selectedOption: any) => {
    setInvoice({ ...invoice, status: selectedOption.value });
  };

  const handleDateChange = (name: string, date: Date) => {
    setInvoice({ ...invoice, [name]: date });
  };

  return (
    <Card className="shadow-md p-4">
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
        <CardDescription>Manage invoice information</CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-2">
           <label className="block">
  Invoice Number:
  <Input
    type="text"
    name="invoice_number"
    value={invoice.invoice_number}
    onChange={handleInputChange}
    placeholder="Invoice Number"
    className="w-full"
  />
</label>
<label className="block">
  From Customer ID:
  <Input
    type="number"
    name="from_customer_id"
    value={invoice.from_customer_id}
    onChange={handleInputChange}
    placeholder="From Customer ID"
    className="w-full"
  />
</label>
<label className="block">
  To Customer ID:
  <Input
    type="number"
    name="to_customer_id"
    value={invoice.to_customer_id}
    onChange={handleInputChange}
    placeholder="To Customer ID"
    className="w-full"
  />
</label>
<label className="block">
  Date Issued:
  <DatePicker
    selected={new Date(invoice.date_issued as string)}
    onChange={(date: Date) => handleDateChange('date_issued', date)}
    className="w-full"
  />
</label>
<label className="block">
  Due Date:
  <DatePicker
    selected={new Date(invoice.due_date as string)}
    onChange={(date: Date) => handleDateChange('due_date', date)}
    className="w-full"
  />
</label>
<label className="block">
  Total Amount:
  <Input
    type="number"
    name="total_amount"
    value={invoice.total_amount}
    onChange={handleInputChange}
    placeholder="Total Amount"
    className="w-full"
  />
</label>
<label className="block">
  Tax Amount:
  <Input
    type="number"
    name="tax_amount"
    value={invoice.tax_amount}
    onChange={handleInputChange}
    placeholder="Tax Amount"
    className="w-full"
  />
</label>
<label className="block">
  Subtotal:
  <Input
    type="number"
    name="subtotal"
    value={invoice.subtotal}
    onChange={handleInputChange}
    placeholder="Subtotal"
    className="w-full"
  />
</label>
<label className="block">
  Status:
  <Select
    value={statusOptions.find(option => option.value === invoice.status)}
    onChange={handleSelectChange}
    options={statusOptions}
    className="w-full"
    placeholder="Select Status"
  />
</label>

            <Button onClick={handleSaveClick} className="mt-2">Save</Button>
          </div>
        ) : (
          <div className="space-y-2">
            <p><strong>Invoice Number:</strong> {invoice.invoice_number}</p>
            <p><strong>From Customer ID:</strong> {invoice.from_customer_id}</p>
            <p><strong>To Customer ID:</strong> {invoice.to_customer_id}</p>
            <p><strong>Date Issued:</strong> {invoice.date_issued}</p>
            <p><strong>Due Date:</strong> {invoice.due_date}</p>
            <p><strong>Total Amount:</strong> ${invoice.total_amount.toFixed(2)}</p>
            <p><strong>Tax Amount:</strong> ${invoice.tax_amount.toFixed(2)}</p>
            <p><strong>Subtotal:</strong> ${invoice.subtotal.toFixed(2)}</p>
            <p><strong>Status:</strong> {invoice.status}</p>
            <Button onClick={handleEditClick} className="mt-2">Edit</Button>
            <Button onClick={handleDeleteClick} className="mt-2" variant="destructive">Delete</Button>
          </div>
        )}
      </CardContent>
      <InvoiceItemCard invoiceId={invoice.invoice_id!} />
      <PaymentCard invoiceId={invoice.invoice_id!} />
    </Card>
  );
};

export default InvoiceCard;
