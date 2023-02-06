
import NewsLetter from './NewsLetter'
import styles from './styles.module.scss'

export default function Footer() {
  let date = new Date().getFullYear()
  
    return (
    <footer className={styles.footer}>
        <NewsLetter />
        <div className={styles.container}>
            <span className={styles.copyright}>
        Copyright &copy; Darko {date}
        </span>
            
        </div>
        
    </footer>
  )
}
