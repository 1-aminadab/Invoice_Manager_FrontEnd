import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './features/userSlice';
import { invoiceSlice } from './features/InvoiceSlice';
import { taxSlice } from './features/taxSlice';
import { productSlice } from './features/productSlice';
import { discountSlice } from './features/discountSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  // Whitelist the reducers you want to persist
  whitelist: ['user', 'invoice', 'product', 'tax', 'discount'],
};

// Combine the reducers
const rootReducer = combineReducers({
  user: userSlice.reducer,
  invoice: invoiceSlice.reducer,
  product: productSlice.reducer,
  tax: taxSlice.reducer,
  discount: discountSlice.reducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
  });
};

// Infer the type of the store
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Create the store and persistor
export const store = makeStore();
export const persistor = persistStore(store);
