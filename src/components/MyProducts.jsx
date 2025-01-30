import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/MyProducts.css';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/myproducts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, [navigate]);

  if (loading) {
    return <div className="loading">Loading your products...</div>;
  }

  return (
    <div className="my-products-container">
      <h2>My Products</h2>
      {products.length === 0 ? (
        <div className="no-products">
          <p>You haven't listed any products yet.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              {product.mainImage && (
                <img
                  src={`data:${product.mainImage.contentType};base64,${Buffer.from(product.mainImage.imageData).toString('base64')}`}
                  alt={product.itemName}
                  className="product-image"
                />
              )}
              <div className="product-details">
                <h3>{product.itemName}</h3>
                <p className="description">{product.description}</p>
                <div className="bid-info">
                  <p>Starting Bid: ${product.startingBid}</p>
                  <p>Category: {product.sportsCategory}</p>
                </div>
                <div className="delivery-info">
                  <p>Delivery: {product.deliveryMethod}</p>
                  <p>Ends: {new Date(product.endTime).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
