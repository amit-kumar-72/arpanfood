import React from 'react';
import './Header.css';

const Header = () => {
  const images = [
    '/header_img1.png',
    '/header_img2.jpg',
    '/header_img3.jpg'
  ];

  return (
    <div className="header">
      <div className="header-background">
        {images.concat(images).map((img, index) => (
          <div
            key={index}
            className="header-bg-image"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      <div className="header-contents">
        <h2>Arpan's Food Delights Await You!</h2>
        <p>Welcome to Arpan's world of flavors! Explore mouth-watering dishes made with love, passion, and the freshest ingredients. Your perfect meal is just a click away!</p>
        <button>Explore Our Menu</button>
      </div>
    </div>
  );
};

export default Header;
