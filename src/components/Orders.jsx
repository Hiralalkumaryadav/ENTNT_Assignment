import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrderStatus, deleteOrder } from '../assets/actions.js'; // Import order actions

const Orders = () => {
  const orders = useSelector(state => state.orders);
  const dispatch = useDispatch();

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('Pending');

  const handleOrderStatusChange = (e) => {
    setSelectedOrderStatus(e.target.value);
  };

  const handleUpdateOrderStatus = (orderId) => {
    dispatch(updateOrderStatus(orderId, selectedOrderStatus));
    setSelectedOrderStatus('Pending'); // Reset selected status
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
    setSelectedOrderId(null);
  };

 

  const renderOrderDetails = (order) => (
    <div key={order.id}>
      <h2>Order Details (ID: {order.id})</h2>
      <p>Customer Name: {order.customerName}</p>
      <p>Order Date: {order.orderDate.toLocaleDateString()}</p>
      <p>Status: {order.status}</p>
      {selectedOrderId === order.id && (
        <div>
            <select value={selectedOrderStatus} onChange={handleOrderStatusChange}>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button onClick={() => handleUpdateOrderStatus(order.id)}>Update Status</button>
        </div>
      )}
      <button onClick={() => handleDeleteOrder(selectedOrderId)}>Delete Order</button>
    </div>
  );

  return (
    <div className="main-content" style={{backgroundColor:'background-color:rgb(185, 39, 110)'}}>
      <h2>Orders Management</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.orderDate.toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => setSelectedOrderId(order.id)} style={{backgroundColor:'red', padding:'5px', margin:'0px 15px',cursor:'pointer'}}>Details</button>
                <button onClick={() => handleDeleteOrder(order.id)} style={{backgroundColor:'blue',padding:'5px', margin:'0px 15px', cursor:'pointer'}}>Delete Order</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOrderId && renderOrderDetails(orders.find(order => order.id === selectedOrderId))}
    </div>
  );
};

export default Orders;