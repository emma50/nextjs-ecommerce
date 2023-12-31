import { memo } from 'react'
import styles from './footer.module.scss'
import Links from './Links'
import Socials from './Socials'
import Newsletter from './Newsletter'
import Payment from './Payment'
import Copyright from './Copyright'

const Footer = memo(function Footer({country}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links/>
        <Socials/>
        <Newsletter/>
        <Payment/>
        <Copyright country={country}/>
      </div>
    </footer>
  )
})

export default Footer
