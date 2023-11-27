// import { getSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import styles from '../styles/checkout.module.scss' 
import Header from '../components/cart/header'
import Products from '../components/checkout/products'
import Payment from '../components/checkout/payment'
import Summary from '../components/checkout/summary'

export default function Checkout() {
  const cart = useSelector((state) => state.cart)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [totalAfterDiscount, setTotalAfterDiscount] = useState('')
  const [selectedAddress, setSelectedAddress] = useState('')

  return (
    <>
      <Header/>
      <div className={`${styles.container} ${styles.checkout}`}>
        <div className={styles.checkout__side}>
          <Products cart={cart.cartItems.products}/>
        </div>
        <div className={styles.checkout__side}>
          <Payment 
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <Summary
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
            user={user || ''}
            cart={cart.cartItems.products}
            paymentMethod={paymentMethod}
            selectedAddress={selectedAddress || ''}
          />
        </div>
      </div>
    </>
  )
}
