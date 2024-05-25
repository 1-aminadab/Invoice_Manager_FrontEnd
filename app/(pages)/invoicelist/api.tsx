// api.ts

export interface Invoice {
    invoice_id: number;
    invoice_number: string;
    from_customer_id: number;
    to_customer_id: number;
    date_issued: string;
    due_date: string;
    status: string;
    total_amount: number;
    tax_amount: number;
    subtotal: number;
    invoiceItems: InvoiceItem[];
    payments: Payment[];
  }
  
  export interface InvoiceItem {
    invoice_item_id: number;
    invoice_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
  }
  
  export interface Payment {
    payment_id: number;
    invoice_id: number;
    payment_date: string;
    payment_amount: number;
    payment_method: string;
    payment_status: string;
  }
  
  const API_BASE_URL = 'http://localhost:5000';
  
  export async function fetchInvoices(): Promise<Invoice[]> {
    const response = await fetch(`${API_BASE_URL}/invoices`);
    return response.json();
  }
  
  export async function fetchInvoiceById(id: number): Promise<Invoice> {
    const response = await fetch(`${API_BASE_URL}/invoices/${id}`);
    return response.json();
  }
  
  export async function deleteInvoice(id: number): Promise<void> {
    await fetch(`${API_BASE_URL}/invoices/${id}`, {
      method: 'DELETE',
    });
  }
  
  export async function updateInvoice(id: number, invoice: Partial<Invoice>): Promise<Invoice> {
    const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoice),
    });
    return response.json();
  }
  
  // Add similar functions for InvoiceItem and Payment
  