import { useState, useEffect, memo } from 'react'
import styles from './cartHeader.module.scss'
import { compareArrays } from '../../../utils/arraysUtils'

const CartHeader = memo(function CartHeader({ cartItems, selected, setSelected }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    let check = compareArrays(cartItems.products, selected)
    setActive(check)
  }, [selected])

  const handleSelect = () => {
    if (selected.length !== cartItems.products.length) {
      setSelected(cartItems.products)
    } else {
      setSelected([])
    }
  }

  return (
    <div className={`${styles.cart__header} ${styles.card}`}>
      <h1>Item Summary ({cartItems.products.length})</h1>
      <div className={styles.flex}>
        <div 
          className={`${styles.checkbox} ${active && styles.active}`} 
          onClick={() => handleSelect()}
        >
        </div>
        <span>Select all items</span>
      </div>
    </div>
  )
})

export default CartHeader