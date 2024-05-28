// invoiceSlice.ts
import { Invoice, InvoiceItem, Payment, User } from '@/app/types/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface InvoiceState {
  invoices: Invoice[];
  invoiceItems: InvoiceItem[];
  payments: Payment[];
  selectedInvoice:Invoice | null;
  newInvoice:Invoice| null ;
  newInvoiceItems: InvoiceItem[];
  newPayment:Payment | null;
  newSelectedInvoices:InvoiceItem[],
  invoiceCustomer:User | null,
  isLoading: boolean;
  error: string | null;
  currentScreen:string;
}

const initialState: InvoiceState = {
  invoices: [],
  invoiceItems: [],
  payments: [],
  selectedInvoice:null,
  newInvoice:null,
  newInvoiceItems:[],
  newPayment:null,
  newSelectedInvoices:[],
  invoiceCustomer:null,
  isLoading: false,
  error: null,
  currentScreen:"list"
};

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    fetchInvoicesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchInvoicesSuccess(state, action: PayloadAction<Invoice[]>) {
      state.isLoading = false;
      state.invoices = action.payload;
    },
    fetchInvoicesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addInvoice(state, action: PayloadAction<Invoice>) {
      state.invoices.push(action.payload);
    },
    updateInvoice(state, action: PayloadAction<Invoice>) {
      const index = state.invoices.findIndex(invoice => invoice.invoice_id === action.payload.invoice_id);
      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
    },
    deleteInvoice(state, action: PayloadAction<number>) {
      state.invoices = state.invoices.filter(invoice => invoice.invoice_id !== action.payload);
    },
    // Similarly, add actions and reducers for InvoiceItem and Payment
    fetchInvoiceItemsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchInvoiceItemsSuccess(state, action: PayloadAction<InvoiceItem[]>) {
      state.isLoading = false;
      state.invoiceItems = action.payload;
    },
    fetchInvoiceItemsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addInvoiceItem(state, action: PayloadAction<InvoiceItem>) {
      state.invoiceItems.push(action.payload);
    },
    updateInvoiceItem(state, action: PayloadAction<InvoiceItem>) {
      const index = state.invoiceItems.findIndex(item => item.invoice_item_id === action.payload.invoice_item_id);
      if (index !== -1) {
        state.invoiceItems[index] = action.payload;
      }
    },
    deleteInvoiceItem(state, action: PayloadAction<number>) {
      state.invoiceItems = state.invoiceItems.filter(item => item.invoice_item_id !== action.payload);
    },
    fetchPaymentsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchPaymentsSuccess(state, action: PayloadAction<Payment[]>) {
      state.isLoading = false;
      state.payments = action.payload;
    },
    fetchPaymentsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addPayment(state, action: PayloadAction<Payment>) {
      state.payments.push(action.payload);
    },
    updatePayment(state, action: PayloadAction<Payment>) {
      const index = state.payments.findIndex(payment => payment.payment_id === action.payload.payment_id);
      if (index !== -1) {
        state.payments[index] = action.payload;
      }
    },

    deletePayment(state, action: PayloadAction<number>) {
      state.payments = state.payments.filter(payment => payment.payment_id !== action.payload);
    },
    
    // new invocie
    addNewInvoice(state, action: PayloadAction<Invoice>) {
        state.newInvoice = action.payload
    },
    addNewInvoiceItems(state, action: PayloadAction<InvoiceItem[]>) {
        state.newInvoiceItems = action.payload
    },
    addNewPayment(state, action: PayloadAction<Payment>) {
        state.newPayment = action.payload
    },
    addNewCustomer(state, action: PayloadAction<User>) {
        state.invoiceCustomer = action.payload
    },
    changeCurrentScreen(state, action: PayloadAction<string>){
      state.currentScreen = action.payload
    }
  },
});

export const {
  fetchInvoicesStart,
  fetchInvoicesSuccess,
  fetchInvoicesFailure,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  fetchInvoiceItemsStart,
  fetchInvoiceItemsSuccess,
  fetchInvoiceItemsFailure,
  addInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
  fetchPaymentsStart,
  fetchPaymentsSuccess,
  fetchPaymentsFailure,
  addPayment,
  updatePayment,
  deletePayment,
//   newInvoice 
 addNewInvoice,
 addNewInvoiceItems,
 addNewPayment,
 addNewCustomer,
 changeCurrentScreen
} = invoiceSlice.actions;

export default invoiceSlice.reducer;