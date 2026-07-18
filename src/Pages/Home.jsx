import React from 'react'
import './Pages.css'
import { Link } from 'react-router-dom';
import { getProducts } from '../data/Products.js'
import { useEffect, useRef } from 'react';
import { animate, splitText, stagger,  } from 'animejs';
import ProductCard from '../Components/ProductCard.jsx';
function Home() {
  const products = getProducts();
  const h1ref = useRef(null)
  useEffect(()=>{
    if(!h1ref.current) return;
    const { chars } = splitText(h1ref.current, { words: false, chars: true });
    const animation = animate(chars, {
    // Property keyframes
    y: [
      { to: '-2.75rem', ease: 'outExpo', duration: 600 },
      { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
    ],
    // Property specific parameters
    rotate: {
      from: '-1turn',
      delay: 0
    },
    delay: stagger(50),
    ease: 'inOutCirc',
    loopDelay: 1000,
    loop: false
  });
  return()=>{
    animation.pause();
  }
  },[]);
  return (
    <>
      <div className='homePage-container'>
        <div className='homePage-greeting'>
          <h1 ref={h1ref}>Welcome to ShopHub</h1>
          <p>Discover great products, with great prices.</p>
        </div>
        <div className='homePage-subContainers'>
          <div className='homePage-subContainer'>
            <h2>Our Products</h2>
            <div className='homePage-subContainer-grid'>
              {products.map((product) => {
                return(
                  <ProductCard product={product} key={product.id} />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home 