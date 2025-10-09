import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-blue-50/30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 relative">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse">
              <span className="mr-2 text-lg">♻️</span>
              Sustainable E-Waste Solutions
            </div>

            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
              E-Waste Management
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mt-2">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform electronic waste into opportunity. Schedule pickups, learn proper segregation,
              and contribute to a cleaner, greener planet with our comprehensive e-waste management platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/collection"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span className="mr-2">📦</span>
                Schedule Collection
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/guide"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200"
              >
                <span className="mr-2">📚</span>
                Learn More
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span className="mr-2">🧠</span>
                Take Quiz
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl font-bold text-green-600 mb-2">50M+</div>
                <div className="text-gray-600 font-medium">Tonnes Recycled</div>
                <div className="text-sm text-gray-500 mt-1">Globally processed</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl font-bold text-green-600 mb-2">180+</div>
                <div className="text-gray-600 font-medium">Countries Active</div>
                <div className="text-sm text-gray-500 mt-1">Worldwide reach</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
                <div className="text-gray-600 font-medium">Recovery Rate</div>
                <div className="text-sm text-gray-500 mt-1">Materials recovered</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EcoAware?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform makes e-waste management effortless with cutting-edge features designed for sustainability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Doorstep Pickup</h3>
              <p className="text-gray-600 leading-relaxed">
                Convenient scheduling with real-time tracking. We come to you at your preferred time and location.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <span className="text-3xl">🔬</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Expert Segregation</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn proper e-waste categorization with our comprehensive guides and expert recommendations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Environmental Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Track your contribution to environmental conservation with detailed impact reports and certificates.
              </p>
            </div>

            <div className="text-center group md:col-span-3">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Interactive Learning</h3>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Test your knowledge with our comprehensive e-waste quizzes. Learn about sustainable disposal, regulations, and environmental impact through engaging, educational content.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 mt-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span className="mr-2">🎯</span>
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with e-waste management in just three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center relative">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Learn & Segregate</h3>
              <p className="text-gray-600 leading-relaxed">
                Use our segregation guide to properly categorize your electronic waste according to safety and recycling standards.
              </p>
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-300 to-transparent transform -translate-x-8"></div>
            </div>

            <div className="text-center relative">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Schedule Pickup</h3>
              <p className="text-gray-600 leading-relaxed">
                Book a convenient pickup time through our collection portal. Choose from multiple time slots that fit your schedule.
              </p>
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-300 to-transparent transform -translate-x-8"></div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Track & Contribute</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor your pickup in real-time and receive impact reports showing how your contribution helps the environment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">About EcoAware</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              EcoAware is committed to revolutionizing e-waste management through technology and education.
              We partner with certified recycling facilities and environmental organizations to ensure
              your electronic waste is processed responsibly, minimizing environmental impact while
              maximizing resource recovery.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium hover:bg-white/20 transition-colors duration-300">
                🌍 Eco-Friendly
              </div>
              <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium hover:bg-white/20 transition-colors duration-300">
                ⚡ Fast Pickup
              </div>
              <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium hover:bg-white/20 transition-colors duration-300">
                ✅ Certified Process
              </div>
              <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium hover:bg-white/20 transition-colors duration-300">
                📊 Impact Tracking
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              Join thousands of environmentally conscious individuals making a difference every day.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">EcoAware</div>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Making e-waste management accessible, responsible, and impactful for everyone.
            </p>
            <div className="flex justify-center space-x-6">
              <Link to="/collection" className="text-gray-400 hover:text-white transition-colors duration-300">
                Collection
              </Link>
              <Link to="/guide" className="text-gray-400 hover:text-white transition-colors duration-300">
                Guide
              </Link>
              <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-300">
                Quiz
              </Link>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Contact
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-500">
              © 2025 EcoAware. All rights reserved. | Built with ❤️ for the planet
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
