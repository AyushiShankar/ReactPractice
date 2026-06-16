import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {

  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({});


  useEffect(() => {
    const productList = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${productId}`);

        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setProduct(data);

      } catch (err) {
        setError(err.message);
      }
      finally {
        setLoading(false);
      }

    }
    productList();

  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-details">
      {product && (
        <div className="product-info">
          <h3>{product.title}</h3>
          <img src={product.images} alt={product.title} className="product-image" />
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <Link to="/products" className="back-to-products">Back to Products</Link>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
