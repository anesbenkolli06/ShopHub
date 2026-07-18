import React, { useEffect, useState } from 'react';
import './Pages.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/Products';
import { useCart } from '../context/CartContext';

function ProductDetails() {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const productInCart = cartItems.find((item) => item.id === Number(id));
  const prodQuantityLabel = productInCart ? `(${productInCart.quantity})` : "";

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (!foundProduct) {
      navigate("/");
    } else {
      setProduct(foundProduct);
    }
  }, [id, navigate]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className='productD-page'>
      <div className='pd-container'>
        <div className='pd-img'>
          <img src={product.image} alt={product.name} />
        </div>
        <div className='pd-details'>
          <h2 className='pd-title'>{product.name}</h2>
          <h3 className='pd-price'>${product.price}</h3>
          <p className='pd-desc'>{product.description}</p>
          <button 
            className='pd-button' 
            onClick={() => addToCart(product)}
          >
            Add to Cart {prodQuantityLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;