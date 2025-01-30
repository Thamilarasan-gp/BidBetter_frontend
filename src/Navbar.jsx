import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fetchUsername = async () => {
    try {
      const response = await fetch('http://localhost:5000/username', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Check if the response is valid JSON before proceeding
      if (!response.ok) {
        const errorText = await response.text(); // Get the raw response text
        console.error('Error fetching username:', errorText);
        setError('An error occurred while fetching the username.');
        return;
      }

      const data = await response.json();
      console.log('Fetched username:', data.username);
      setUsername(data.username); // Store the username in the state
    } catch (error) {
      console.error('Error fetching username:', error);
      setError('An error occurred during the request.');
    }
  };

  useEffect(() => {
    fetchUsername(); // Fetch username when the component mounts
  }, []);

  const menuItems = [
    {
      title: 'Dashboard',
      items: [
        { name: 'My Dashboard', path: '/dashboard' }
      ]
    },
    {
      title: 'Products',
      items: [
        { name: 'My Products', path: '/my-products' },
        { name: 'Create Product', path: '/description' }
      ]
    },
    {
      title: 'Auctions',
      items: [
        { name: 'My Auctions', path: '/my-auctions' },
        { name: 'Create Auction', path: '/create-auction' },
        { name: 'Winning Bids', path: '/winning-bids' }
      ]
    }
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        BID<span>Better</span>
      </div>

      <div className="menu">
        <Link to="/home">Home</Link>
        <Link to="/auctions">Auction</Link>
        <Link to="/create-auction">Sell</Link>
        <Link to="/about">About us</Link>
      </div>

      <div className="search">
        <input type="text" placeholder="Search for products..." />
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
          <path d="M21 20l-5.2-5.2c1.4-1.5 2.2-3.5 2.2-5.6C18 4.7 14.3 1 9.8 1S1.5 4.7 1.5 9.2s3.7 8.2 8.3 8.2c2 0 4-.8 5.5-2.1L20 21l1-1zm-11.3-4.6c-4 0-7.2-3.3-7.2-7.2 0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2c0 4-3.2 7.2-7.2 7.2z"></path>
        </svg>
      </div>

      <div className="profile-container">
      <div className="profile" onClick={() => setIsProfileOpen(!isProfileOpen)}>&#x1F464;</div>
        
        {isProfileOpen && (
          <div className="profile-slider">
            <div className="profile-header">
              <div className="profile-avatar">&#x1F464;</div>
              <div className="profile-info">
                <h3>Welcome {username || 'User'}</h3> {/* Display the fetched username */}
              </div>
            </div>

            <div className="menu-sections">
              {menuItems.map((section, index) => (
                <div key={index} className="menu-section">
                  <h4>{section.title}</h4>
                  <ul>
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link 
                          to={item.path}
                          onClick={() => setIsProfileOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="profile-footer">
              <Link 
                to="/profile"
                className="profile-link"
                onClick={() => setIsProfileOpen(false)}
              >
                Profile Settings
              </Link>
              <button 
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
