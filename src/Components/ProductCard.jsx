import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const productInCart = cartItems.find((item) => product.id === item.id);
  const prodQuantityLabel = productInCart ? `(${productInCart.quantity})` : "";

  return (
    <div className='product-card'>
      <img src={product.image} alt={product.name} />
      <div className='product-infos'>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-card-content">
          <div className='product-card-details'>
            <Link to={`/ProductDetails/${product.id}`}>View details</Link>
            <button onClick={() => addToCart(product)}>Add to cart {prodQuantityLabel}</button>
          </div>
          <h4>${product.price}</h4>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;