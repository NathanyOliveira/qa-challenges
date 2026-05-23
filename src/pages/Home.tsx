import { Link } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>QA Challenges</h1>
        <div className={styles.divider} />
        <ul className={styles.list}>
          <li>
            <Link to="/challenge-1" className={styles.link}>
              Challenge 1 — Astrological Sign
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
