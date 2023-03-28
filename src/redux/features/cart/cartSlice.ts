import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { GoodsType } from '../../../API/API';

type CartState = {
  goods: Array<GoodsType>;
  summary: number;
};

const initialState: CartState = {
  goods: [],
  summary: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<GoodsType>) => {
      state.goods = [action.payload, ...state.goods];
      state.summary += action.payload.price;
    },
    deleteItem: (state, action: PayloadAction<GoodsType>) => {
      state.goods = state.goods.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.summary -= action.payload.price;
    },

    clearCart: (state) => {
      state.goods = [];
      state.summary = 0;
    },
  },
});

export const { deleteItem, addItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartContent = (state: RootState) => state.cart.goods;
export const selectSummary = (state: RootState) => state.cart.summary;
