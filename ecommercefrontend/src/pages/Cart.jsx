import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart } from '../redux/slices/cartSlice';
import api from '../api/axiosInstance';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatINR } from '../utils/currency';

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [message, setMessage] = useState(''); const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = async () => {
    try {
      if (!isAuthenticated) return navigate('/login', { state: { from: { pathname: '/cart' } } });
      await api.post('/orders', { items, totalAmount: total });
      dispatch(clearCart());
      setMessage('Order placed successfully. You can view it in My Orders.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'We could not place your order.');
    }
  };

  return (
    <div className="container py-5">
      <h2>Your cart</h2>
      {message && <div className="alert alert-info">{message} <Link to="/orders">View orders</Link></div>}
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {items.map((item) => (
              <div className="card mb-3 p-3" key={item._id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.name}</h5>
                    <p className="mb-0">Qty: {item.quantity}</p>
                  </div>
                  <div>
                    <strong>{formatINR(item.price * item.quantity)}</strong>
                    <button className="btn btn-outline-danger btn-sm ms-3" onClick={() => dispatch(removeFromCart(item._id))}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-4">
            <div className="card p-3">
              <h4>Total: {formatINR(total)}</h4>
              <button className="btn btn-dark mt-3" onClick={checkout}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
