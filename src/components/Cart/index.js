import './index.css'
import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {RiArrowLeftSLine} from 'react-icons/ri'
import {FaMinus, FaPlus} from 'react-icons/fa'
import {CartContext} from '../../CartContext'
import Footer from '../Footer'

const Cart = () => {
  const {cartItems, removeFromCart, addToCart} = useContext(CartContext)

  const totalCartPrice = cartItems.reduce((prev, eachItem) => {
    const actualPrice = Number(eachItem.price.replace('₹', ''))
    return prev + actualPrice * eachItem.quantity
  }, 0)
  const totalItems = cartItems.reduce((prev, each) => prev + each.quantity, 0)

  return (
    <div className="cart-main-container">
      <Footer />
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <img
              src="https://res.cloudinary.com/drji3ydue/image/upload/v1762504361/d9893193-e5f4-4d23-9778-4e6f545a83a4.png"
              alt="empty-cart"
              className="empty-cart-img"
            />
            <p className="empty-text">
              Your cart is empty. Start adding products!
            </p>
            <Link to="/" className="shop-now-btn">
              <button type="button" className="show-now-btn">
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="your-cart-arrow-container">
              <Link to="/" className="arrow-link">
                <RiArrowLeftSLine size={22} />
              </Link>
              <p>Your Cart</p>
            </div>

            <div className="cart-items-container">
              <div className="your-items-container">
                <p className="your-items">Your Items</p>
                <p className="total-items">{totalItems} items</p>
              </div>
              <hr className="dashed-line" />
              <ul className="cart-item-list-container">
                {cartItems.map(eachItem => {
                  const actualPrice = Number(eachItem.price.replace('₹', ''))
                  const totalPrice = eachItem.quantity * actualPrice
                  return (
                    <li
                      key={eachItem.id}
                      className="each-cart-item-container"
                      data-testid="cartItem"
                    >
                      <div className="cart-image-container">
                        <img
                          src={eachItem.image}
                          alt={eachItem.name}
                          className="cart-item-image"
                        />
                      </div>

                      <div className="cart-item-details-container">
                        <p className="cart-product-name">{eachItem.name}</p>
                        <p className="cart-product-weight">{eachItem.weight}</p>
                      </div>

                      <div className="plus-minus-container">
                        <button
                          type="button"
                          onClick={() => removeFromCart(eachItem.id)}
                          className="minus-btn"
                        >
                          <FaMinus />
                        </button>
                        <span className="quantity-count">
                          {eachItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(eachItem)}
                          className="plus-btn"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <p className="cart-product-price">
                        ₹{totalPrice.toFixed(2)}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="cart-bill-container">
              <p className="bill-details">BILL DETAILS</p>
              <hr className="dashed-line" />
              <div className="total-bill-container">
                <p className="total-label">Total:</p>
                <p className="total-amount">₹{totalCartPrice.toFixed(2)}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
