import Head from 'next/head'
import { memo } from 'react'
import axios from 'axios'
import styles from '../../styles/product.module.scss'
import Header from '../../components/header'
import Footer from '../../components/footer'
import MainSwiper from '../../components/productPage/mainSwiper'
import Info from '../../components/productPage/info'
import Reviews from '../../components/productPage/reviews'

const Product = memo(function Product({ product }) {
  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <Header country=''/>
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            Home / {product.category} / <span>{product.title}</span>
          </div>
          <div className={styles.product__main}>
            {/* <ProductPage/> */}
            <MainSwiper image={product.image}/>
            <Info product={product}/>
          </div>
          <Reviews product={product}/> 
        </div>
      </div>
      <Footer country=''/>
    </>
  )
})

export default Product

export async function getServerSideProps(context) { 
  const { query } = context
  
  let id = query.id

  const product = await axios.get(`https://fakestoreapi.com/products/${id}`)

  product.data.quantity = Number(id) 

  return {
    props: {
      product: product.data
    }
  }
}