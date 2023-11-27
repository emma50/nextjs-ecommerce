import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './productCard.module.scss'
import ProductSwiper from './ProductSwiper'

export default function ProductCard({ product }) {
  console.log(product, 'PRODUCTCARD------------------------->')
  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <Link href={`/product/${product.id}`}>
          <div>
            <ProductSwiper image={product.image}/>
          </div>
        </Link>
        <div className={styles.product__info}>
          <h1>
            {
              product.title && product.title.length > 40
              ? `${product.title.slice(0, 38)}...`
              : product.title ? product.title : ''
            }
          </h1>
          <span>
            {
              product.price.length === 1
              ? `USD${product.price.toFixed(2)}$`
              : `USD${product.price.toFixed(2)}$`
            }
          </span>
        </div>
      </div>
    </div>
  )
}
