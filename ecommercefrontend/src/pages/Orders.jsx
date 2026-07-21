import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import { formatINR } from '../utils/currency';
export default function Orders() {
  const [orders, setOrders] = useState([]); const [error, setError] = useState('');
  useEffect(() => { api.get('/orders/mine').then(({data}) => setOrders(data)).catch((err) => setError(err.response?.data?.message || 'Could not load orders.')); }, []);
  return <div className="container py-5"><h1 className="h2">My orders</h1>{error && <div className="alert alert-danger">{error}</div>}{!error && !orders.length && <p className="text-secondary">You have not placed an order yet.</p>}{orders.map((order) => <article className="card mb-3" key={order._id}><div className="card-body"><div className="d-flex justify-content-between"><div><strong>Order #{order._id.slice(-6)}</strong><div className="text-secondary small">{new Date(order.createdAt).toLocaleDateString()}</div></div><span className="badge text-bg-dark align-self-start">{order.status}</span></div>{order.items.map((item, index) => <div className="d-flex justify-content-between border-top mt-3 pt-2" key={index}><span>{item.name} × {item.quantity}</span><span>{formatINR(item.price * item.quantity)}</span></div>)}<div className="text-end fw-bold mt-3">Total {formatINR(order.totalAmount)}</div></div></article>)}</div>;
}
