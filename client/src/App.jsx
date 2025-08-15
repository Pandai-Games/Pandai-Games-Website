import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [email, setEmail] = useState('')
  const [subscriptionStatus, setSubscriptionStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Initialize Lucide icons
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons()
    }
  }, [activeSection])

  const isValidEmail = (email) => {
    return email && 
           email.includes('@') && 
           email.includes('.') && 
           !email.startsWith('@') && 
           !email.endsWith('@') && 
           !email.endsWith('.') &&
           email.indexOf('@') > 0 &&
           email.lastIndexOf('.') > email.indexOf('@')
  }

  const handleNotificationSignup = async () => {
    if (!isValidEmail(email)) {
      setSubscriptionStatus('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    setSubscriptionStatus('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setSubscriptionStatus('✅ Successfully subscribed! We\'ll notify you when new games launch.')
        setEmail('')
      } else {
        setSubscriptionStatus(data.message || 'Subscription failed. Please try again.')
      }
    } catch (error) {
      setSubscriptionStatus('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderContent = () => {
    switch(activeSection) {
      case 'home':
        return (
          <>
            {/* Hero Section - Full width */}
            <section className="hero-bg h-screen flex items-center justify-center text-center text-white relative">
              <div className="fade-in px-4 z-10 relative">
                <h1 className="font-cinzel text-4xl sm:text-5xl md:text-7xl font-bold tracking-wider">Threads of Eenheid</h1>
                <p className="text-lg sm:text-xl md:text-2xl mt-4 max-w-2xl mx-auto">An epic text-based RPG where your choices weave the fabric of destiny.</p>
                <p className="mt-2 text-base sm:text-lg text-red-400">Let Your Quest Begin</p>
                <button 
                  onClick={() => setActiveSection('games')}
                  className="mt-8 inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-300 hover:scale-105"
                >
                  Discover the Game
                </button>
              </div>
            </section>

            {/* Welcome Section */}
            <section className="py-20 animated-gradient">
              <div className="container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto">
                  <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-gray-900 mb-6">Powered by Imagination, Made for Everyone.</h2>
                  <div className="w-24 h-1 bg-red-500 mx-auto mb-8 rounded"></div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    Welcome to Pandai Games, an indie studio with a passion for crafting unique and engaging worlds. We believe that great games come from the heart, focusing on small-scale, accessible experiences that deliver rich narratives and compelling gameplay.
                  </p>
                  <button 
                    onClick={() => setActiveSection('about')}
                    className="mt-4 inline-block bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300"
                  >
                    Learn More About Us
                  </button>
                </div>
              </div>
            </section>
          </>
        )
      case 'games':
        return (
          <main className="py-20">
            <section className="container mx-auto px-6">
              <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-center text-white mb-4">Our First Adventure</h1>
              <div className="w-24 h-1 bg-red-500 mx-auto mb-12 rounded"></div>

              <div className="max-w-5xl mx-auto h-[600px] flip-card">
                <div className="flip-card-inner shadow-2xl">
                  {/* Front of Card */}
                  <div className="flip-card-front bg-brimstone-950 flex flex-col items-center justify-center p-8 text-center border border-red-900/30">
                    <i data-lucide="shield-question" className="w-24 h-24 text-red-400 mb-6"></i>
                    <h2 className="font-cinzel text-4xl font-bold text-white mb-2">Threads of Eenheid</h2>
                    <p className="text-gray-400 text-lg">Hover to reveal your quest</p>
                  </div>
                  {/* Back of Card */}
                  <div className="flip-card-back flex flex-col bg-brimstone-950 border border-red-900/30">
                    <div className="w-full h-1/2">
                      <img src="https://www.pandaigames.com/web/image/1865-5a648ca5/ArkleitToE.png" alt="Concept art" className="object-cover w-full h-full" />
                    </div>
                    <div className="w-full h-1/2 p-6 md:p-8 flex flex-col justify-center text-center">
                      <h2 className="font-cinzel text-3xl font-bold text-white mb-2">Threads of Eenheid</h2>
                      <p className="text-red-400 font-semibold mb-4">In-Browser Text-Based RPG</p>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
                        Dive into a realm of magic, conflict, and ancient secrets. This text-based journey puts narrative first, where every decision matters.
                      </p>
                      <div className="mt-4">
                        <span className="inline-block bg-gray-700 text-red-300 text-sm font-semibold mr-2 mb-2 px-3 py-1 rounded-full">Coming Soon</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-20 bg-white mt-20">
              <div className="container mx-auto px-6 text-center">
                <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-gray-900 mb-6">More Games Coming Soon!</h2>
                <div className="w-24 h-1 bg-red-500 mx-auto mb-8 rounded"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                  We're hard at work developing exciting new games for your entertainment. Our team is crafting unique experiences that will captivate and delight players of all ages.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
                  <div className="bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <i data-lucide="swords" className="w-12 h-12 text-red-500 mb-4"></i>
                    <h3 className="font-cinzel text-xl font-bold text-gray-800 mb-2">Action Adventures</h3>
                    <p className="text-gray-600">Fast-paced games with engaging storylines.</p>
                  </div>
                  <div className="bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <i data-lucide="puzzle" className="w-12 h-12 text-red-500 mb-4"></i>
                    <h3 className="font-cinzel text-xl font-bold text-gray-800 mb-2">Puzzle Challenges</h3>
                    <p className="text-gray-600">Mind-bending puzzles to test your skills.</p>
                  </div>
                  <div className="bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <i data-lucide="users" className="w-12 h-12 text-red-500 mb-4"></i>
                    <h3 className="font-cinzel text-xl font-bold text-gray-800 mb-2">Competitive Games</h3>
                    <p className="text-gray-600">Multiplayer experiences for friendly competition.</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        )
      case 'about':
        return (
          <main className="py-20 bg-white text-gray-800">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-6">Where Imagination Meets Innovation</h1>
                <div className="w-24 h-1 bg-red-500 mx-auto mb-8 rounded"></div>
                <p className="text-lg text-gray-600 leading-relaxed mb-12">
                  Welcome to Pandai Games, where we're not just a gaming platform—we're a community dedicated to bringing exceptional interactive experiences to players around the world.
                </p>

                <div className="text-left mt-16">
                  <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-gray-800 mb-4">Mission Statement</h2>
                  <div className="bg-gray-50 p-8 rounded-lg mb-8">
                    <p className="text-gray-600 leading-relaxed mb-4">
                      At Pandai Games, we create focused, memorable games where compelling stories and satisfying gameplay shine. Our approach is intentional—every moment is crafted to engage, every interaction designed to feel worthwhile.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      We believe great experiences don't need to overstay their welcome. By concentrating on rich storytelling and polished mechanics, we deliver adventures that resonate long after you've finished playing—games that fit into your life, not demand from it.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      But we're more than what we make—we're who we make it for. This studio was built on imagination and opportunity: a place where undiscovered talent can flourish, where creativity outweighs credentials, and where the overlooked get seen. In an industry obsessed with prestige, we bet on potential.
                    </p>
                    <div className="text-center mt-6 p-4 bg-red-50 rounded-lg">
                      <strong className="text-red-700 text-lg">Thoughtful. Engaging. Unforgettable.</strong><br />
                      <em className="text-red-600">Powered by imagination, made for everyone.</em>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Our Values Section */}
              <div className="max-w-5xl mx-auto text-center mt-20">
                <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
                <div className="w-24 h-1 bg-red-500 mx-auto mb-12 rounded"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <i data-lucide="gamepad-2" className="w-16 h-16 text-red-500 mb-4 mx-auto"></i>
                    <h3 className="font-cinzel text-xl font-bold text-gray-800 mb-2">Player-First Design</h3>
                    <p className="text-gray-600">Every decision we make prioritizes the player experience, ensuring our games are accessible, enjoyable, and meaningful.</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <i data-lucide="star" className="w-16 h-16 text-red-500 mb-4 mx-auto"></i>
                    <h3 className="font-cinzel text-xl font-bold text-gray-800 mb-2">Quality Over Quantity</h3>
                    <p className="text-gray-600">We focus on creating polished, memorable experiences rather than flooding the market with countless titles.</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <i data-lucide="rocket" className="w-16 h-16 text-red-500 mb-4 mx-auto"></i>
                    <h3 className="font-cinzel text-xl font-bold text-gray-800 mb-2">Innovation & Creativity</h3>
                    <p className="text-gray-600">We push boundaries while respecting classic gaming principles, blending nostalgia with modern innovation.</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <i data-lucide="users" className="w-16 h-16 text-red-500 mb-4 mx-auto"></i>
                    <h3 className="font-cinzel text-xl font-bold text-gray-800 mb-2">Community Driven</h3>
                    <p className="text-gray-600">Our games are shaped by community feedback and designed to bring people together through shared experiences.</p>
                  </div>
                </div>

                <div className="mt-16 bg-gray-50 p-8 rounded-lg text-left">
                  <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">Our Story</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Founded in 2025, Pandai Games emerged from a passion for creating games that matter. We started with a simple belief: that great games don't need massive budgets or huge teams—they need heart, creativity, and a deep understanding of what makes interactive entertainment truly special.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    From classic flash games that defined a generation to cutting-edge web experiences that push the boundaries of browser-based gaming, we curate and create content that spans the entire spectrum of digital entertainment.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Today, we continue to grow as a platform where both established classics and innovative new titles find their home, always with our core mission in mind: creating experiences that respect your time and reward your curiosity.
                  </p>
                </div>
              </div>
            </div>
          </main>
        )
      case 'contact':
        return (
          <main className="py-20 relative z-10">
            <StarfieldCanvas />
            <section className="container mx-auto px-6 text-center">
              <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-white mb-6">Stay Updated</h1>
              <div className="w-24 h-1 bg-red-500 mx-auto mb-8 rounded"></div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                Want to be notified when new games launch? Join our mailing list! For business inquiries or to just say hello, drop us a line at our email below.
              </p>
              
              <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 mb-8">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className="w-full px-4 py-3 rounded-md bg-gray-800/70 backdrop-blur-sm text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleNotificationSignup}
                  disabled={isLoading}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105 shrink-0 disabled:opacity-70"
                >
                  {isLoading ? 'Subscribing...' : 'Stay Updated'}
                </button>
              </div>
              
              {subscriptionStatus && (
                <div className={`max-w-md mx-auto mb-4 p-3 rounded-lg ${subscriptionStatus.includes('✅') ? 'bg-red-500/20 border border-red-500/50 text-red-300' : 'bg-red-500/20 border border-red-500/50 text-red-300'}`}>
                  {subscriptionStatus}
                </div>
              )}
              
              <a href="mailto:contact@pandaigames.com" className="text-red-400 hover:text-red-300 transition-colors duration-300">
                contact@pandaigames.com
              </a>
            </section>
          </main>
        )
      default:
        return null
    }
  }

  return (
    <div className="app bg-brimstone-900 text-white min-h-screen font-inter">
      {/* Header */}
      <header className="bg-brimstone-950/95 backdrop-blur-sm sticky top-0 z-50 border-b border-red-900/30">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-cinzel text-2xl font-bold text-white z-50">
            Pandai <span className="text-red-400">Games</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setActiveSection('home')}
              style={{ backgroundColor: activeSection === 'home' ? '#b91c1c' : '#dc2626', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '8px', fontWeight: '500', transition: 'all 0.3s' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#991b1b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = activeSection === 'home' ? '#b91c1c' : '#dc2626'}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveSection('about')}
              style={{ backgroundColor: activeSection === 'about' ? '#b91c1c' : '#dc2626', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '8px', fontWeight: '500', transition: 'all 0.3s' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#991b1b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = activeSection === 'about' ? '#b91c1c' : '#dc2626'}
            >
              About
            </button>
            <button 
              onClick={() => setActiveSection('games')}
              style={{ backgroundColor: activeSection === 'games' ? '#b91c1c' : '#dc2626', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '8px', fontWeight: '500', transition: 'all 0.3s' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#991b1b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = activeSection === 'games' ? '#b91c1c' : '#dc2626'}
            >
              Games
            </button>
            <button 
              onClick={() => setActiveSection('contact')}
              style={{ backgroundColor: activeSection === 'contact' ? '#b91c1c' : '#dc2626', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '8px', fontWeight: '500', transition: 'all 0.3s' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#991b1b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = activeSection === 'contact' ? '#b91c1c' : '#dc2626'}
            >
              Contact
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none p-2 rounded-lg hover:bg-gray-800"
            >
              <i data-lucide={mobileMenuOpen ? "x" : "menu"} className="w-7 h-7"></i>
            </button>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-brimstone-950/98 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
              <button 
                onClick={() => { setActiveSection('home'); setMobileMenuOpen(false); }}
                style={{ backgroundColor: activeSection === 'home' ? '#b91c1c' : '#dc2626', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: '500', transition: 'all 0.3s', fontSize: '1.5rem' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#991b1b'}
                onMouseLeave={(e) => e.target.style.backgroundColor = activeSection === 'home' ? '#b91c1c' : '#dc2626'}
              >
                Home
              </button>
              <button 
                onClick={() => { setActiveSection('about'); setMobileMenuOpen(false); }}
                style={{ backgroundColor: activeSection === 'about' ? '#b91c1c' : '#dc2626', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: '500', transition: 'all 0.3s', fontSize: '1.5rem' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#991b1b'}
                onMouseLeave={(e) => e.target.style.backgroundColor = activeSection === 'about' ? '#b91c1c' : '#dc2626'}
              >
                About
              </button>
              <button 
                onClick={() => { setActiveSection('games'); setMobileMenuOpen(false); }}
                style={{ backgroundColor: activeSection === 'games' ? '#b91c1c' : '#dc2626', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: '500', transition: 'all 0.3s', fontSize: '1.5rem' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#991b1b'}
                onMouseLeave={(e) => e.target.style.backgroundColor = activeSection === 'games' ? '#b91c1c' : '#dc2626'}
              >
                Games
              </button>
              <button 
                onClick={() => { setActiveSection('contact'); setMobileMenuOpen(false); }}
                style={{ backgroundColor: activeSection === 'contact' ? '#b91c1c' : '#dc2626', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: '500', transition: 'all 0.3s', fontSize: '1.5rem' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#991b1b'}
                onMouseLeave={(e) => e.target.style.backgroundColor = activeSection === 'contact' ? '#b91c1c' : '#dc2626'}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className={activeSection === 'about' ? 'bg-white' : activeSection === 'contact' ? 'bg-brimstone-900' : 'bg-brimstone-900'}>
        {renderContent()}
      </div>

      {/* Footer */}
      <footer className="bg-brimstone-950 border-t border-red-900/30">
        <div className="container mx-auto px-6 py-6 text-center text-gray-500">
          <p>&copy; 2025 Pandai Games. All Rights Reserved.</p>
          <p className="text-sm mt-2">A subsidiary of <span className="font-semibold text-gray-400">Arkleit</span>.</p>
        </div>
      </footer>
    </div>
  )
}

// Starfield Canvas Component
function StarfieldCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('starfield-canvas')
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const stars = []
    const numStars = 200

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        speed: Math.random() * 0.2 + 0.1
      })
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(star => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
        ctx.fill()
      })
    }

    function updateStars() {
      stars.forEach(star => {
        star.y -= star.speed
        if (star.y < 0) {
          star.y = canvas.height
          star.x = Math.random() * canvas.width
        }
      })
    }

    function animate() {
      drawStars()
      updateStars()
      requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas id="starfield-canvas" className="fixed top-0 left-0 w-full h-full -z-10"></canvas>
}

export default App
