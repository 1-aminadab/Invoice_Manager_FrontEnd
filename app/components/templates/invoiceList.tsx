import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Invoice } from '@/app/types/type';

// Sample invoice data, replace this with actual data fetching logic
const invoices:Invoice[] = [
  {
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
  },
  {
    invoice_id: 2,
    invoice_number: 'INV002',
    from_customer_id: 456,
    to_customer_id: 789,
    date_issued: '2023-05-15',
    due_date: '2023-06-15',
    status: 'Pending',
    total_amount: 350.00,
    tax_amount: 30.00,
    subtotal: 320.00,
  },
  {
    invoice_id: 3,
    invoice_number: 'INV003',
    from_customer_id: 789,
    to_customer_id: 123,
    date_issued: '2023-06-01',
    due_date: '2023-07-01',
    status: 'Paid',
    total_amount: 450.00,
    tax_amount: 40.00,
    subtotal: 410.00,
  },
  {
    invoice_id: 4,
    invoice_number: 'INV004',
    from_customer_id: 123,
    to_customer_id: 456,
    date_issued: '2023-06-15',
    due_date: '2023-07-15',
    status: 'Pending',
    total_amount: 550.00,
    tax_amount: 50.00,
    subtotal: 500.00,
  },
  {
    invoice_id: 5,
    invoice_number: 'INV005',
    from_customer_id: 456,
    to_customer_id: 789,
    date_issued: '2023-07-01',
    due_date: '2023-08-01',
    status: 'Fulfilled',
    total_amount: 650.00,
    tax_amount: 60.00,
    subtotal: 590.00,
  },
  // Add more invoices as needed
];


function CustomList() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleRowClick = (invoice:Invoice) => {
    setSelectedInvoice(invoice);
  };

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Invoices</CardTitle>
        <CardDescription>Recent invoices from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice Number</TableHead>
              <TableHead>Customer ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Issued</TableHead>
              <TableHead className="text-right">Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.invoice_id}
                onClick={() => handleRowClick(invoice)}
                className={`cursor-pointer ${selectedInvoice?.invoice_id === invoice.invoice_id ? 'bg-gray-400 border rounded-md  shadow-md' : ''}`}
              >
                <TableCell>{invoice.invoice_number}</TableCell>
                <TableCell>{invoice.to_customer_id}</TableCell>
                <TableCell>
                  <Badge className="text-xs" variant={invoice.status === 'Fulfilled' ? 'secondary' : 'outline'}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>{invoice?.date_issued}</TableCell>
                <TableCell className="text-right">${invoice.total_amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default CustomList;
