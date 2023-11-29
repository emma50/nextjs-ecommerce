import { useState, memo } from 'react'
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import styles from './summary.module.scss'

const Summary = memo(function Summary({ cart }) {
  const [error, setError] = useState('')
  const [order_error, setOrder_Error] = useState('')

  const router = useRouter()

  const validateCoupon = Yup.object({
    coupon: Yup.string().required('Please enter a coupon first!')
  })

  const placeOrderHandler = async () => {
   alert('Order has been placed')
  }

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        Order Summary
      </div>
      <div className={styles.coupon}>
        <Formik
          enableReinitialize
          initialValues={{ }}
          // validationSchema={validateCoupon}
          onSubmit={() => console.log('Simulate submit')}
        >
          {(formik) =>(
            <>
              <Form>
                {error && <span className={styles.error}>{error}</span>}
                <div className={styles.info}>
                  <span>
                    Total: <b>{
                      cart.reduce((acc, cur) => acc + cur.price, 0)
                    }$</b>{' '}
                  </span>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
      <button 
        className={styles.submit_btn}
        onClick={() => placeOrderHandler()}
      >
        Place Order
      </button>
      {order_error && <span className={styles.error}>{order_error}</span>}
    </div>
  )
})

export default Summary;