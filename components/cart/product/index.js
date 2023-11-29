import { BsHeart } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
import { memo } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react' 
import { updateCart } from '../../../store/cartSlice'
import styles from './product.module.scss'

const Product = memo(function Product({ product, selected, setSelected }) {
  const cart = useSelector((state) => state.cart)
  const [active, setActive] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    let check = selected.find((item) => item.id === product.id)
    setActive(check)
  }, [selected])

  const updateQty = (type) => {
    let newCart = cart.cartItems.products.map((item) => {
      if (item.id === product.id) {
        return {
          ...item,
          quantity: type === 'plus' ? product.quantity + 1 : type === 'minus' ? product.quantity - 1 : product.quantity
        }
      }
      return item
    })
    dispatch(updateCart({
      ...cart.cartItems,
      products: newCart
    }))
  }
  const removeProduct = (id) => {
    let newCart = cart.cartItems.products.filter((item) => {
      return item.id !== id
    })
    dispatch(updateCart({
      ...cart.cartItems,
      products: newCart
    }))
  }

  const handleSelect = () => {
    if (active) {
      setSelected(selected.filter((item) => item.id !== product.id))
    }
    else {
      setSelected([...selected, product])
    }
  }

  return (
    <div className={`${styles.card} ${styles.product}`}>
      {product.quantity < 1 && <div className={styles.blur}></div>}
      <div className={styles.product__header}>
        <img src={'/images/store.webp'} alt="" />
        EMMANUELS OFFICIAL STORE
      </div>
      <div className={styles.product__image}>
        <div 
          className={`${styles.checkbox} ${active && styles.active}`} 
          onClick={() => handleSelect()}
        >
        </div>
        <img src={product.image} alt=""/>
        <div className={styles.col}>
          <div className={styles.grid}>
            <h1>
              {
                product.title && product.title.length > 30 
                ? `${product.title.slice(0, 30)}...`
                : product.title
              }
            </h1>
            <div style={{zIndex: '2'}}>
              <BsHeart/>
            </div>
            <div
              style={{zIndex: '2'}}
              onClick={() => removeProduct(product.id)}
            >
              <AiOutlineDelete/>
            </div>
          </div>
          <div className={styles.product__style}>
            {product.price && <span>{product.price}$</span>}
            <MdOutlineKeyboardArrowRight/>
          </div>
          <div className={styles.product__priceQty}>
            <div className={styles.product__priceQty_price}>
              <span className={styles.price}>
                USD{product.price * product.quantity}
              </span>
            </div>
            <div className={styles.product__priceQty_qty}>
              <button 
                disabled={product.quantity < 2}
                onClick={() => updateQty('minus')}
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button 
                disabled={product.quantity === product.quantity}
                onClick={() => updateQty('plus')}
              >
                +
              </button>
            </div>
          </div>
          <div className={styles.product__shipping}>
            {'Free Shipping'}
          </div>
          {
            product.quantity < 1 &&
            <div className={styles.notAvailable}>
              This product is out of stock. Add it to your wishlist it may get re-stocked
            </div>
          }
        </div>
      </div>
    </div>
  )
})

export default Product