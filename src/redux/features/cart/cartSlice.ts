import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { GoodsType } from '../../../API/API';

interface CartItem extends GoodsType {
  count: number;
}

interface CartState {
  goods: CartItem[];
  summary: number;
}

const initialState: CartState = {
  goods: [],
  summary: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, count } = action.payload;
      const product = state.goods.filter((item) => item.id === id)[0];

      if (product) {
        state.goods = state.goods.map((item) => {
          return item.id === id ? { ...item, count: item.count + count } : item;
        });
      } else {
        state.goods.push(action.payload);
      }

      state.summary += action.payload.price * count;
      state.summary = +state.summary.toFixed(2);
    },

    deleteItemFromCart: (state, action: PayloadAction<CartItem>) => {
      const { id, count } = action.payload;
      const product = state.goods.filter((item) => item.id === id)[0];

      state.summary -= product.price * count;
      state.summary = +state.summary.toFixed(2);

      state.goods = state.goods.filter((item) => item.id !== action.payload.id);
    },

    increaseCount: (state, action: PayloadAction<CartItem>) => {
      const { id } = action.payload;
      const product = state.goods.filter((item) => item.id === id)[0];
      state.goods = state.goods.map((item) => {
        return item.id === action.payload.id ? { ...item, count: item.count + 1 } : item;
      });

      state.summary += product.price;
      state.summary = +state.summary.toFixed(2);
    },

    decreaseCount: (state, action: PayloadAction<CartItem>) => {
      const { id } = action.payload;
      const product = state.goods.filter((item) => item.id === id)[0];
      state.goods = state.goods.map((item) => {
        return item.id === action.payload.id
          ? { ...item, count: Math.max(item.count - 1, 1) }
          : item;
      });

      if (product.count > 1) {
        state.summary -= product.price;
        state.summary = +state.summary.toFixed(2);
      }
    },

    clearCart: (state) => {
      state.goods = [];
      state.summary = 0;
    },
  },
});

export const { deleteItemFromCart, addItemToCart, increaseCount, decreaseCount, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

export const selectCartContent = (state: RootState) => state.cart.goods;
export const selectSummary = (state: RootState) => state.cart.summary;
// export const selectCart = (state: RootState, id: number) => state.cart.summary;
