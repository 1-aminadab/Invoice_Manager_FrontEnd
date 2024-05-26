// discountSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Discount {
  discount_id?: number;
  discount_added_by: number;
  discount_type: string;
  discount_value: number;
}

interface DiscountState {
  discounts: Discount[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DiscountState = {
  discounts: [],
  isLoading: false,
  error: null,
};

export const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {
    fetchDiscountsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchDiscountsSuccess(state, action: PayloadAction<Discount[]>) {
      state.isLoading = false;
      state.discounts = action.payload;
    },
    fetchDiscountsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addDiscount(state, action: PayloadAction<Discount>) {
      state.discounts.push(action.payload);
    },
    updateDiscount(state, action: PayloadAction<Discount>) {
      const index = state.discounts.findIndex(discount => discount.discount_id === action.payload.discount_id);
      if (index !== -1) {
        state.discounts[index] = action.payload;
      }
    },
    deleteDiscount(state, action: PayloadAction<number>) {
      state.discounts = state.discounts.filter(discount => discount.discount_id !== action.payload);
    },
  },
});

export const {
  fetchDiscountsStart,
  fetchDiscountsSuccess,
  fetchDiscountsFailure,
  addDiscount,
  updateDiscount,
  deleteDiscount,
} = discountSlice.actions;

export default discountSlice.reducer;
