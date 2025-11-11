import './index.css'
import Cookies from 'js-cookie'
import {FiHome} from 'react-icons/fi'
import {CiShoppingCart, CiLogout} from 'react-icons/ci'
import {Link, useHistory} from 'react-router-dom'

const Footer = () => {
  const history = useHistory()
  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="footer-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/drji3ydue/image/upload/v1761320602/6fad20838855997d164dd88d885fad87bdfa3be6_or1vpx.png"
          alt="website logo"
          className="header-website-logo"
        />
      </Link>
      <div className="navigation-btns-container">
        <Link to="/" className="footer-btns">
          <FiHome size={22} className="footer-icon" />
          <p className="navigation-text">Home</p>
        </Link>
        <Link to="/cart" className="footer-btns">
          <CiShoppingCart size={22} className="footer-icon" />
          <p className="navigation-text">Cart</p>
        </Link>
        <button type="button" className="logout-btn" onClick={logout}>
          <CiLogout size={22} className="logout-icon" />
          <p className="logout-text">Logout</p>
        </button>
      </div>
    </div>
  )
}

export default Footer
