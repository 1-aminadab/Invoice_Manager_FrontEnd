'use client'
import React from 'react';
import Printable from './Printable';
import PrintableContent from './PrintableContent';

interface MyPageData {
  title: string;
  description: string;
}

const MyPage: React.FC = () => {
  const sampleData: MyPageData = { title: 'My Printable Content', description: 'This is the content to be printed.' };
const invoiceData = {
  title: "Invoice",
  description: "Invoice for services rendered",
  invoiceNumber: "INV-1001",
  date: "2024-05-21",
  dueDate: "2024-06-21",
  billFrom: {
    name: "John Doe Consulting",
    address: "123 Business Rd, Business City, BC 12345",
    email: "john.doe@consulting.com",
  },
  billTo: {
    name: "Jane Smith",
    address: "456 Client St, Client Town, CT 67890",
    email: "jane.smith@example.com",
  },
  items: [
    {
      description: "Consulting Services",
      quantity: 10,
      price: 150.0,
    },
    {
      description: "Development Work",
      quantity: 20,
      price: 100.0,
    },
    {
      description: "Project Management",
      quantity: 5,
      price: 200.0,
    },
  ],
};
  return (
    <div>
      <PrintableContent data={invoiceData} />
      <Printable content={<PrintableContent data={invoiceData} />} />
    </div>
  );
};

export default MyPage;