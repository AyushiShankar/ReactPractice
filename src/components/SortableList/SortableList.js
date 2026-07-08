import React, { useState, useCallback } from 'react';
import './styles.css';

const SortableList = () => {
  const [list, setList] = useState([]);
  const [item, setItem] = useState("");

  const handleAddList = () => {
    if (item) {
      setList((prev) => [
        ...prev,
        item

      ]);

      setItem("");
    }


  }

  const handleSort = useCallback((type) => {
    setList((prev) => {
      const updated = [...prev];
      updated.sort((a, b) => {
        if (type === "asc")
          return a.localeCompare(b);

        else
          return b.localeCompare(a)

      });
      return updated;
    });
  }, []);

  return (
    <div className="sortable-list-container">
      <h3>Sortable List</h3>
      <input
        type="text"
        placeholder="Add a new item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button onClick={handleAddList}>Add Item</button>
      <div>
        <button onClick={() => handleSort("asc")}>Sort Ascending</button>
        <button onClick={() => handleSort("desc")}>Sort Descending</button>
      </div>
      <ul className="list-items">
        {list.map((listItem, index) => (
          <li key={index} id={`item-${index}`}>
            {listItem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortableList;
