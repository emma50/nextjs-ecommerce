import { memo } from 'react'
import Link from 'next/link'
// import Image from 'next/image'
import styles from './empty.module.scss'

const Empty = memo(function Empty() {
  return (
    <div className={styles.empty}>
      <img src={'/images/empty.png'} alt="" />
      <h1>Cart is empty</h1>
      <Link href={'/'} legacyBehavior>
        <a>
          <button
            className={`${styles.empty__btn} ${styles.empty__btn_v2}`}
          >
            SHOP NOW
          </button>
        </a>
      </Link>
    </div>
  )
})

export default Empty
