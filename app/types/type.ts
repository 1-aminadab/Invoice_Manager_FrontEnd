export interface User {
    user_id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    hashedRt?: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
    country?: string;
}
  
export interface Product {
    product_id?: number;
    product_added_by?: number;
    product_name: string;
    description?: string;
    price: number;
    tax_id?: number;
    discount_id?: number;
  }
  
export interface Tax {
    tax_id?: number;
    tax_added_by: number;
    tax_name: string;
    tax_rate: number;
  }
  
export interface Discount {
    discount_id?: number;
    discount_added_by: number;
    discount_type: string;
    discount_value: number;
  }
  
export interface Invoice {
    invoice_id?: number;
    invoice_number: string;
    from_customer_id: number;
    to_customer_id: number;
    date_issued?: Date | string | undefined;
    due_date?: Date | string | undefined;
    status: string;
    total_amount: number;
    tax_amount: number;
    subtotal: number; 

  }
  
export interface InvoiceItem {
    invoice_item_id?: number;
    invoice_id?: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
  }
  
export interface Payment {
    payment_id?: number;
    invoice_id?: number;
    payment_date: Date;
    payment_amount: number;
    payment_method: string;
    payment_status: string;
  
  }
  