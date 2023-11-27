// import Image from 'next/image'
import styles from './products.module.scss'

export default function Products({ cart }) {
  return (
    <div className={styles.products}>
      <div className={styles.products__header}>
        <h1>Cart</h1>
        <span>
          {
            cart.length === 1
            ? '1 item'
            : `${cart.length} items`
          }
        </span>
      </div>
      <div className={styles.products__wrap}>
        {
          cart.map((product, index) => (
            <div className={styles.product} key={index}>
              <div className={styles.product__img}>
                <img src={product.image} alt="" />
                {/* <Image src={product.image} alt=''/> */}
                <div className={styles.product__info}>
                  <img src={product.image} alt="" />
                  {/* <Image src={product.color.image} alt=''/> */}
                  {/* <span>{product.size}</span> */}
                  <span>x{product.quantity}</span>
                </div>
              </div>
              <div className={styles.product__name}>
                {
                  product.title.length > 20
                  ? `${product.title.slice(0, 20)}...`
                  : product.title
                }
              </div>
              <div className={styles.product__price}>
                {product.price * (product.qty || 1)}$
              </div>
            </div>
          ))
        }
      </div>
      <div className={styles.products__total}>
        SubTotal: <b>{cart.reduce((acc, cur) => acc + cur.price, 0)}$</b>
      </div>
    </div>
  )
}
