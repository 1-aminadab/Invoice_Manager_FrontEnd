'use client'
import * as XLSX from 'xlsx';

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
  billFrom: [{
    name: string;
    address: string;
    email: string;
  }];
  billTo: [{
    name: string;
    address: string;
    email: string;
  }];
  items: InvoiceItem[];
}

const ExcelGenerator = ({ data, fileName }: { data:InvoiceData; fileName: string }) => {
  const worksheet = XLSX.utils.json_to_sheet([...data.items,...data.billFrom, ...data.billTo]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

  const handleDownload = () => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <button onClick={handleDownload}>Download Excel</button>
  );
};

export default ExcelGenerator;