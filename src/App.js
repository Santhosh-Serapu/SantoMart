import './App.css'
import {Route, Switch} from 'react-router-dom'
import {CartProvider} from './CartContext'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoutes from './components/ProtectedRoutes'
import NotFound from './components/NotFound'

const App = () => (
  <CartProvider>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoutes exact path="/" component={Home} />
      <ProtectedRoutes exact path="/cart" component={Cart} />
      <Route component={NotFound} />
    </Switch>
  </CartProvider>
)

export default App
