import {Link, useNavigate} from 'react-router-dom'
import Cookies  from 'js-cookie'

import './index.css'

const Header = props => {
  const navigate = useNavigate()
  const onLogOut = () =>{
    Cookies.remove("AccessToken") 
    navigate('/login')
  }
  
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <img
            className="website-logo"
            src="https://res.cloudinary.com/ddypfxeyk/image/upload/v1693467759/Add_a_heading_pvmacz.png"
            alt="website logo"
          />

          <button
            type="button"
            className="nav-mobile-btn"
            onClick = {onLogOut} 
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="nav-bar-img"
            />
          </button>
        </div>

        <div className="nav-content nav-bar-large-container">
          <img
            className="website-logo"
            src="https://res.cloudinary.com/ddypfxeyk/image/upload/v1693467759/Add_a_heading_pvmacz.png"
            alt="website logo"
          />
          <ul className="nav-menu">
            <Link to="/" className="nav-menu-item">
              <li>Home</li>
            </Link>

            <Link to="/products" className="nav-menu-item">
              <li>Products</li>
            </Link>

            <Link to="/cart" className="nav-menu-item">
              <li>Cart</li>
            </Link>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick = {onLogOut} 
          >
            Logout
          </button>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <Link to="/">
            <li className="nav-menu-item-mobile">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-img"
              />
            </li>
          </Link>

          <Link to="/products">
            <li className="nav-menu-item-mobile">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="nav-bar-img"
              />
            </li>
          </Link>

          <Link to="/cart">
            <li className="nav-menu-item-mobile">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="nav-bar-img"
              />
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  )
}
export default Header
