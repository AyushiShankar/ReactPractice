import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const productList = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products");

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      return data.products || [];

    } catch (err) {
      setError(err.message);
      return [];
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await productList();
      setProducts(data);
    };

    fetchData();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="products">
      <h2>Product List</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.images} alt="product_image" className="product-image" />
            <span className="product-info">{product.title}</span>
            <p>{product.description.slice(0, 100)}...</p>
            <Link to={`/products/${product.id}`} className="view-more"
              id={`product-${product.id}`}>View More</Link>
          </div>
        ))}
      </div>


    </div>
  );
};

export default Products;