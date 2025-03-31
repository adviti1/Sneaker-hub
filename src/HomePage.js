import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const items = [
    {
      brand: 'Nike',
      color: '#9c4d2f',
      description: 'Premium quality sneakers',
      image: 'image1.png'
    },
    {
      brand: 'Adidas',
      color: '#07550f',
      description: 'Sport-inspired footwear',
      image: 'image2.png'
    },
    {
      brand: 'Reebok',
      color: '#032f5e',
      description: 'Classic and comfortable',
      image: 'image3.png'
    }
  ];

  const nextSlide = () => {
    if (transitioning) return;
    setTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    if (transitioning) return;
    setTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [transitioning]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitioning(false);
    }, 500); // Match this with your CSS transition duration
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="brand-name">Sneaker Hub</span>
        </div>
        <div className="nav-center">
          <a href="#shoes" className="nav-link">Shoes</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <div className="navbar-spacer"></div> 
      </nav>
      
      <div className="main">
        <section className="carousel">
          <div className="list">
            {items.map((item, index) => (
              <article 
                key={index}
                className={`item ${index === activeIndex ? 'active' : ''}`}
                style={{
                  zIndex: index === activeIndex ? 2 : 1,
                  opacity: index === activeIndex ? 1 : 0,
                  transition: 'opacity 500ms ease-in-out'
                }}
              >
                <div className="main-content" style={{ backgroundColor: item.color }}>
                  <div className="content">
                    <h2>{item.brand}</h2>
                    <p className="description">{item.description}</p>
                    <button className="view">View Products</button>
                  </div>
                </div>
                <figure className='image'>
                  <img src={item.image} alt={`${item.brand} sneakers`}/>
                  <figcaption>{item.brand}</figcaption>
                </figure>
              </article>
            ))}
          </div>
          <div className="arrows">
            <button id="prev" onClick={prevSlide} disabled={transitioning}> &lt; </button>
            <button id="next" onClick={nextSlide} disabled={transitioning}> &gt; </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;