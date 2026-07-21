import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); setError('');
        const res = await api.get('/products', { params: { search, category, sort } });
        setProducts(res.data);
      } catch (error) {
        setError('Products could not be loaded. Check that the API is running.');
      } finally { setLoading(false);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const res = await api.get('/analytics');
        setRecommendations(res.data.products || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
    if (!search && !category) fetchRecommendations();
  }, [search, category, sort]);

  return (
    <div className="container py-4">
      <div className="row g-4 align-items-center mb-4">
        <div className="col-lg-8">
          <h1 className="display-5 fw-bold">Discover amazing products</h1>
          <p className="text-muted">Browse, search, and shop with a smooth full-stack experience.</p>
        </div>
        <div className="col-lg-4">
          <div className="card p-3">
            <h5>Quick filters</h5>
            <input className="form-control mb-2" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} />
            <select className="form-select mb-2" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
            </select>
            <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {!search && !category && <section className="mb-4">
        <h3 className="mb-3">Recommended for you</h3>
        <div className="row g-3">
          {recommendations.map((product) => (
            <div className="col-md-3" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>}

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <p className="text-secondary">Loading products…</p>}
      {!loading && !error && !products.length && <p className="text-secondary">No products match those filters.</p>}
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-md-4" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
