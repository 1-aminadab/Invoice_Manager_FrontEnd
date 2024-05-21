'use client'
import React from 'react';
import ExcelGenerator from './ExcelGenerator';

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceData {
  title: string;
  description: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  billFrom:[ {
    name: string;
    address: string;
    email: string;
  }]
  billTo: [{
    name: string;
    address: string;
    email: string;
  }];
  items: InvoiceItem[];
}

// Sample invoice data
const invoiceData: InvoiceData = {
  title: 'Invoice for Your Order',
  description: 'This invoice details the items you purchased.',
  invoiceNumber: 'INV-2024-05-21',
  date: new Date().toLocaleDateString(),
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), // Due in 7 days
  billFrom: [{
    name: 'Your Company Name',
    address: '123 Main Street, Anytown, CA 12345',
    email: 'sales@yourcompany.com',
  }],
  billTo:[ {
    name: 'Customer Name',
    address: '456 Elm Street, Othertown, NY 54321',
    email: 'customer@example.com',
  }],
  items: [
    { description: 'Product 1', quantity: 2, price: 19.99 },
    { description: 'Product 2', quantity: 1, price: 49.50 },
    { description: 'Service Fee', quantity: 1, price: 5.00 },
  ],
};

const MyPage = () => {
  return (
    <div>
      <h2>{invoiceData.title}</h2>
      <p>{invoiceData.description}</p>
      <div>
        <h3>Invoice Details</h3>
        <ul>
          <li>Invoice Number: {invoiceData.invoiceNumber}</li>
          <li>Date: {invoiceData.date}</li>
          <li>Due Date: {invoiceData.dueDate}</li>
        </ul>
        <h3>Bill From</h3>
        <p>{invoiceData.billFrom[0].name}</p>
        <p>{invoiceData.billFrom[0].address}</p>
        <p>{invoiceData.billFrom[0].email}</p>
        <h3>Bill To</h3>
        <p>{invoiceData.billTo[0].name}</p>
        <p>{invoiceData.billTo[0].address}</p>
        <p>{invoiceData.billTo[0].email}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item) => (
            <tr key={item.description}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
          {/* Add a row for total (optional) */}
        </tbody>
      </table>
      <ExcelGenerator data={invoiceData} fileName="invoice.xlsx" />
    </div>
  );
};

export default MyPage;