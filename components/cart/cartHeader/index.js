import { useState, useEffect } from 'react'
import styles from './cartHeader.module.scss'
import { compareArrays } from '../../../utils/arraysUtils'

export default function CartHeader({ cartItems, selected, setSelected }) {
  const [active, setActive] = useState(false)
  console.log('1:-->', cartItems, '2:-->', selected, '3:-->', setSelected, 'CARTHEADER------------------->')
  useEffect(() => {
    /* let check = JSON.stringify(cartItems) === JSON.stringify(selected) */
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
}
