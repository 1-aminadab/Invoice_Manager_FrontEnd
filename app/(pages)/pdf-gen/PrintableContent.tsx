
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
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <p className="text-gray-600">{data.description}</p>
        <div className="mt-4">
          <div className="flex justify-between">
            <div>
              <strong>Invoice #: </strong>{data.invoiceNumber}
            </div>
            <div>
              <strong>Date: </strong>{data.date}
            </div>
            <div>
              <strong>Due Date: </strong>{data.dueDate}
            </div>
          </div>
        </div>
      </header>
      <section className="mb-8">
        <div className="flex justify-between">
          <div className="w-1/2">
            <h2 className="text-xl font-bold mb-2">Bill From</h2>
            <p>{data.billFrom.name}</p>
            <p>{data.billFrom.address}</p>
            <p>{data.billFrom.email}</p>
          </div>
          <div className="w-1/2 text-right">
            <h2 className="text-xl font-bold mb-2">Bill To</h2>
            <p>{data.billTo.name}</p>
            <p>{data.billTo.address}</p>
            <p>{data.billTo.email}</p>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{item.description}</td>
                <td className="py-2 px-4 border-b text-center">{item.quantity}</td>
                <td className="py-2 px-4 border-b text-right">${item.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b text-right">${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <footer className="text-right">
        <div className="text-lg font-bold">
          <strong>Total: </strong>${calculateTotal(data.items)}
        </div>
      </footer>
    </div>
  );
};

export default PrintableContent;
