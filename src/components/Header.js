import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constant";

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL} alt="Logo" />
                <h1 className="title">Food App</h1>
            </div>
            <div className="nav-items">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                    <li><Link to='/cart'>Cart</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Header;