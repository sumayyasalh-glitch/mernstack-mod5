import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Orders from './pages/Orders';

export default function App() {
  return <><Navbar /><main><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/login" element={<Login />} />
    <Route path="/contact" element={<Contact />} />
    <Route element={<ProtectedRoute />}><Route path="/orders" element={<Orders />} /></Route>
    <Route path="*" element={<div className="container py-5"><h1>Page not found</h1></div>} />
  </Routes></main><footer className="border-top py-4 text-center text-secondary">ShopVerse &copy; 2026 · MERN E-Commerce</footer></>;
}
