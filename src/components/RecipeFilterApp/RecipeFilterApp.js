import { useState, useMemo } from "react";
import "./RecipeFilterApp.module.css";
import recipesData from "./recipesData";

const RecipeFilterApp = () => {
  const [minRating, setMinRating] = useState(4);
  const [cart, setCart] = useState([]);

  const filterRecipe = useMemo(
    () => recipesData.filter((recipe) => recipe.rating >= minRating),
    [minRating]
  );
  const distinctRatings = [...new Set(recipesData.map((r) => r.rating))].sort(
    (a, b) => a - b
  );

  const averageRating =
    filterRecipe.reduce(
      (sum, r) => (sum = sum + r.rating),

      0
    ) / (filterRecipe.length || 1);

  const updateCart = (recipe) => {
    setCart((prev) => [...prev, recipe]);
  };

  return (
    <div className="receipe-header">
      <h1>🍽️ Recipe Explorer</h1>
      <div className="filter-cart">
        <label htmlFor="ratingFilter">Filter by Rating: </label>
        <select
          value={minRating}
          id="ratingFilter"
          onChange={(e) => setMinRating(Number(e.target.value))}
        >
          {distinctRatings.map((r) => (
            <option key={r} value={r}>
              {r}+
            </option>
          ))}
        </select>
        <h1>Cart Items: {cart.length}</h1>
      </div>

      <h1 className="rating">
        Average Rating: {averageRating.toFixed(2)} ({filterRecipe.length}{" "}
        recipes)
      </h1>

      <div className="food-cart">
        {filterRecipe.map((recipe) => (
          <div className="menu" key={recipe.id}>
            <img src={recipe.image} alt="foodImage" />
            <p>{recipe.name}</p>
            <p>{recipe.cuisine}</p>
            <p>{`⭐ Rating: ${recipe.rating} (${recipe.reviewCount} reviews)`}</p>
            <button onClick={() => updateCart(recipe)} className="cart-btn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeFilterApp;
