
import React, { useEffect, useMemo, useState } from 'react'

const PREDEFINED = [
    { id: 'ew1', title: 'E-Waste Basics', topic: 'Electronic Waste Recycling', difficulty: 'Easy', count: 10, audience: 'General Public' },
    { id: 'ew2', title: 'Sustainable Disposal', topic: 'Sustainable Disposal', difficulty: 'Medium', count: 12, audience: 'Students' },
    { id: 'ew3', title: 'Regulations & Laws', topic: 'E-Waste Regulations', difficulty: 'Hard', count: 15, audience: 'Professionals' },
    { id: 'ew4', title: 'Environmental Impact', topic: 'Environmental Impact of Electronics', difficulty: 'Medium', count: 8, audience: 'Educators' },
]

// Read backend base URL from Vite env. Example: VITE_BACKEND_URL=http://localhost:3000
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

function formatDate(iso) {
    try {
        return new Date(iso).toLocaleString()
    } catch {
        return iso
    }
}

export default function Dashboard({ onNavigate } = {}) {
    const displayName = 'User'

    // Tabs: 'generate' | 'predefined' | 'history'
    const [tab, setTab] = useState('generate')

    // Form for Generate New Quiz
    const [topic, setTopic] = useState('')
    const [count, setCount] = useState(10)
    const [difficulty, setDifficulty] = useState('Medium')
    const [audience, setAudience] = useState('')
    const [creating, setCreating] = useState(false)
    const [createError, setCreateError] = useState(null)
    const [loadingMessage, setLoadingMessage] = useState('')
    const [loadingTip, setLoadingTip] = useState('')
    const [loadingStep, setLoadingStep] = useState(0)

    // History disabled as no auth
    const [history, setHistory] = useState([])
    const [historyLoading, setHistoryLoading] = useState(false)
    const [historyError, setHistoryError] = useState(null)

    // Dynamic loading tips
    const loadingTips = [
        "♻️ Recycling electronics reduces environmental harm!",
        "🌍 E-waste education helps build a sustainable future!",
        "🔋 Proper battery disposal prevents pollution!",
        "📚 Learning about e-waste empowers responsible consumption!",
        "🌱 Every recycled device contributes to a greener planet!",
        "⚡ Sustainable tech choices make a difference!",
        "♻️ E-waste awareness saves lives and resources!",
    ]

    // Cycle through loading tips
    useEffect(() => {
        if (creating) {
            const randomTip = loadingTips[Math.floor(Math.random() * loadingTips.length)]
            setLoadingTip(randomTip)
            
            const tipInterval = setInterval(() => {
                const newTip = loadingTips[Math.floor(Math.random() * loadingTips.length)]
                setLoadingTip(newTip)
            }, 3000) // Change tip every 3 seconds

            return () => clearInterval(tipInterval)
        }
    }, [creating])

    // Generic POST to /api/quizzes - returns { quizId, questions }
    async function createQuizApi(payload) {
        setCreateError(null)
        setCreating(true)
        setLoadingStep(0)
        setLoadingMessage('♻️ Initializing e-waste quiz creation...')
        
        try {
            // No auth, so no token or userId
            
            // Simulate progressive loading
            setTimeout(() => setLoadingMessage('🌍 Connecting to eco-friendly AI engine...'), 300)
            setLoadingStep(1)
            
            setTimeout(() => setLoadingMessage('🔋 Crafting sustainable questions...'), 800)
            setLoadingStep(2)
            
            // Include userId as guest or something, but since no auth, perhaps omit
            const requestBody = { ...payload }
            
            const res = await fetch(`${BACKEND_URL}/api/quizzes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })

            if (!res.ok) {
                const body = await res.text().catch(() => null)
                throw new Error(body || `Failed to create quiz (${res.status})`)
            }

            setLoadingMessage('� Quiz ready! Preparing your eco-learning experience...')
            setLoadingStep(3)
            const data = await res.json()
            return data
        } catch (err) {
            setCreateError(err?.message || 'Unknown error')
            setLoadingMessage('')
            setLoadingStep(0)
            throw err
        } finally {
            // Don't set creating to false here - let it show while navigating
            // setCreating(false)
        }
    }

    // Handler for Create Quiz (Generate New Quiz tab)
    const handleCreate = async (e) => {
        e?.preventDefault?.()
        setCreateError(null)
        if (!topic?.trim()) {
            setCreateError('Please enter a topic.')
            return
        }
        const payload = {
            topic: topic.trim(),
            count: Number(count) || 10,
            difficulty,
            audience: audience?.trim() || '',
        }

        try {
            const { quizId, questions } = await createQuizApi(payload)
            // navigate to quiz route, pass questions in state so quiz component can use them
            if (typeof onNavigate === 'function') {
                onNavigate(`/quiz/${quizId}`, { state: { questions } })
            } else {
                // fallback: update history and dispatch popstate so SPA can pick it up
                window.history.pushState({ questions }, '', `/quiz/${quizId}`)
                window.dispatchEvent(new PopStateEvent('popstate'))
            }
        } catch (err) {
            // error state already set in createQuizApi
            console.error('Create quiz failed', err)
            setCreating(false)
        }
    }

    // Start a predefined quiz (generate server-side then navigate)
    const startPredefined = async (preset) => {
        setCreateError(null)
        try {
            const payload = {
                topic: preset.topic,
                count: preset.count,
                difficulty: preset.difficulty,
                audience: preset.audience,
            }
            const { quizId, questions } = await createQuizApi(payload)
            if (typeof onNavigate === 'function') {
                onNavigate(`/quiz/${quizId}`, { state: { questions } })
            } else {
                window.history.pushState({ questions }, '', `/quiz/${quizId}`)
                window.dispatchEvent(new PopStateEvent('popstate'))
            }
        } catch (err) {
            console.error('Start predefined failed', err)
            setCreating(false)
        }
    }

    // History fetching removed as no auth

    // Retake a quiz from history (triggers generation using the same topic/difficulty)
    const handleRetake = async (item) => {
        if (!item) return
        try {
            const payload = { topic: item.topic, count: item.questionCount || 10, difficulty: item.difficulty || 'Medium', audience: item.audience || '' }
            const { quizId, questions } = await createQuizApi(payload)
            if (typeof onNavigate === 'function') {
                onNavigate(`/quiz/${quizId}`, { state: { questions } })
            } else {
                window.history.pushState({ questions }, '', `/quiz/${quizId}`)
                window.dispatchEvent(new PopStateEvent('popstate'))
            }
        } catch (err) {
            // handled by createQuizApi
            setCreating(false)
        }
    }

    return (
    <div className="min-h-screen bg-gray-50 fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header / Welcome */}
            <div className="bg-white rounded-2xl shadow-lg p-10 mb-8 border border-gray-200 hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1">
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">
                            Welcome to E-Waste EduQuiz{displayName ? `, ${displayName}` : ''}! ♻️
                        </h2>
                        <p className="text-gray-600 text-lg">Create quizzes, try predefined sets, and review your history.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* User info removed as no auth */}
                    </div>
                </div>
            </div>                {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 sticky top-4 z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl shadow-inner">
                        <button 
                            onClick={() => setTab('generate')} 
                            className={`${tab === 'generate' ? 'bg-white text-gray-900 shadow-lg' : 'text-gray-600 hover:text-gray-900'} px-4 py-2 rounded-lg transition-all duration-300 font-medium`}
                        >
                            <span className="text-lg">✨</span> Generate Quiz
                        </button>
                        <button 
                            onClick={() => setTab('predefined')} 
                            className={`${tab === 'predefined' ? 'bg-white text-gray-900 shadow-lg' : 'text-gray-600 hover:text-gray-900'} px-4 py-2 rounded-lg transition-all duration-300 font-medium`}
                        >
                            <span className="text-lg">📚</span> Predefined
                        </button>
                        {/* <button 
                            onClick={() => setTab('history')} 
                            className={`${tab === 'history' ? 'bg-white text-gray-900 shadow-lg' : 'text-gray-600 hover:text-gray-900'} px-4 py-2 rounded-lg transition-all duration-300 font-medium`}
                        >
                            <span className="text-lg">📊</span> History
                        </button> */}
                    </div>

                        {/* <div className="flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 px-4 py-2.5 rounded-full border-2 border-green-200 shadow-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm"></span>
                            Authenticated via Clerk
                        </div> */}
                    </div>
                </div>

                {/* Tab content */}
                <div className="grid  gap-8">
                    {/* Main column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Generate New Quiz */}
                        {tab === 'generate' && (
                            <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-200 hover:shadow-xl transition-all duration-500 scale-in">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl">
                                        ✨
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">Generate a New Quiz</h3>
                                        <p className="text-sm text-gray-600">Create a custom quiz tailored to your needs</p>
                                    </div>
                                </div>

                                <form onSubmit={handleCreate} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                <span className="text-lg">📝</span> Topic
                                            </label>
                                            <input
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm shadow-sm"
                                                value={topic}
                                                onChange={(e) => setTopic(e.target.value)}
                                                placeholder="e.g., E-Waste Recycling, Battery Disposal"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                <span className="text-lg">🔢</span> Number of Questions
                                            </label>
                                            <select 
                                                value={count} 
                                                onChange={(e) => setCount(Number(e.target.value))} 
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm shadow-sm"
                                            >
                                                <option value={5}>5 Questions</option>
                                                <option value={8}>8 Questions</option>
                                                <option value={10}>10 Questions</option>
                                                <option value={15}>15 Questions</option>
                                                <option value={20}>20 Questions</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                <span className="text-lg">⚡</span> Difficulty Level
                                            </label>
                                            <select 
                                                value={difficulty} 
                                                onChange={(e) => setDifficulty(e.target.value)} 
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm shadow-sm"
                                            >
                                                <option>Easy</option>
                                                <option>Medium</option>
                                                <option>Hard</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                <span className="text-lg">👥</span> Target Audience
                                            </label>
                                            <input 
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm shadow-sm" 
                                                value={audience} 
                                                onChange={(e) => setAudience(e.target.value)} 
                                                placeholder="e.g., High School Students" 
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 border-t-2 border-gray-200">
                                        <button
                                            type="submit"
                                            disabled={creating}
                                            className={`bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg ${creating ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'} transition-all duration-300`}
                                        >
                                            {creating ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Creating Quiz...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <span className="text-xl">🚀</span>
                                                    Create Quiz
                                                </span>
                                            )}
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => { setTopic(''); setCount(10); setDifficulty('Medium'); setAudience('') }} 
                                            className="bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200"
                                        >
                                            <span className="flex items-center gap-2">
                                                <span className="text-xl">🔄</span>
                                                Reset
                                            </span>
                                        </button>
                                        {createError && (
                                            <div className="flex items-center gap-2 text-sm font-semibold text-red-700 bg-red-50 px-5 py-3 rounded-xl border-2 border-red-200 shadow-sm animate-pulse">
                                                <span className="text-lg">⚠️</span>
                                                {createError}
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Predefined Quizzes */}
                        {tab === 'predefined' && (
                            <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-200 hover:shadow-xl transition-all duration-500 scale-in">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl">
                                        📚
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">Predefined Quizzes</h3>
                                        <p className="text-sm text-gray-600">Start quickly with curated topics</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                                    {PREDEFINED.map((p, idx) => (
                                        <div 
                                            key={p.id} 
                                            className="group bg-white border border-gray-200 hover:border-green-300 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer rounded-xl p-6"
                                            style={{ animationDelay: `${idx * 100}ms` }}
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="font-bold text-xl text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                                                        {p.title}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-700 mb-3 flex-wrap">
                                                        <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full font-bold shadow-sm">
                                                            {p.count} questions
                                                        </span>
                                                        <span className={`px-4 py-1.5 rounded-full font-bold shadow-sm ${
                                                            p.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                                            p.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                        }`}>
                                                            {p.difficulty}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-gray-600 flex items-center gap-2 font-medium">
                                                        <span className="text-lg">👥</span>
                                                        {p.audience}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 mt-5">
                                                <button 
                                                    onClick={() => startPredefined(p)} 
                                                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl shadow-md hover:shadow-lg font-semibold"
                                                >
                                                    <span className="text-lg">🚀</span> Start Quiz
                                                </button>
                                                <button 
                                                    onClick={() => { 
                                                        setTopic(p.topic); 
                                                        setCount(p.count); 
                                                        setDifficulty(p.difficulty); 
                                                        setAudience(p.audience); 
                                                        setTab('generate') 
                                                    }} 
                                                    className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 hover:scale-105 transition-all duration-200 shadow-sm"
                                                >
                                                    ✏️
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* My Quiz History content is shown in right column, but we also show a summary here */}
                        {tab === 'history' && (
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                                        📊
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">My Generated Quizzes</h3>
                                        <p className="text-sm text-gray-600">Quizzes you've created previously</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    {historyLoading ? (
                                        <div className="flex flex-col items-center justify-center py-12">
                                            <svg className="animate-spin h-12 w-12 text-primary mb-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <div className="text-sm text-muted-foreground">Loading your quiz history...</div>
                                        </div>
                                    ) : historyError ? (
                                        <div className="flex flex-col items-center justify-center py-12 bg-red-50 rounded-xl border-2 border-red-200">
                                            <span className="text-4xl mb-3">⚠️</span>
                                            <div className="text-sm font-medium text-red-600">Error: {historyError}</div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-12 bg-muted rounded-xl border-2 border-dashed border-border">
                                            <span className="text-6xl mb-4">♻️</span>
                                            <div className="text-lg font-semibold text-foreground mb-2">No quizzes yet</div>
                                            <div className="text-sm text-muted-foreground mb-4">Create your first e-waste quiz to get started!</div>
                                            <button 
                                                onClick={() => setTab('generate')} 
                                                className="btn"
                                            >
                                                🌱 Create Quiz
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right column: History / Quick actions */}
                    {/* <aside className="space-y-6">
                        <div className="bg-green-500 p-6 rounded-2xl shadow-lg text-white">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-sm font-medium opacity-90">Total Quizzes</div>
                                    <div className="text-4xl font-bold mt-2">{history ? history.length : '0'}</div>
                                </div>
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm">
                                    ♻️
                                </div>
                            </div>
                            <button 
                                onClick={() => setTab('generate')} 
                                className="bg-white text-green-600 w-full px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                🌱 Create New Quiz
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <span>🌍</span>
                                    Recent Activity
                                </h4>
                                <button
                                    onClick={() => {
                                        setTab('history')
                                    }}
                                    className="text-xs text-green-600 font-semibold hover:text-green-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-green-50"
                                >
                                    ♻️ Refresh
                                </button>
                            </div>

                            {historyLoading ? (
                                <div className="flex items-center justify-center py-8">
                                    <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            ) : history && history.length ? (
                                <ul className="space-y-3">
                                    {history.slice(0, 4).map((h, idx) => (
                                        <li 
                                            key={h.quizId} 
                                            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
                                            style={{ animationDelay: `${idx * 100}ms` }}
                                        >
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <span className="text-xl">
                                                    {h.topic.toLowerCase().includes('science') ? '🔬' :
                                                     h.topic.toLowerCase().includes('history') ? '📚' :
                                                     h.topic.toLowerCase().includes('ai') ? '🤖' :
                                                     h.topic.toLowerCase().includes('pop') ? '🎵' : '📝'}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-semibold text-sm text-gray-900 truncate">{h.topic}</div>
                                                    <div className="text-xs text-gray-500">{formatDate(h.createdAt)}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg font-bold text-gray-900 text-sm shrink-0 ml-2">
                                                {h.questionCount}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <span className="text-4xl block mb-2">♻️</span>
                                    <div className="text-sm">No recent e-waste quizzes</div>
                                </div>
                            )}
                        </div>

                        {/* <div className="bg-foreground p-6 rounded-2xl shadow-lg text-background">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl">⚡</span>
                                <div className="font-bold text-lg">Quick Actions</div>
                            </div>
                            <div className="space-y-3">
                                <button className="w-full px-4 py-3 rounded-xl bg-background/10 hover:bg-background/20 text-sm font-medium transition-all duration-200 text-left flex items-center gap-3 backdrop-blur-sm border border-background/10">
                                    <span>📥</span>
                                    Export as CSV
                                </button>
                                <button className="w-full px-4 py-3 rounded-xl bg-background/10 hover:bg-background/20 text-sm font-medium transition-all duration-200 text-left flex items-center gap-3 backdrop-blur-sm border border-background/10">
                                    <span>📊</span>
                                    View Analytics
                                </button>
                                <button className="w-full px-4 py-3 rounded-xl bg-background/10 hover:bg-background/20 text-sm font-medium transition-all duration-200 text-left flex items-center gap-3 backdrop-blur-sm border border-background/10">
                                    <span>⚙️</span>
                                    Settings
                                </button>
                            </div>
                        </div> */}
                    {/* </aside>  */}
                </div>
            </div>

            {/* Full-screen Loading Overlay */}
            {creating && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-500">
                    <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 text-center">
                        
                        <div className="relative flex flex-col items-center">
                            {/* Simplified Animated spinner */}
                            <div className="relative w-24 h-24 mb-6">
                                {/* Outer rotating ring */}
                                <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-t-primary border-r-primary/80 border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
                                
                                {/* Center emoji with scale animation */}
                                <div className="absolute inset-0 flex items-center justify-center text-4xl animate-pulse">
                                    ✨
                                </div>
                            </div>
                            
                            {/* Loading message */}
                            <div className="min-h-[80px] flex flex-col items-center justify-center">
                                <h3 className="text-2xl font-bold text-foreground mb-2">
                                    {loadingMessage || 'Crafting Your Quiz...'}
                                </h3>
                                <p className="text-sm text-muted-foreground h-5">
                                    {loadingStep < 2 ? "Designing questions just for you" : "Finalizing your quiz"}
                                </p>
                            </div>
                            
                            {/* Progress bar with steps */}
                            <div className="w-full my-6">
                                <div className="flex justify-between mb-2 text-xs font-semibold text-muted-foreground">
                                    <span className={loadingStep >= 0 ? "text-primary" : ""}>Initialize</span>
                                    <span className={loadingStep >= 1 ? "text-primary" : ""}>Connect</span>
                                    <span className={loadingStep >= 2 ? "text-primary" : ""}>Generate</span>
                                    <span className={loadingStep >= 3 ? "text-primary" : ""}>Finalize</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2 overflow-hidden shadow-inner">
                                    <div 
                                        className="h-full bg-primary rounded-full transition-all duration-500 ease-out" 
                                        style={{ width: `${(loadingStep / 3) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            {/* Pro tip */}
                            <div className="min-h-[40px] flex items-center justify-center px-4 mt-2">
                                <p className="text-sm text-muted-foreground italic">
                                    <strong>Pro tip:</strong> Review your mistakes to learn faster!
                                </p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    )
}