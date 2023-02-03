import React, { useState, useEffect } from "react";
import { getOrderHistory } from "../api";

// TODO - Style the order history page better. Add a link to the account page to go to the order history page.

const OrderHistory = ({ token }) => {
  const [orders, setOrders] = useState([]);
  console.log("ORDERS ", orders);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderHistory = await getOrderHistory(token);
      setOrders(orderHistory);
    };
    fetchOrders();
  }, [token]);

  return (
    <div class='ui center aligned fluid container'>
      <h2 class='ui inverted horizontal divider header'>Order History</h2>
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
                                <div class='detail'>{product.quantity}</div>
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
                    <table class='ui definition table'>
                      <tbody>
                        <tr>
                          <td class='two wide column'>Address</td>
                          <td>{order.shippingAddress}</td>
                        </tr>
                        <tr>
                          <td class='two wide column'>City</td>
                          <td>{order.city}</td>
                        </tr>
                        <tr>
                          <td class='two wide column'>State</td>
                          <td>{order.state}</td>
                        </tr>
                        <tr>
                          <td class='two wide column'>Zip</td>
                          <td>{order.zip}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='ui bottom meta attached'>
                <span className='content'>Order Date: {order.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;
