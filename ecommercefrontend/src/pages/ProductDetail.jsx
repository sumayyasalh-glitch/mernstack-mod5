import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../api/axiosInstance';
import { addToCart } from '../redux/slices/cartSlice';
import { formatINR } from '../utils/currency';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try { const res = await api.get(`/products/${id}`); setProduct(res.data); }
      catch (err) { setError(err.response?.data?.message || 'Could not load this product.'); }
    };
    fetchProduct();
  }, [id]);

  if (error) return <div className="container py-5"><div className="alert alert-danger">{error}</div></div>;
  if (!product) return <div className="container py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.category}</p>
          <p>{product.description}</p>
          <h3 className="text-primary">{formatINR(product.price)}</h3>
          <button className="btn btn-dark mt-3" onClick={() => dispatch(addToCart(product))}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
