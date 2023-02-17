import styles from './styles.module.scss'
import  ClipLoader  from 'react-spinners/ClipLoader'

export default function LoaderSpinner({loading}) {
  return (
    <div className={styles.loader}>
        <ClipLoader color="#2f82ff" loading={loading}/>
    </div>
  )
}
