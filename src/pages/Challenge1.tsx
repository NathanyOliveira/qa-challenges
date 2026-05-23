import { useState } from 'react'
import { Link } from 'react-router-dom'
import { parseDate, getAstrologicalSign } from '../utils/astrology'
import styles from './Challenge1.module.css'

type Result =
  | { kind: 'success'; name: string; sign: string }
  | { kind: 'error'; message: string }

export default function Challenge1() {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  const canSubmit = name.trim().length > 0 && date.trim().length > 0

  function handleSubmit() {
    const parsed = parseDate(date.trim())
    if (!parsed) {
      setResult({ kind: 'error', message: 'Invalid date. Please use the format dd-mm-yyyy.' })
      return
    }
    const sign = getAstrologicalSign(parsed.day, parsed.month)
    setResult({ kind: 'success', name: name.trim(), sign })
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link to="/" className={styles.back}>← Back</Link>
        <h2 className={styles.title}>Challenge 1</h2>
        <p className={styles.subtitle}>Discover your astrological sign</p>

        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">Name</label>
            <input
              id="name"
              className={styles.input}
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => { setName(e.target.value); setResult(null) }}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="birthday">Birthday</label>
            <input
              id="birthday"
              className={styles.input}
              type="text"
              placeholder="dd-mm-yyyy"
              value={date}
              onChange={e => { setDate(e.target.value); setResult(null) }}
            />
          </div>

          <button
            className={styles.button}
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            Find Astrological Sign
          </button>
        </div>

        {result && (
          <div className={result.kind === 'success' ? styles.resultSuccess : styles.resultError}>
            {result.kind === 'success' ? (
              <p>
                <span className={styles.personName}>{result.name}</span>
                {', your astrological sign is '}
                <span className={styles.signName}>{result.sign}</span>
              </p>
            ) : (
              <p>{result.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
