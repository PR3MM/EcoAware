import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

// Read backend base URL from Vite env
const BACKEND_BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_URL
  ? String(import.meta.env.VITE_BACKEND_URL).replace(/\/$/, '')
  : ''

function apiUrl(path) {
  if (!path) return path
  if (BACKEND_BASE) return `${BACKEND_BASE}${path.startsWith('/') ? path : `/${path}`}`
  return path
}

export default function Quiz({ quizId: propQuizId, questions: initialQuestions, onNavigate } = {}) {
  const location = useLocation()
  const { quizId: urlQuizId } = useParams()
  const stateQuestions = location.state?.questions
  
  // Use quizId from props, URL params, or state
  const quizId = propQuizId || urlQuizId || location.state?.quizId
  
  // No auth
  const [questions, setQuestions] = useState(initialQuestions || stateQuestions || [])
  const [loading, setLoading] = useState(!initialQuestions && !stateQuestions)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [timeLeft, setTimeLeft] = useState(null)
  const [isSampleQuiz, setIsSampleQuiz] = useState(false)
  const [actualQuizId, setActualQuizId] = useState(quizId)

  // Fetch quiz data if not provided
  useEffect(() => {
    if (!initialQuestions && !stateQuestions && quizId) {
      setLoading(true)
      setError(null)
      fetch(apiUrl(`/api/quizzes/${quizId}`))
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch quiz: ${res.status} ${res.statusText}`)
          }
          return res.json()
        })
        .then((data) => {
          if (!data.questions || data.questions.length === 0) {
            throw new Error('No questions found in quiz data')
          }
          setQuestions(data.questions)
          setIsSampleQuiz(data.isSample || false)
          // If it's a sample quiz, store the actual quiz ID returned from backend
          if (data.quizId) {
            setActualQuizId(data.quizId)
          }
          setLoading(false)
        })
        .catch((err) => {
          console.error('Error fetching quiz:', err)
          setError(err.message || 'Failed to load quiz questions')
          setLoading(false)
        })
    }
  }, [quizId, initialQuestions, stateQuestions])

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const selectedAnswer = answers[currentIndex]

  // Timer (optional, 30 seconds per question)
  useEffect(() => {
    if (submitted || !currentQuestion) return
    setTimeLeft(30)
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer)
          // Auto-advance or handle timeout
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [currentIndex, submitted, currentQuestion])

  const handleAnswerSelect = (optionId) => {
    setAnswers({ ...answers, [currentIndex]: optionId })
  }

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      // No auth, use guest
      const userId = 'guest'

      // Build submission payload - backend expects { [questionId]: selectedOptionId }
      const answersPayload = {}
      questions.forEach((q, idx) => {
        if (answers[idx] !== undefined) {
          answersPayload[q._id] = answers[idx]
        }
      })

      const res = await fetch(apiUrl(`/api/quizzes/${actualQuizId}/submit`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, answers: answersPayload }),
      })

      if (res.ok) {
        const data = await res.json()
        setResult(data)
        setSubmitted(true)
      } else {
        alert('Failed to submit quiz')
      }
    } catch (err) {
      console.error('Submit error:', err)
      alert('Error submitting quiz')
    } finally {
      setSubmitting(false)
    }
  }

  if (!quizId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quiz not found</h2>
          <p className="text-sm text-gray-600 mt-2">Unable to load quiz questions.</p>
          <button onClick={() => onNavigate?.('dashboard')} className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow border border-gray-200 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold text-gray-900">Loading quiz...</h2>
        </div>
      </div>
    )
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quiz not found</h2>
          <p className="text-sm text-gray-600 mt-2">
            {error || 'Unable to load quiz questions. Please check your connection and try again.'}
          </p>
          <div className="mt-4 space-y-2">
            <button onClick={() => onNavigate?.('dashboard')} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors mr-2">
              Back to Dashboard
            </button>
            <button onClick={() => window.location.reload()} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (submitted && result) {
    const score = result.score || 0
    const total = result.totalQuestions || totalQuestions
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200 scale-in">
            <div className="text-7xl mb-6 animate-bounce">♻️</div>
            <h2 className="text-4xl font-bold mb-3 text-gray-900">E-Waste Quiz Completed!</h2>
            <p className="text-gray-600 text-lg mb-8">Great job on learning about sustainable e-waste practices.</p>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 mb-8 border-2 shadow-lg rounded-xl">
              <div className="text-7xl font-bold mb-3">{percentage}%</div>
              <div className="text-xl font-semibold opacity-90">
                You scored {score} out of {total}
              </div>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <button onClick={() => onNavigate?.(isSampleQuiz ? 'home' : 'dashboard')} className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-300 transition-colors text-lg">
                ← {isSampleQuiz ? 'Home' : 'Dashboard'}
              </button>
              <button onClick={() => window.location.reload()} className="bg-green-500 text-white px-8 py-3 rounded-xl hover:bg-green-600 transition-colors text-lg">
                ♻️ Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white p-5 rounded-2xl mb-6 flex items-center justify-between sticky top-4 z-10 shadow border border-gray-200">
          <button onClick={() => onNavigate?.(isSampleQuiz ? 'home' : 'dashboard')} className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-2">
            <span>←</span> {isSampleQuiz ? 'Home' : 'Dashboard'}
          </button>
          <div className="text-sm font-semibold text-gray-900 bg-gray-100 px-4 py-2 rounded-full">
            Question {currentIndex + 1} of {totalQuestions}
          </div>
          {timeLeft !== null && (
            <div className={`text-sm font-bold px-4 py-2 rounded-full ${timeLeft < 10 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-gray-100 text-gray-900'}`}>
              ⏱️ {timeLeft}s
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="bg-white mb-6 p-4 border border-gray-200 rounded-xl shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">Progress</span>
            <span className="text-sm font-bold text-gray-900">{Math.round(((currentIndex + 1) / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>


          {!isSampleQuiz && (
            <div className="bg-white text-center p-12 border border-gray-200 shadow-lg rounded-xl scale-in">
              <span className="text-6xl mb-6 block">♻️</span>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">E-Waste Quiz</h3>
              <p className="text-gray-600 mb-6">Learn about sustainable e-waste practices</p>
              <button className="bg-green-500 text-white px-8 py-3 rounded-xl hover:bg-green-600 transition-colors text-lg">Start Quiz →</button>
            </div>
          )}


        {(isSampleQuiz || true) && (
          <>
            {/* Question card */}
            <div className="bg-white p-10 border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl">{isSampleQuiz && (
                <div className="mb-6 inline-block px-4 py-2 bg-gradient-to-br from-green-100 to-blue-100 rounded-full text-sm font-bold text-gray-900 border border-gray-200">
                  ✨ Sample Quiz - No login required
                </div>
              )}
              <h3 className="text-3xl font-bold mb-8 text-gray-900 leading-tight">{currentQuestion?.text}</h3>

            <div className="space-y-4">
              {currentQuestion?.options?.map((option, idx) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 group ${
                    selectedAnswer === option.id
                      ? 'border-green-500 bg-green-50 shadow-lg scale-[1.02]'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-[1.01] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                        selectedAnswer === option.id 
                          ? 'border-green-500 bg-green-500 shadow-md scale-110' 
                          : 'border-gray-400 group-hover:border-gray-600 group-hover:scale-105'
                      }`}
                    >
                      {selectedAnswer === option.id && <div className="w-3.5 h-3.5 bg-white rounded-full" />}
                    </div>
                    <div className="font-semibold text-lg text-gray-900 flex-1">{option.text}</div>
                    <div className={`text-2xl opacity-0 transition-opacity duration-300 ${selectedAnswer === option.id ? 'opacity-100' : ''}`}>
                      ✓
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between pt-8 border-t-2 border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                ← Previous
              </button>

              <div className="flex gap-2 flex-wrap justify-center">
                {Array.from({ length: totalQuestions }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-10 h-10 rounded-full text-sm font-bold transition-all duration-200 ${
                      idx === currentIndex
                        ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg scale-110'
                        : answers[idx]
                        ? 'bg-green-100 text-green-700 hover:scale-105 shadow-sm'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:scale-105'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {currentIndex === totalQuestions - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={submitting || Object.keys(answers).length === 0}
                  className="bg-green-500 text-white px-8 py-3 rounded-xl hover:bg-green-600 transition-colors text-lg shadow-lg hover:shadow-xl"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : '✓ Submit Quiz'}
                </button>
              ) : (
                <button onClick={handleNext} className="bg-green-500 text-white px-8 py-3 rounded-xl hover:bg-green-600 transition-colors text-lg shadow-lg hover:shadow-xl">
                  Next →
                </button>
              )}
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  )
}
