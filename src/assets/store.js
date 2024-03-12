import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { id: 1, name: 'Product 1', category: 'Electronics', price: 100, stock: 5 },
    { id: 2, name: 'Product 2', category: 'Clothing', price: 20, stock: 10 },
    { id: 3, name: 'Product 3', category: 'Cosmetics', price: 30, stock: 15 },
    { id: 4, name: 'Product 4', category: 'Electronics', price: 40, stock: 12 },
    { id: 5, name: 'Product 5', category: 'Cosmetics', price: 10, stock: 8 },
  ],
  orders: [  // Corrected order objects with proper structure
    { id: 1, customerName: 'Raj', orderDate: new Date(2024, 2, 8), status: 'Pending' },
    { id: 2, customerName: 'Rahul', orderDate: new Date(2024, 2, 7), status: 'Shipped' },
    { id: 3, customerName: 'Arya', orderDate: new Date(2024, 2, 6), status: 'Deliverd' },
    { id: 4, customerName: 'Urja', orderDate: new Date(2024, 2, 5), status: 'Completed' },
    { id: 5, customerName: 'Virat', orderDate: new Date(2024, 2, 4), status: 'Shipped' },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add product reducer logic
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    // Edit product reducer logic
    case 'EDIT_PRODUCT':
      const updatedProducts = state.products.map(product => product.id === action.payload.id ? action.payload : product);
      return {
        ...state,
        products: updatedProducts,
      };
    // Delete product reducer logic
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };
    // Update order status reducer logic
    case 'UPDATE_ORDER_STATUS':
      const updatedOrders = state.orders.map(order => order.id === action.payload.id ? { ...order, status: action.payload.status } : order);
      return {
        ...state,
        orders: updatedOrders,
      };
    // Delete order reducer logic
    case 'DELETE_ORDER':
      const remOrders = state.orders.filter(order => order.id != action.payload.id );
      return {
        ...state,
        orders: remOrders,
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: rootReducer,
});


export default store;

