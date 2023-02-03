import React, { useState, useEffect } from "react";
import { getOrderHistory } from "../api";

const OrderHistory = ({ token }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const orderHistory = await getOrderHistory(token);
      setOrders(orderHistory);
    };
    fetchOrders();
  }, [token]);
  return (
    <div className='ui center aligned fluid container'>
      <h2 className='ui inverted horizontal divider header'>Order History</h2>
      <div className='ui centered raised cards'>
        {orders.map((order) => {
          return (
            <div key={order.id} className='card'>
              <h3 className='ui inverted yellow top attached header'>
                Order #{order.id}
              </h3>
              <div className='content'>
                <div className='description'>
                  <div className='extra content'>
                    <div className='description'>
                      <h4 className='ui horizontal divider header'>
                        Products Ordered
                      </h4>
                      <span className='ui list'>
                        {order.products.map((product) => {
                          return (
                            <li
                              className='ui large list'
                              key={product.product_id}>
                              <div className='ui teal label'>
                                {product.name}
                                <div className='detail'>{product.quantity}</div>
                              </div>
                            </li>
                          );
                        })}
                      </span>
                      <h4 className='ui horizontal divider header'>
                        Order Total
                      </h4>
                    </div>
                  </div>
                  <div className='ui inverted green segment'>
                    <div className='ui fluid green label'>
                      ${order.orderTotal}
                    </div>
                  </div>
                </div>
                <div className='description'>
                  <div className='ui padded vertical segment'>
                    <h4 className='ui horizontal divider header'>Shipped To</h4>
                    <table className='ui definition table'>
                      <tbody>
                        <tr>
                          <td className='two wide column'>Address</td>
                          <td>{order.shippingAddress}</td>
                        </tr>
                        <tr>
                          <td className='two wide column'>City</td>
                          <td>{order.city}</td>
                        </tr>
                        <tr>
                          <td className='two wide column'>State</td>
                          <td>{order.state}</td>
                        </tr>
                        <tr>
                          <td className='two wide column'>Zip</td>
                          <td>{order.zip}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='ui bottom meta attached'>
                <span className='content'>Order Date: {new Date(order.date).toLocaleDateString('en-US', { year: "numeric", month: "long", weekday: "long", day: "numeric"})}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;
