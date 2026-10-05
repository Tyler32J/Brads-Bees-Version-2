import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartProvider'
import { MessageProvider } from './context/MessageProvider'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Education from './pages/Education'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Ideas from './pages/Ideas'
import CartIdeas from './pages/CartIdeas'
import ShopIdeas from './pages/ShopIdeas'
import MoreIdeas from './pages/MoreIdeas'
import ExtraIdeas from './pages/ExtraIdeas'

function App() {
  return (
    <MessageProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/cart" element={<Cart />} />
              <Route path="/shop/checkout" element={<Checkout />} />
              <Route path="/education" element={<Education />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ideas" element={<Ideas />} />
              <Route path="/ideas/cart" element={<CartIdeas />} />
              <Route path="/ideas/shop" element={<ShopIdeas />} />
              <Route path="/ideas/more" element={<MoreIdeas />} />
              <Route path="/ideas/extra" element={<ExtraIdeas />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </MessageProvider>
  )
}

export default App
