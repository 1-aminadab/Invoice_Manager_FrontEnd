import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './features/userSlice';
import InvoiceSlice, { invoiceSlice } from './features/InvoiceSlice';
import {taxSlice} from './features/taxSlice';
import { productSlice } from './features/productSlice';
import { discountSlice } from './features/discountSlice';

// Create the Redux store with typed reducers
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
      invoice: invoiceSlice.reducer,
      product: productSlice.reducer,
      tax: taxSlice.reducer,
      discount:discountSlice.reducer
    },
  });
};


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']> 
export type AppDispatch = AppStore['dispatch'];
export const store = makeStore()