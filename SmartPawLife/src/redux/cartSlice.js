import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  total: 0,
  final_total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartData(state, action) {
      const { carts, total, final_total } = action.payload;
      state.carts = carts;    
      state.total = total;
      state.final_total = final_total;
    },
    removeCartItemFromState(state, action) {
        // 直接從 Redux 狀態中移除該商品
        state.carts = state.carts.filter(item => item.id !== action.payload);
      },
      clearCartData(state){
        state.carts = [];
        state.total =  0;
        state.final_total =  0;
    }
    },
  });
export const { updateCartData, clearCartData,  removeCartItemFromState } = cartSlice.actions;
export default cartSlice.reducer;
