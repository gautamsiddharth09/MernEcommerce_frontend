import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL


//Add items to cart
export const addItemsToCart=createAsyncThunk('cart/addItemsToCart',async ({id,quantity},{rejectWithValue})=>{
    try{
    const {data}=await axios.get(`${API_URL}/api/v1/product/${id}`);
    
    return {
        product:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.image[0].url,
        stock:data.product.stock,
        quantity
    }
    
    }catch(error){
        return rejectWithValue(error.response?.data || 'An Error Occurred')
    }
})
const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartItems:JSON.parse(localStorage.getItem('cartItems')) || [],
        loading:false,
        error:null,
        success:false,
        message:null,
        removingId:null,
        shippingInfo:JSON.parse(localStorage.getItem('shippingInfo'))||{}
    },
    reducers:{
     removeErrors:(state)=>{
        state.error=null
     },
     removeMessage:(state)=>{
        state.message=null
     },
     removeItemFromCart:(state,action)=>{
        state.removingId=action.payload;
        state.cartItems=state.cartItems.filter(item=>item.product!=action.payload);
        localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        state.removingId=null
     } ,
     saveShippingInfo:(state,action)=>{
        state.shippingInfo=action.payload
        localStorage.setItem('shippingInfo',JSON.stringify(state.shippingInfo))
     } ,
     clearCart:(state)=>{
        state.cartItems=[];
        localStorage.removeItem('cartItems')
        localStorage.removeItem('shippingInfo')

     }  
    },
    extraReducers:(builder)=>{
//Add items to cart
       // Add items to cart
builder
  .addCase(addItemsToCart.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(addItemsToCart.fulfilled, (state, action) => {
    const item = action.payload;
    const existingItem = state.cartItems.find(i => i.product === item.product);

    if (existingItem) {
      // Increment quantity instead of replacing
      existingItem.quantity += item.quantity;

      // Optional: don't exceed stock
      if (existingItem.quantity > existingItem.stock) {
        existingItem.quantity = existingItem.stock;
      }

      state.message = `Updated ${item.name} quantity in the cart`;
    } else {
      state.cartItems.push(item);
      state.message = `${item.name} is added to cart successfully`;
    }

    state.loading = false;
    state.error = null;
    state.success = true;

    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  })
  .addCase(addItemsToCart.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.message || 'An error occurred';
  });

    }
})
export const {removeErrors,removeMessage,removeItemFromCart,saveShippingInfo,clearCart}=cartSlice.actions;
export default cartSlice.reducer