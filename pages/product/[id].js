import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'
import styles from '../../styles/product.module.scss'
import Header from '../../components/header'
import Footer from '../../components/footer'
import MainSwiper from '../../components/productPage/mainSwiper'
import Info from '../../components/productPage/info'
import Reviews from '../../components/productPage/reviews'

export default function Product({ product }) {
  console.log(product, 'PRODUCTS-------------------->')
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
}

export async function getServerSideProps(context) { 
  const { query } = context
  console.log(query, 'QUERY------------------------->')
  
  let id = query.id

  const product = await axios.get(`https://fakestoreapi.com/products/${id}`)
  // console.log(id, 'ID----------------------------->')
  console.log('PROSSSSSSSSSSSSSSSSSSSS',product.data, 'PRODUCT------------------------------->')

  return {
    props: {
      // product: JSON.parse(JSON.stringify(product.data))
      product: product.data
    }
  }
}