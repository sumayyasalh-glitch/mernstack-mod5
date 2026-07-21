import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items).length;

  return (
    <nav className="navbar navbar-dark bg-dark px-3 py-3">
      <Link className="navbar-brand fw-bold" to="/">ShopVerse</Link>
      <div className="d-flex flex-wrap align-items-center gap-2 ms-auto">
        <ul className="navbar-nav me-auto">
          <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/cart">Cart ({cartItems})</NavLink></li>
          {isAuthenticated && <li className="nav-item"><NavLink className="nav-link" to="/orders">Orders</NavLink></li>}
        </ul>
        <div className="d-flex gap-2 align-items-center">
          {isAuthenticated ? (
            <>
              <span className="text-light">Hi, {user?.name}</span>
              <button className="btn btn-outline-light btn-sm" onClick={() => dispatch(logout())}>Logout</button>
            </>
          ) : (
            <Link className="btn btn-outline-light btn-sm" to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
