// taxSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Tax {
  tax_id?: number;
  tax_added_by: number;
  tax_name: string;
  tax_rate: number;
}

interface TaxState {
  taxes: Tax[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TaxState = {
  taxes: [],
  isLoading: false,
  error: null,
};

export const taxSlice = createSlice({
  name: 'tax',
  initialState,
  reducers: {
    fetchTaxesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchTaxesSuccess(state, action: PayloadAction<Tax[]>) {
      state.isLoading = false;
      state.taxes = action.payload;
    },
    fetchTaxesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addTax(state, action: PayloadAction<Tax>) {
      state.taxes.push(action.payload);
    },
    updateTax(state, action: PayloadAction<Tax>) {
      const index = state.taxes.findIndex(tax => tax.tax_id === action.payload.tax_id);
      if (index !== -1) {
        state.taxes[index] = action.payload;
      }
    },
    deleteTax(state, action: PayloadAction<number>) {
      state.taxes = state.taxes.filter(tax => tax.tax_id !== action.payload);
    },
  },
});

export const {
  fetchTaxesStart,
  fetchTaxesSuccess,
  fetchTaxesFailure,
  addTax,
  updateTax,
  deleteTax,
} = taxSlice.actions;

export default taxSlice.reducer;
