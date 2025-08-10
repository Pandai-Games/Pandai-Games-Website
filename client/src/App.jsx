import { useState } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [email, setEmail] = useState('')
  const [subscriptionStatus, setSubscriptionStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleNotificationSignup = async () => {
    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
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
          <div className="content-section">
            <h1>Welcome to Pandai Games</h1>
            <p>Your ultimate destination for gaming entertainment</p>
            <div className="hero-content">
              <h2>Featured Games</h2>
              <div className="game-grid">
                <div className="game-card">
                  <h3>Flash Games</h3>
                  <p>Classic browser games</p>
                </div>
                <div className="game-card">
                  <h3>Web Games</h3>
                  <p>Modern HTML5 games</p>
                </div>
                <div className="game-card">
                  <h3>Coming Soon</h3>
                  <p>More games on the way</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'games':
        return (
          <div className="content-section">
            <h1>Games</h1>
            <div className="coming-soon-container">
              <div className="coming-soon-icon">
                🎮
              </div>
              <h2>More Games Coming Soon!</h2>
              <p>We're hard at work developing exciting new games for your entertainment. Our team is crafting unique experiences that will captivate and delight players of all ages.</p>
              
              <div className="progress-indicator">
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <span className="progress-text">Development in Progress...</span>
              </div>
              
              <div className="preview-cards">
                <div className="preview-card">
                  <h3>🎯 Action Adventures</h3>
                  <p>Fast-paced games with engaging storylines</p>
                </div>
                <div className="preview-card">
                  <h3>🧩 Puzzle Challenges</h3>
                  <p>Mind-bending puzzles to test your skills</p>
                </div>
                <div className="preview-card">
                  <h3>🏆 Competitive Games</h3>
                  <p>Multiplayer experiences for friendly competition</p>
                </div>
              </div>
              
              <div className="notify-section">
                <p>Want to be notified when new games launch?</p>
                <div className="email-signup">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email-input"
                    disabled={isLoading}
                  />
                  <button 
                    className="notify-button"
                    onClick={handleNotificationSignup}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Subscribing...' : 'Stay Updated'}
                  </button>
                </div>
                {subscriptionStatus && (
                  <div className={`subscription-status ${subscriptionStatus.includes('✅') ? 'success' : 'error'}`}>
                    {subscriptionStatus}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      case 'about':
        return (
          <div className="content-section">
            <h1>About Pandai Games</h1>
            <div className="about-intro">
              <p>Welcome to Pandai Games, where imagination meets innovation. We're not just a gaming platform—we're a community dedicated to bringing exceptional interactive experiences to players around the world.</p>
            </div>
            
            <div className="mission-section">
              <h2>Mission Statement</h2>
              <div className="mission-content">
                <p>At Pandai Games, we create focused, memorable games where compelling stories and satisfying gameplay shine. Our approach is intentional—every moment is crafted to engage, every interaction designed to feel worthwhile.</p>
                
                <p>We believe great experiences don't need to overstay their welcome. By concentrating on rich storytelling and polished mechanics, we deliver adventures that resonate long after you've finished playing—games that fit into your life, not demand from it.</p>
                
                <p>But we're more than what we make—we're who we make it for. This studio was built on imagination and opportunity: a place where undiscovered talent can flourish, where creativity outweighs credentials, and where the overlooked get seen. In an industry obsessed with prestige, we bet on potential.</p>
                
                <div className="mission-tagline">
                  <strong>Thoughtful. Engaging. Unforgettable.</strong><br />
                  <em>Powered by imagination, made for everyone.</em>
                </div>
              </div>
            </div>

            <div className="values-section">
              <h2>Our Values</h2>
              <div className="values-grid">
                <div className="value-item">
                  <h3>🎮 Player-First Design</h3>
                  <p>Every decision we make prioritizes the player experience, ensuring our games are accessible, enjoyable, and meaningful.</p>
                </div>
                <div className="value-item">
                  <h3>🌟 Quality Over Quantity</h3>
                  <p>We focus on creating polished, memorable experiences rather than flooding the market with countless titles.</p>
                </div>
                <div className="value-item">
                  <h3>🚀 Innovation & Creativity</h3>
                  <p>We push boundaries while respecting classic gaming principles, blending nostalgia with modern innovation.</p>
                </div>
                <div className="value-item">
                  <h3>🤝 Community Driven</h3>
                  <p>Our games are shaped by community feedback and designed to bring people together through shared experiences.</p>
                </div>
              </div>
            </div>

            <div className="team-section">
              <h2>Our Story</h2>
              <p>Founded in 2025, Pandai Games emerged from a passion for creating games that matter. We started with a simple belief: that great games don't need massive budgets or huge teams—they need heart, creativity, and a deep understanding of what makes interactive entertainment truly special.</p>
              
              <p>From classic flash games that defined a generation to cutting-edge web experiences that push the boundaries of browser-based gaming, we curate and create content that spans the entire spectrum of digital entertainment.</p>
              
              <p>Today, we continue to grow as a platform where both established classics and innovative new titles find their home, always with our core mission in mind: creating experiences that respect your time and reward your curiosity.</p>
            </div>
          </div>
        )
      case 'contact':
        return (
          <div className="content-section">
            <h1>Contact</h1>
            <p>Get in touch with us!</p>
            <div className="contact-info">
              <p>Email: info@pandaigames.com</p>
              <p>Follow us on social media for updates</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h2>🐼 Pandai Games</h2>
          </div>
          <nav className="nav">
            <button 
              className={activeSection === 'home' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveSection('home')}
            >
              Home
            </button>
            <button 
              className={activeSection === 'games' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveSection('games')}
            >
              Games
            </button>
            <button 
              className={activeSection === 'about' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveSection('about')}
            >
              About
            </button>
            <button 
              className={activeSection === 'contact' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveSection('contact')}
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Pandai Games. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
