
  import InvoiceSheet from '@/app/components/templates/InvoiceSheet';
import React from 'react';

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
  billFrom: {
    name: string;
    address: string;
    email: string;
  };
  billTo: {
    name: string;
    address: string;
    email: string;
  };
  items: InvoiceItem[];
}

interface PrintableContentProps {
  data: InvoiceData;
}

const PrintableContent: React.FC<PrintableContentProps> = ({ data }) => {
  const calculateTotal = (items: InvoiceItem[]) => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto m-2 bg-white shadow-md">
      <InvoiceSheet/>
    </div>
  );
};

export default PrintableContent;
