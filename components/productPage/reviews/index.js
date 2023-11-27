import { useState } from 'react'
import { Rating } from '@mui/material'
import { useSession, signIn, signOut } from "next-auth/react"
import AddReview from './AddReview'
import styles from './reviews.module.scss'
import Table from './Table'

export default function Reviews({ product }) {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState(product?.reviews)

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
          {/* <div className={styles.reviews__stats_reviews}>
            {
              product.ratings.map((rating, index) => {
                return (
                  <div 
                    className={styles.reviews__stats_reviews_review} 
                    key={index}
                  >
                    <Rating
                      name='half-rating-read'
                      defaultValue={Number(`${5 - index}`)}
                      readOnly
                      style={{color: '#facf19'}}
                    />
                    <div className={styles.bar}>
                      <div 
                        className={styles.bar_inner} 
                        style={{width: `${rating.percentage}%`}}
                      >
                      </div>
                    </div>
                    <span>{rating.percentage}%</span>
                  </div>
                )
              })
            }
          </div> */}
        </div>
      </div>
    </div>
  )
}