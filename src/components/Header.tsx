import styles from './Header.module.css'
import imgLogo from '../assets/Logo.png'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={imgLogo} alt="logo" />
    </header>
  )
}