import styles from './styles.module.scss'

export default function NewsLetter() {
  return (
    <div className={styles.news}>
        <div className={styles.input}>
        <h3>Sign up for our NewsLetter</h3>
            <input type="text" placeholder='Email address'/>
            <button className='btn_primary'>Subscribe</button>
        </div>
    </div>
  )
}
