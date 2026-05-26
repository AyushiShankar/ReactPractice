import React, { useState, useEffect } from "react";
import "./styles.css";

const ProductCart = ({ initialProducts }) => {
  const [cart, setCart] = useState(
    initialProducts.map((p) => ({ ...p, qty: 1 }))
  );
  const [couponNo, setCouponNo] = useState("");
  const [message, setMessage] = useState("");
  const [discount, setDiscount] = useState("");
  const [form, setForm] = useState({
    pdName: "",
    price: "",
    quantity: "",
    description: ""
  });

  const discountCalculation = () => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const discountedAmount = total * 0.5;
    const finalAmount = (total - discountedAmount).toFixed(2);

    setDiscount(finalAmount);
  };

  const updateQty = (id, delta) => {
    if (delta === "inc") {

      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item));
    }
    else {

      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item).filter((item) => item.qty > 0));
    }

  };

  const removeProduct = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id));

    if (couponNo === "GRAB50") {
      discountCalculation();
    }
  };

  useEffect(() => {
    if (cart.length === 0) {
      setCouponNo("");
      setDiscount("");
      setMessage("");
    }
  }, [cart])

  // TODO: Implement coupon functionality
  const applyCoupon = (coupon) => {
    if (coupon !== "GRAB50") {
      alert("Invalid coupon code. Use GRAB50 for 50% discount");
      setMessage("");
      setDiscount("");
      setCouponNo("");
      return;
    }

    discountCalculation();
    setMessage("GRAB50 coupon applied successfully!");
  };

  const handleCart = () => {
    setCart((prev) => [...prev, {
      id: Date.now(),
      name: form.pdName,
      price: form.price,
      description: form.description,
      qty: form.quantity || 1,

    }]);
    setForm({
      pdName: "",
      price: "",
      quantity: "",
      description: ""
    });
  };

  useEffect(() => {
    if (couponNo === "GRAB50") {
      discountCalculation();
    }
  }, [cart]);

  return (
    <div className="cart-container">
      <h2 data-testid="cart-heading" className="cart-heading">
        Shopping Cart
      </h2>
      <div className="add-product-section">
        <h2 className="add-product-title">Add New Product</h2>
        <div className="add-product-grid">
          <div>
            <label className="form-label">Product Name:</label>
            <input className="input-field"
              type="text"
              data-testid="new-product-name"
              name="pdName"
              value={form.pdName}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value
                }))
              } />
          </div>
          <div>
            <label className="form-label">Price (₹):</label>
            <input className="input-field" type="Number"
              data-testid="new-product-price"
              name="price"
              value={form.price}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [e.target.name]: Number(e.target.value)
                }))
              } />
          </div>
          <div> <label className="form-label">Quantity:</label>
            <input className="input-field"
              type="Number"
              data-testid="new-product-qty"
              name="quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [e.target.name]: Number(e.target.value)
                }))
              } /></div>
          <div><label className="form-label">Description:</label>
            <input className="input-field" type="text"
              name="description"
              data-testid="new-product-description"
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value
                }))
              } /></div>

          <button className="btn add-btn" onClick={handleCart}
            data-testid="add-product-button">Add Button</button></div>

      </div>

      <div data-testid="cart-product-list" >
        {cart.map((item) => (
          <div key={item.id} className="product-card">
            <div className="product-info">
              <h4 data-testid="product-name" className="product-name">
                {item.name}
              </h4>
              <p className="product-description">{item.description}</p>
              <p data-testid="product-price" className="product-price">
                Price: ₹{item.price}
              </p>

              <div className="qty-section">
                <span>Quantity: </span>
                <button className="btn dec-btn" onClick={() => updateQty(item.id, "dec")}
                  disabled={item.qty === 1}>-</button>
                <input
                  data-testid="product-qty"
                  type="number"
                  value={item.qty}
                  readOnly
                  className="qty-input"
                />
                {/* TODO: Add functionality to increase quantity */}
                <button className="btn inc-btn" onClick={() => updateQty(item.id, "inc")}>+</button>
              </div>

              <p
                data-testid="product-discounted-price-label"
                className="product-subtotal"
              >
                Subtotal: ₹{(item.price * item.qty).toFixed(2)}
              </p>
            </div>

            {/* TODO: Add functionality to remove product */}
            <button data-testid="remove-product-button" className="btn remove-btn"
              onClick={() => removeProduct(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="summary-section ">
        <div className="coupon-section">
          <label className="form-label">Coupon Code:</label>
          <div className="coupon-input-row">
            {/* TODO: Add state management for coupon input */}
            <input
              data-testid="coupon-code-input"
              type="text"
              placeholder="Enter GRAB50 for 50% off"
              className="coupon-code-input"
              onChange={(e) => setCouponNo(e.target.value)}
              value={couponNo}
            />
            <button
              data-testid="apply-coupon-button"
              className="btn apply-btn"
              onClick={() => applyCoupon(couponNo)}
            >
              Apply
            </button>
          </div>
          {message && cart.length > 0 && <p className="coupon-success"
            data-testid="apply-coupon-message">{message}</p>}
        </div>

        <div className="total-section">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>
              ₹
              {cart
                .reduce((sum, item) => sum + item.price * item.qty, 0)
                .toFixed(2)}
            </span>
          </div>



          <div className="total-row discount-row">
            {couponNo && cart.length > 0 && discount && <div className="discount-row">
              <span>DISCOUNT (GRAB50):</span>
              <span>{`₹ ${discount}`}</span>
            </div>}
            <div data-testid="total-amount" className="total-amount final-total">
              <span>Total:</span>
              <span>{discount ? `₹${discount}` :
                `₹
              ${cart
                  .reduce((sum, item) => sum + item.price * item.qty, 0)
                  .toFixed(2)}`}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
