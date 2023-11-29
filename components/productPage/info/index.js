import { Rating } from '@mui/material'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { BsHandbagFill, BsHeart } from 'react-icons/bs'
import {TbMinus, TbPlus} from 'react-icons/tb'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import styles from './info.module.scss'
import Accordian from './Accordian'
import Share from './share'
import SimillarSwiper from './SimillarSwiper'
import { addToCart, updateCart } from '../../../store/cartSlice'
import DialogModal from "../../dialogModal"
import { showDialog } from '../../../store/dialogSlice'

export default function Info({ product }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState("");

  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    setQty(1)
  }, [])

  const addToCartHandler = async () => {
    const { data } = await axios.get(
      `https://fakestoreapi.com/products/${product.id}`
    )

    if (!data) {
      dispatch(showDialog({
        header: 'Error',
        msgs: 'Product does not exist'
      }))
    }
  
    let id = `${data.id}`
    let exist = cart.cartItems.products && cart.cartItems.products.find((item) => item.productId === id)

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 as month is zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    
    if (exist) {
      const updatedCart = axios.post(
        `https://fakestoreapi.com/carts/${cart.cartItems.cartId}`,
        {
          body: {
            userId: user.id,
            date: formattedDate,
            products: [
              {
                productId: product.id,
                quantity: qty,
              }
            ]
          }
        }
      )

      if (updatedCart.data.id) {
        dispatch(updateCart({
          ...cart.cartItems,
          id: (await updatedCart).data.id
        }))
      }
      
      dispatch(showDialog({
        header: 'Success',
        msgs: 'You have successfully updated the cart'
      }))
    
      setTimeout(() => router.push('/cart'), 2000)
    }
    else {
      const res = await axios.post('https://fakestoreapi.com/carts', {
        body: {
          userId: user.id,
          date: formattedDate,
          products: [
            {
              productId: product.id,
              quantity: qty
            }
          ]
        }
      })

      dispatch(addToCart({
        cartId: res.data.id,
        userId: user.id,
        date: formattedDate,
        products: [
          ...cart.cartItems.products,
          { 
            productId: product.id, 
            quantity: qty,
            category: product.category,
            image: product.image,
            rating: product.rating,
            description: product.description,
            price: product.price,
            title: product.title 
          }
        ]
      }))

      dispatch(showDialog({
        header: 'Success',
        msgs: 'You have successfully added a product to the cart'
      }))

      setTimeout(() => router.push('/cart'), 2000)
    }
  }

  return (
    <div className={styles.info}>
      <DialogModal type={'success'}/>
      <div className={styles.info__container}>
        <h1 className={styles.info__name}>{product.name}</h1>
        <h2 className={styles.info__sku}>{product?.sku}</h2>
        <div className={styles.info__rating}>
          <Rating
            name="half-rating-read"
            value={product.rating.rate}
            precision={0.5}
            readOnly
            style={{color: '#facf19'}}
          />
          ({product.rating.count}
          {product.rating.count <= 1 ? ' review' : ' reviews'})
        </div>
        <div className={styles.info__price}>
          {<h1>${product.price}</h1>} 
        </div>
        {' '}
        <span>
          {product.quantity}{' '}pieces available.
        </span>
        <div className={styles.info__qty}>
          <button
            onClick={() => qty > 1 ? setQty((prev) => prev - 1) : setQty(1)}
          >
            <TbMinus/>
          </button>
          <span>{qty}</span>
          <button 
            onClick={
              () => qty < product.quantity ? setQty((prev) => prev + 1) : setQty(product.quantity || 1)
            }
          >
            <TbPlus/>
          </button>
        </div>
        <div className={styles.info__actions}>
          <button
            disabled={product.quantity < 1}
            style={{
              cursor: `${product.quantity < 1 ? 'not-allowed' : 'pointer'}`
            }}
            onClick={() => addToCartHandler()}
          >
            <BsHandbagFill/>
            <b>ADD TO CART</b>
          </button>
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {success && <span className={styles.success}>{success}</span>}
        <Share/>
        <Accordian details={[product.description]}/>
        <SimillarSwiper/>
      </div>
    </div>
  )
}
