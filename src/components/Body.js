import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import resData from "../utils/mockData";
import mockMenu from "../utils/mockMenu";
import '../styles/index.css';
import { useNavigate } from "react-router-dom";

const Body = () => {
  const [popupData, setPopupData] = useState(null);
  const [itemCounts, setItemCounts] = useState({});
  const navigate = useNavigate();

  // Reset item counts when popup opens/closes
  const openPopup = (data) => {
    setPopupData(data);
    setItemCounts({});
    window.history.pushState({}, '', `/${data.info.name.replace(/\s+/g, '-').toLowerCase()}`);
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

  const handleOrder = () => {
    const selectedMenu = mockMenu[popupData.name] || [];
    const orderedItems = selectedMenu
      .filter(item => itemCounts[item.id] > 0)
      .map(item => ({
        name: item.name,
        quantity: itemCounts[item.id],
        price: item.price,
      }));
    // You can use orderedItems for further logic (e.g. show summary, send to backend, etc.)
    console.log("Order placed:", orderedItems);
    setPopupData(null);
  };

  return (
    <div className="body">
      <div className="search">
        <input type="text" placeholder="Search for restaurants" />
        <button id='search-btn'>Search</button>
      </div>
      <div id="target-offer-container"></div>
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
            <h3>{popupData.info.name}</h3>
            <p>{popupData.info.cuisines && popupData.info.cuisines.join(',')}</p>
            <p>{popupData.info.locality}</p>
            <h4>Menu</h4>
            <ul>
              {(mockMenu[popupData.info.name] || []).map(item => (
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
            <button id={`order-btn-${popupData.info.name.replace(/\s+/g, '-').toLowerCase()}`} onClick={handleOrder}>Order</button>
            <button onClick={() => setPopupData(null)} style={{ marginLeft: "1rem" }}>Close</button>
          </div>
          <h1 id="popup-offer">offer here</h1>
        </div>
      )}
    </div>
  );
};

export default Body;