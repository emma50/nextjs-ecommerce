import { memo } from 'react'
import styles from './header.module.scss'
import Ad from './Ad'
import Top from './Top'
import Main from './Main'

const Header = memo(function Header({country, searchHandler}) {
  return (
    <header className={styles.header}>
      <Ad/>
      <Top country={country}/>
      <Main searchHandler={searchHandler}/>
    </header>
  )
})

export default Header
