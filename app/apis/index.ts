import axios from "axios";

axios.defaults.baseURL ='http://localhost:5000' 

export const loginAPI = async (credentials: { username: string; password: string }) => 
    await axios.post('/local/signin', credentials);
  
  export const registerAPI = async (data: { username: string; password: string; email: string }) => 
    await axios.post('/auth/register', data);
  
  export const logoutAPI = async () => 
    await axios.post('/auth/logout');
  
  export const getUserProfileAPI = async () => 
    await axios.get('/auth/profile');
  
  export const updateUserProfileAPI = async (data: { username?: string; email?: string; password?: string }) => 
    await axios.put('/auth/profile', data);

  // Tax
  export const getTaxesAPI = async () => 
    await axios.get('/taxes');
  
  export const getTaxAPI = async (id: number) => 
    await axios.get(`/tax/${id}`);
  
  export const createTaxAPI = async (data: { name: string; rate: number }) => 
    await axios.post('/tax', data);
  
  export const updateTaxAPI = async (id: number, data: { name?: string; rate?: number }) => 
    await axios.put(`/tax/${id}`, data);
  
  export const deleteTaxAPI = async (id: number) => 
    await axios.delete(`/tax/${id}`);
 
  // Discount
  export const getDiscountsAPI = async () => 
    await axios.get('/discounts');
  
  export const getDiscountAPI = async (id: number) => 
    await axios.get(`/discount/${id}`);
  
  export const createDiscountAPI = async (data: { name: string; type: string; value: number }) => 
    await axios.post('/discount', data);
  
  export const updateDiscountAPI = async (id: number, data: { name?: string; type?: string; value?: number }) => 
    await axios.put(`/discount/${id}`, data);
  
  export const deleteDiscountAPI = async (id: number) => 
    await axios.delete(`/discount/${id}`);

  // Product
  export const getProductsAPI = async () => 
    await axios.get('/products');
  
  export const getProductAPI = async (id: number) => 
    await axios.get(`/product/${id}`);
  
  export const createProductAPI = async (data: { product_added_by: number; product_name: string; description?: string; price: number; tax_id?: number; discount_id?: number }) => 
    await axios.post('/product', data);
  
  export const updateProductAPI = async (id: number, data: { product_name?: string; description?: string; price?: number; tax_id?: number; discount_id?: number }) => 
    await axios.put(`/product/${id}`, data);
  
  export const deleteProductAPI = async (id: number) => 
    await axios.delete(`/product/${id}`);
  
  // Invoice
  export const getInvoicesAPI = async () => 
    await axios.get('/invoice');
  
  export const getInvoiceAPI = async (id: number) => 
    await axios.get(`/invoice/${id}`);
  
  export const createInvoiceAPI = async (data: { invoice_number: string; from_customer_id: number; to_customer_id: number; date_issued: Date | string; due_date: Date | string; status: string; total_amount: number; tax_amount: number; subtotal: number }) => 
    await axios.post('/invoice', data);
  
  export const updateInvoiceAPI = async (id: number, data: { invoice_number?: string; from_customer_id?: number; to_customer_id?: number; date_issued?: Date | string; due_date?: Date | string; status?: string; total_amount?: number; tax_amount?: number; subtotal?: number }) => 
    await axios.put(`/invoice/${id}`, data);
  
  export const deleteInvoiceAPI = async (id: number) => 
    await axios.delete(`/invoice/${id}`);

  // Invoice Items
  export const getInvoiceItemsAPI = async (invoiceId: number) => 
    await axios.get(`/invoice/${invoiceId}/items`);
  
  export const getInvoiceItemAPI = async (invoiceId: number, itemId: number) => 
    await axios.get(`/invoice/${invoiceId}/items/${itemId}`);
  
  export const createInvoiceItemAPI = async (invoiceId: number, data: { product_id: number; quantity: number; unit_price: number; total_price: number }) => 
    await axios.post(`/invoice/${invoiceId}/items`, data);
  
  export const updateInvoiceItemAPI = async (invoiceId: number, itemId: number, data: { product_id?: number; quantity?: number; unit_price?: number; total_price?: number }) => 
    await axios.put(`/invoice/${invoiceId}/items/${itemId}`, data);
  
  export const deleteInvoiceItemAPI = async (invoiceId: number, itemId: number) => 
    await axios.delete(`/invoice/${invoiceId}/items/${itemId}`);

  // Payment
  export const getPaymentsAPI = async () => 
    await axios.get('/payment');
  
  export const getPaymentAPI = async (id: number) => 
    await axios.get(`/payment/${id}`);
  
  export const createPaymentAPI = async (data: { invoice_id: number; payment_date: Date; payment_amount: number; payment_method: string; payment_status: string }) => 
    await axios.post('/payment', data);
  
  export const updatePaymentAPI = async (id: number, data: { invoice_id?: number; payment_date?: Date; payment_amount?: number; payment_method?: string; payment_status?: string }) => 
    await axios.put(`/payment/${id}`, data);
  
  export const deletePaymentAPI = async (id: number) => 
    await axios.delete(`/payment/${id}`);
