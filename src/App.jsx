import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Guide from './pages/Guide'
import Dashboard from './components/dashboard'
import Quiz from './components/quiz'
import './App.css'

function App() {
  const navigate = useNavigate()

  const handleNavigate = (path, state) => {
    navigate(path, { state })
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/dashboard" element={<Dashboard onNavigate={handleNavigate} />} />
          <Route path="/quiz/:quizId" element={<Quiz onNavigate={handleNavigate} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
