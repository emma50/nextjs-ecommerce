import { memo } from 'react'
import styles from './checkout.module.scss'

const Checkout = memo(function Checkout({
  subTotal,
  shippingFee,
  total,
  selected,
  saveCartToDBHandler
}) {
  return (
    <div className={`${styles.cart__checkout} ${styles.card}`}>
      <h2>Order Summary</h2>
      <div className={styles.cart__checkout_line}>
        <span>SubTotal</span>
        <span>USD${subTotal.toFixed(2)}</span>
      </div>
      <div className={styles.cart__checkout_line}>
        <span>Shipping Fee</span>
        <span>+{shippingFee}$</span>
      </div>
      <div className={styles.cart__checkout_total}>
        <span>Total</span>
        <span>USD{total.toFixed(2)}$</span>
      </div>
      <div className={styles.submit}>
        <button
          disabled={selected.length === 0}
          style={{
            background: `${selected.length === 0 ? '#eee' : ''}`,
            cursor: `${selected.length === 0 ? 'not-allowed' : ''}`
          }}
          onClick={() => saveCartToDBHandler()}
        >
          Continue
        </button>
      </div>
    </div>
  )
})

export default Checkout
