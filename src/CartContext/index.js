import {createContext, useState, useEffect} from 'react'

export const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = product => {
    setCartItems(prevCart => {
      const isItemAlreadyExist = prevCart.find(each => each.id === product.id)
      if (isItemAlreadyExist) {
        return prevCart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        )
      }
      return [...prevCart, {...product, quantity: 1}]
    })
  }

  const removeFromCart = id => {
    setCartItems(prevCart => {
      const existingItem = prevCart.find(item => item.id === id)

      if (!existingItem) {
        return prevCart
      }

      if (existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
      }

      return prevCart.filter(item => item.id !== id)
    })
  }

  console.log(cartItems)
  return (
    <CartContext.Provider value={{cartItems, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  )
}
