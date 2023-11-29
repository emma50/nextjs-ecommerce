import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/cart.module.scss'
import Header from '../components/cart/header'
import Empty from '../components/cart/empty'
import Product from '../components/cart/product'
import CartHeader from '../components/cart/cartHeader'
import Checkout from '../components/cart/checkout'
import PaymentMethods from '../components/cart/paymentMethods'
import ProductsSwiper from '../components/productsSwiper'
import { women_swiper } from '../data/home'

export default function Cart() {
  let cart = useSelector((state) => state.cart)
  const router = useRouter()
  const [selected, setSelected] = useState(cart.cartItems.products)
  
  const [shippingFee, setShippingFee] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)
 
  useEffect(() => {
    setSubTotal(selected.reduce((acc, value) => acc + (value.price * value.quantity), 0))
    setTotal(selected.reduce((acc, value) => acc + (value.price * value.quantity), 0) + shippingFee)
  }, [selected])

  const saveCartToDBHandler = async () => {
    router.push('/checkout')
  }

  return (
    <>
      <Header/>
      <div className={styles.cart}>
        {
          cart.cartItems.products && cart.cartItems.products.length > 0 
          ? <div className={styles.cart__container}>
              <CartHeader 
                cartItems={cart.cartItems}
                selected={selected}
                setSelected={setSelected}
              />
              <div className={styles.cart__products}>
                {
                  cart.cartItems.products.map((product) => {
                    return (
                      <Product 
                        product={product} 
                        key={product.id}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    )
                  })
                }
              </div>
              <Checkout 
                subTotal={subTotal}
                shippingFee={shippingFee}
                total={total}
                selected={selected}
                saveCartToDBHandler={saveCartToDBHandler}
              />
              <PaymentMethods/>
            </div>
          : <Empty/>
        }
        <div style={{padding: '0 1rem', transform: 'translateY(-30px)'}}>
         <ProductsSwiper products={women_swiper}/>
        </div>
      </div>
    </>
  )
}
