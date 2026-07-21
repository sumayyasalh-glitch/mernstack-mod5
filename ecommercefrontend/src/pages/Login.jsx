import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../api/axiosInstance';
import { loginSuccess } from '../redux/slices/authSlice';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); const navigate = useNavigate(); const location = useLocation();
  const submit = async (event) => { event.preventDefault(); setError(''); setLoading(true);
    try { const { data } = await api.post(`/auth/${mode === 'login' ? 'login' : 'register'}`, form); dispatch(loginSuccess(data)); navigate(location.state?.from?.pathname || '/'); }
    catch (err) { setError(err.response?.data?.message || 'Unable to reach the server.'); } finally { setLoading(false); }
  };
  return <div className="container py-5"><div className="auth-card card shadow-sm mx-auto"><div className="card-body p-4"><h1 className="h3">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1><p className="text-secondary">Secure JWT authentication protects your orders.</p>
    <form onSubmit={submit} noValidate>{mode === 'register' && <label className="form-label w-100">Name<input required className="form-control mt-1" value={form.name} onChange={(e) => setForm({...form, name:e.target.value})} /></label>}
      <label className="form-label w-100">Email<input required type="email" className="form-control mt-1" value={form.email} onChange={(e) => setForm({...form, email:e.target.value})} /></label>
      <label className="form-label w-100">Password<input required minLength="6" type="password" className="form-control mt-1" value={form.password} onChange={(e) => setForm({...form, password:e.target.value})} /></label>
      {error && <div className="alert alert-danger py-2">{error}</div>}<button disabled={loading} className="btn btn-dark w-100">{loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Register'}</button></form>
    <button className="btn btn-link px-0 mt-3" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Need an account? Register' : 'Already registered? Login'}</button><br/><Link to="/">Continue shopping</Link></div></div></div>;
}
