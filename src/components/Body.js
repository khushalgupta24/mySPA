import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import resData from "../utils/mockData";

// Static menu for all restaurants
const staticMenu = [
  { id: 1, name: "Pizza", price: 250 },
  { id: 2, name: "Burger", price: 120 },
  { id: 3, name: "Pasta", price: 180 },
];

const Body = () => {
  const [popupData, setPopupData] = useState(null);
  const [itemCounts, setItemCounts] = useState({});

  // Reset item counts when popup opens/closes
  const openPopup = (data) => {
    setPopupData(data);
    setItemCounts({});
  };

  const handleAdd = (id) => {
    setItemCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleIncrease = (id) => {
    setItemCounts((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const handleDecrease = (id) => {
    setItemCounts((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  return (
    <div className="body">
      <div className="search">
        <input type="text" placeholder="Search for restaurants" />
        <button>Search</button>
      </div>
      <div className="res-container">
        {resData.map((data, idx) => (
          <div key={idx} onClick={() => openPopup(data)} style={{ cursor: "pointer" }}>
            <RestaurantCard data={data} />
          </div>
        ))}
      </div>
      {popupData && (
        <div className="popup-overlay" onClick={() => setPopupData(null)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <h3>{popupData.name}</h3>
            <p>{popupData.cuisine}</p>
            <p>{popupData.address}</p>
            <h4>Menu</h4>
            <ul>
              {staticMenu.map(item => (
                <li key={item.id} style={{ marginBottom: "1rem" }}>
                  <span>{item.name} - ₹{item.price}</span>
                  {itemCounts[item.id] > 0 ? (
                    <span style={{ marginLeft: "1rem" }}>
                      <button onClick={() => handleDecrease(item.id)}>-</button>
                      <span style={{ margin: "0 8px" }}>{itemCounts[item.id]}</span>
                      <button onClick={() => handleIncrease(item.id)}>+</button>
                    </span>
                  ) : (
                    <button style={{ marginLeft: "1rem" }} onClick={() => handleAdd(item.id)}>Add</button>
                  )}
                </li>
              ))}
            </ul>
            <button onClick={() => setPopupData(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;