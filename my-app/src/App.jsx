// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// //css
// import './App.css'

// //pages
// import HomePage from './pages/HomePage';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import ProductDetails from './pages/ProductDetails';
// import PageNotFound from './pages/PageNotFound';

// //componets
// import Layout from './components/Layout';

// function App() {
//   return (
//     <BrowserRouter>
//       <Layout>
//         <Routes>
//           <Route path='/' element={<HomePage />} />
//           <Route path='/cart' element={<Cart />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/products/:productId' element={<ProductDetails />} />
//           <Route path='*' element={<PageNotFound />} />
//         </Routes>
//       </Layout>
//     </BrowserRouter>

//   )
// }
 
// export default App


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// 1. Import your pages
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import PageNotFound from './pages/PageNotFound';

// 2. Import your components
import Layout from './components/Layout';

// 3. IMPORT THE CART PROVIDER (This fixes the error)
import { CartProvider } from './context/CartContext';

// chatboat
import Chatbot from './Chatbot'; 


function App() {
  return (
    // 4. Wrap the entire app in CartProvider so all pages can access the cart
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Chatbot />
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
