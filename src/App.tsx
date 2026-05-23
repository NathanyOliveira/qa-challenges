import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Challenge1 from './pages/Challenge1'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/challenge-1" element={<Challenge1 />} />
    </Routes>
  )
}
