import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartProvider from './context/CartProvider.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import SiteLayout from './components/SiteLayout.jsx';
import CartToast from './components/CartToast.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
    return (
        <CartProvider>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route element={<SiteLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/shop/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
                <CartToast />
            </Router>
        </CartProvider>
    );
}

export default App;
