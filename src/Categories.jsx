import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';
import { FaTshirt, FaFutbol, FaBaseballBall, FaGlasses, FaShoePrints, FaCogs } from 'react-icons/fa';

function Categories() {
  const navigate = useNavigate();

  const categories = [
    { icon: FaTshirt, name: 'Player Jerseys', path: '/category/jerseys' },
    { icon: FaFutbol, name: 'Sports Balls', path: '/category/balls' },
    { icon: FaBaseballBall, name: 'Bats & Rackets', path: '/category/bats-rackets' },
    { icon: FaGlasses, name: 'Sports Glasses', path: '/category/glasses' },
    { icon: FaShoePrints, name: 'Sports Shoes', path: '/category/shoes' },
    { icon: FaCogs, name: 'Sports Accessories', path: '/category/accessories' }
  ];

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <div className='categories-container'>
      <p>Browse By Categories</p>
      <div className="catagories-box">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="catagories_items"
            onClick={() => handleCategoryClick(category.path)}
          >
            <category.icon /> {category.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
