import { faShoppingCart, faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { FETCH_CHECKOUT_COUNT_ERROR } from '../../constants/constants';
import './Navbar.css';

export default function NavBar({ checkoutCount } : { checkoutCount: string | number }) {
  return (
    <nav className="navbar">
      <div className="navbar-home-link">
        <NavLink to="/">
          Hardware Handler
          <FontAwesomeIcon className="navbar-icon" icon={faTools} />
        </NavLink>
      </div>
      <span className="navbar-links-wrapper">
        <NavLink to="/my-products">
          My Products
        </NavLink>
        <NavLink to="/new-product-form">
          Add New Products
        </NavLink>
        <NavLink className="navbar-link" to="/checkout">
          Checkout
          <FontAwesomeIcon className="navbar-icon" icon={faShoppingCart} />
          {checkoutCount !== FETCH_CHECKOUT_COUNT_ERROR && checkoutCount > 0 ? (
            <p className="navbar-checkout-count">: {checkoutCount}</p>
          ) : null}
        </NavLink>
      </span>
    </nav>
  )
}
