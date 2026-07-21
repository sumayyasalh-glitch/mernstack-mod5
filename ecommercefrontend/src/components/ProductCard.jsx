import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { formatINR } from '../utils/currency';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="card h-100 shadow-sm">
      <img src={product.image} alt={product.name} className="card-img-top" style={{ height: '180px', objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">{product.category}</p>
        <p className="card-text">{product.description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong>{formatINR(product.price)}</strong>
          <div className="d-flex gap-2">
            <Link className="btn btn-outline-primary btn-sm" to={`/product/${product._id}`}>View</Link>
            <button className="btn btn-dark btn-sm" onClick={() => dispatch(addToCart(product))}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
