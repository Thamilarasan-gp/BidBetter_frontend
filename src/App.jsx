import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

/* Login & Signup page */
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

/* My Homepage */
import Home from './Home';
import Navbar from './Navbar';
import LiveAuction from './LiveAuction';
import Categories from './Categories';
import Footer from './Footer';

import Productcategory from './Productcategory';
import ProductDetails from './ProductDetails';

/* To create our Products */

import Description from './Description';
import Categoryselection from './Categoryselection';
import ImageUploader from './ImageUploader';
import MyProducts from './components/MyProducts';

/*To Create Our Auction*/
import CreateAuction from './CreateAuction';
import InviteCode from './InviteCode';
import JoinRoom from './JoinRoom';
import AuctionRoom from './AuctionRoom';

// HomePage component that includes all sections

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Home />
        <LiveAuction />
        <Categories />
      </div>
      <Footer />
    </>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App-con'>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/description" element={<Description />} />
            <Route path="/categoryselection" element={<Categoryselection />} />
            <Route path="/imageuploader" element={<ImageUploader />} />
            <Route path="/Create-Auction" element={<CreateAuction />} />
            <Route path="/Invitecode" element={<InviteCode />} />
            <Route path="/JoinRoom" element={<JoinRoom />} />
            <Route path="/AuctionRoom" element={<AuctionRoom />} />
            <Route path="/my-products" element={
              <PrivateRoute>
                <Navbar />
                <MyProducts />
                <Footer />
              </PrivateRoute>
            } />
            {/* Protected Routes */}
            <Route path="/home" element={<PrivateRoute> <HomePage /></PrivateRoute>} />
            <Route path="/productdetails/:id" element={<PrivateRoute> <Navbar /> <ProductDetails /> <Footer /> </PrivateRoute>} />
            <Route path="/category/:categoryId" element={<PrivateRoute> <Navbar /> <Productcategory /> <Footer /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Token Expiry Check Function
const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export default App;
