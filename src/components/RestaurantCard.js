import { CDN_URL } from "../utils/constant";
const RestaurantCard = (props) => {
    const {data} = props;

    const {cloudinaryImageId, name, cuisines, sla, avgRating} = data.info;
    return (
        <div className="res-card">
            <img className="res-logo" src={CDN_URL+cloudinaryImageId} alt="res-logo" />
            <h2>{name}</h2>
            <h3>{cuisines.join(", ")}</h3>
            <h4>{sla.deliveryTime} minutes</h4>
            <h4>{avgRating} stars</h4>
        </div>
    )
}

export default RestaurantCard;