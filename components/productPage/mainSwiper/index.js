import { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
// import Image from 'next/image'
import styles from './mainSwiper.module.scss'

export default function MainSwiper({ image }) {
  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__active}>
        <ReactImageMagnify {...{
          smallImage: {
            alt: 'Wristwatch by Ted Baker London',
            isFluidWidth: true,
            src: image
          },
          largeImage: {
            src: image,
            width: 1200,
            height: 1800
          },
          enlargedImageContainerDimensions: {
            width: '150%',
            height: '140%'
          }
        }} />
      </div>
    </div>
  )
}
