import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import resData from "../utils/mockData";

const Body = () => {
    const [popupData, setPopupData] = useState(null);

    return (
        <div className="body">
            <div className="search">
                <input type="text" placeholder="Search for restaurants" />
                <button>Search</button>
            </div>
            <div className="res-container">
                {resData.map((data, idx) => (
                    <div key={idx} onClick={() => setPopupData(data)} style={{ cursor: "pointer" }}>
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
                        <button onClick={() => setPopupData(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Body;