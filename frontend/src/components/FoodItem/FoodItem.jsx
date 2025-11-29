import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const FoodItem = ({ image, name, price, desc, id }) => {
  const [itemCount, setItemCount] = useState(0)
  const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext)

  // 🔧 FINAL: Safe image logic (works for both dummy and uploaded)
  const getImageSrc = () => {
    // If image is a full URL or a base64 blob or imported file, use as is
    if (typeof image !== 'string') return image
    if (image.startsWith('http') || image.startsWith('/')) return image
    return `${url}/images/${image}`
  }

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img className='food-item-image' src={getImageSrc()} alt={name} />
        {!cartItems[id] ? (
          <img
            className='add'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt='Add'
          />
        ) : (
          <div className='food-item-counter'>
            <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt='Remove' />
            <p>{cartItems[id]}</p>
            <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt='Add' />
          </div>
        )}
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt='Rating' />
        </div>
        <p className='food-item-desc'>{desc}</p>
        <p className='food-item-price'>
          {currency}
          {price}
        </p>
      </div>
    </div>
  )
}

export default FoodItem
