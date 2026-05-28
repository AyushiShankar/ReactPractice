import { useState } from "react";
import "./styles.css";

export default function BillingCounter() {
  const [counterNo, setCounterNos] = useState("");
  const [quantity, setQuantity] = useState("");
  const [counters, setCounters] = useState([]);
  const [message, setMessage] = useState("");

  const addCounters = () => {
    if (!counterNo) return;

    const newCounters = Array.from(
      { length: Number(counterNo) },
      (_, index) => ({
        id: `${index + 1}`,
        title: `Counter ${index + 1}`,
        quant: [],
      })
    );

    setCounters(newCounters);
    setCounterNos("");
  };

  const addCustomer = () => {
    if (!quantity || counters.length === 0) return;

    const targetCounter = counters.reduce((smallest, current) =>
      current.quant.length < smallest.quant.length ? current : smallest
    );

    setCounters((prev) =>
      prev.map((counter) =>
        counter.id === targetCounter.id
          ? { ...counter, quant: [...counter.quant, quantity] }
          : counter
      )
    );

    setMessage(`Customer assigned to Counter ${targetCounter.id}`);
    setQuantity("");
  };

  return (
    <div className="billing-container" data-testid="billing-container">
      <h2 data-testid="heading">Billing Counter System</h2>
      <div className="input-section" data-testid="customer-input-section">
        {counters.length > 0 ? (
          <>
            <input
              data-testid="quantity-input"
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button data-testid="set-customer-button" onClick={addCustomer}>
              Add Customer
            </button>
          </>
        ) : (
          <>
            <input
              data-testid="counter-input"
              type="number"
              placeholder="Number of counters"
              value={counterNo}
              onChange={(e) => setCounterNos(Number(e.target.value))}
            />
            <button data-testid="set-counter-button" onClick={addCounters}>
              Set Counters
            </button>
          </>
        )}
      </div>
      {message && (
        <p className="assigned-msg" data-testid="assignment-msg">
          {message}
        </p>
      )}
      {counters.length > 0 && (
        <div className="counter-wrapper">
          {counters.map((counter, index) => (
            <div key={index} className="counter">
              <div className="queue" data-testid={`queue-${index}`}>
                <h4 data-testid="counter-heading">{counter.title}</h4>

                {counter.quant.map((q, index) => (
                  <div className="customer-box" key={index}>
                    {q}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
