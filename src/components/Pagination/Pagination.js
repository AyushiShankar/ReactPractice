import { useEffect, useState } from "react";
import styles from './Pagination.module.css';
import ProductCard from "./ProductCard.js";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const PAGE_SIZE = 10;


const Pagination = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const start = activeIndex * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const data = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=200");

      if (!res.ok) return [];

      const response = await res.json();
      setAllProducts(response.products || []);

    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    data();
  }, [])


  const handleDec = () => {
    setActiveIndex((prev) => prev - 1);

  }

  const handleInc = () => {
    setActiveIndex((prev) => prev + 1);

  }
  const PAGE_COUNT = Math.ceil(allProducts.length / PAGE_SIZE);

  return allProducts.length === 0 ? (
    <h1>No products found</h1>
  ) :
    (
      <div className={styles.container}>
        <h1>Pagination</h1>
        {allProducts.length !== 0 &&
          <div className="indexNumber">
            <button
              id="previous"
              onClick={handleDec}
              disabled={activeIndex === 0}
            >
              <FiChevronsLeft />
            </button>
            {
              [...Array(PAGE_COUNT).keys()].map((n) => (
                <button
                  key={n}
                  onClick={() => setActiveIndex(n)}
                  className={n === activeIndex ? `${styles.active}` : ""}
                >
                  {n + 1}
                </button>
              ))
            }
            <button
              id="next"
              disabled={activeIndex === PAGE_COUNT - 1}
              onClick={handleInc}
            >
              <FiChevronsRight />
            </button>
          </div>}

        <div className={styles["product-grid"]}>
          {allProducts.slice(start, end).map((item) => (
            <ProductCard key={item.id} image={item.images} title={item.title} />
          ))}
        </div>

      </div >

    );
};
export default Pagination;
