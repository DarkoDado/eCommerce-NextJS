import styles from './styles.module.scss'

function IconBtn({type, text, icon}) {
  return (
    <button className={styles.button} type={type}>{text}</button>
  )
}

export default IconBtn