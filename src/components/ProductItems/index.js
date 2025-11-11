import './index.css'
import {IoIosArrowForward} from 'react-icons/io'
import {FaMinus, FaPlus} from 'react-icons/fa'
import {useContext} from 'react'
import {CartContext} from '../../CartContext'

const ProductItems = ({fullData, activeCategory}) => {
  const {addToCart, cartItems, removeFromCart} = useContext(CartContext)
  const filteredData =
    activeCategory === 'All'
      ? fullData.categories
      : fullData.categories.filter(
          each =>
            each.name.trim().toLowerCase() ===
            activeCategory.trim().toLowerCase(),
        )

  const getQuantity = id => {
    const item = cartItems.find(each => each.id === id)
    return item ? item.quantity : 0
  }
  return (
    <div className="products-container">
      {filteredData.map(category => (
        <div>
          <div className="category-container">
            <div className="category-indicator">
              <h1 className="each-category-name">{category.name}</h1>
              <IoIosArrowForward />
            </div>
            <button type="button" className="viewall-btn">
              View All
            </button>
          </div>
          <ul className="products-list-container">
            {category.products.map(product => {
              const quantity = getQuantity(product.id)
              return (
                <li
                  key={product.id}
                  className="each-product"
                  data-testid="product"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <p className="product-name">{product.name}</p>
                  <p className="product-weight">{product.weight}</p>
                  <div className="add-btn-container">
                    <p className="product-price">{product.price}</p>
                    {quantity === 0 ? (
                      <button
                        type="button"
                        className="add-btn"
                        data-testid="add-button"
                        onClick={() => {
                          addToCart(product)
                        }}
                      >
                        Add
                      </button>
                    ) : (
                      <div className="plus-minus-container">
                        <button
                          type="button"
                          className="minus-btn"
                          data-testid="decrement-count"
                          onClick={() => {
                            removeFromCart(product.id)
                          }}
                        >
                          <FaMinus />
                        </button>
                        <span
                          className="quantity-count"
                          data-testid="active-count"
                        >
                          {quantity}
                        </span>
                        <button
                          type="button"
                          className="plus-btn"
                          data-testid="increment-count."
                          onClick={() => {
                            addToCart(product)
                          }}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
export default ProductItems
