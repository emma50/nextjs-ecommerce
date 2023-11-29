import Link from 'next/link'
import styles from './header.module.scss'

export default function UserMenu() {
  return (
    <div className={styles.menu} style={{zIndex: '99999'}}>
      <h4>Welcome to Shopps!</h4>
      <div className={styles.flex}>
        <button className={styles.btn_primary}>Register</button>
        <button
          className={styles.btn_outlined}
          onClick={() => console.log('Clicked')}
        >
          Login
        </button>
      </div>
      <ul>
        <li>
          <Link href={'profile'}>Account</Link>
        </li>
        <li>
          <Link href={'profile/orders'}>Orders</Link>
        </li>
        <li>
          <Link href={'profile/messages'}>Message center</Link>
        </li>
        <li>
          <Link href={'profile/address'}>Address</Link>
        </li>
        <li>
          <Link href={'profile/wishlist'}>Wishlist</Link>
        </li>
      </ul>
    </div>
  )
}
