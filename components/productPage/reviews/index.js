import { useState } from 'react'
import { Rating } from '@mui/material'
import styles from './reviews.module.scss'

export default function Reviews({ product }) {
  return (
    <div className={styles.reviews}>
      <div className={styles.reviews_container}>
        <h3>Customer reviews ({product.rating.count})</h3>
        <div className={styles.reviews__stats}>
          <div className={styles.reviews__stats_overview}>
            <span>Average rating</span>
            <div className={styles.reviews__stats_overview_rating}>
              <Rating
                name='half-rating-read'
                value={product.rating.rate}
                precision={0.5}
                defaultValue={0}
                readOnly
                style={{color: '#facf19'}}
              />
              {product.rating.rate === 0 ? 'No reviews yet' : product.rating.rate}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
