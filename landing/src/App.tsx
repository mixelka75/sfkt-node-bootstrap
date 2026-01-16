import { useState } from 'react'
import { CONFIG } from './config'
import './App.css'

function App() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.VLESS_KEY)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const openDeepLink = () => {
    const encodedKey = encodeURIComponent(CONFIG.VLESS_KEY)
    window.location.href = `v2raytun://import/${encodedKey}`
  }

  return (
    <div className="landing">
      {/* Animated Background */}
      <div className="landing-bg">
        <div className="landing-bg-gradient"></div>
        <div className="landing-bg-grid"></div>
        <div className="landing-bg-glow glow-1"></div>
        <div className="landing-bg-glow glow-2"></div>
        <div className="landing-bg-glow glow-3"></div>
      </div>

      <div className="landing-content">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <img src="/sfktlogo.png" alt="SafeKitty" className="logo-img" />
            <span className="logo-text">SafeKitty</span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-badge">
            <span>FREE</span>
          </div>
          <h1 className="hero-title">VPN для Telegram</h1>
          <p className="hero-subtitle">
            Бесплатный доступ к Telegram без регистрации и ограничений по времени
          </p>
        </section>

        {/* Warning */}
        <div className="warning-card">
          <div className="warning-header">
            <span className="warning-icon">!</span>
            <span className="warning-title">Только для Telegram</span>
          </div>
          <p className="warning-text">
            Этот сервер предназначен <strong>исключительно</strong> для доступа к Telegram.
            Развлекательные сервисы заблокированы:
          </p>
          <div className="blocked-list">
            <span className="blocked-item">YouTube</span>
            <span className="blocked-item">Instagram</span>
            <span className="blocked-item">TikTok</span>
            <span className="blocked-item">Discord</span>
            <span className="blocked-item">Twitch</span>
          </div>
        </div>

        {/* Download Section */}
        <section className="section">
          <h2 className="section-title">
            <span className="section-number">1</span>
            Скачайте V2RayTun
          </h2>
          <div className="download-grid">
            <a href={CONFIG.DOWNLOAD_LINKS.android} target="_blank" rel="noopener noreferrer" className="download-btn">
              <span className="download-icon">Android</span>
              <span className="download-label">Android</span>
              <span className="download-store">Google Play</span>
            </a>
            <a href={CONFIG.DOWNLOAD_LINKS.ios} target="_blank" rel="noopener noreferrer" className="download-btn">
              <span className="download-icon">iPhone</span>
              <span className="download-label">iOS</span>
              <span className="download-store">App Store</span>
            </a>
            <a href={CONFIG.DOWNLOAD_LINKS.windows} target="_blank" rel="noopener noreferrer" className="download-btn">
              <span className="download-icon">Win</span>
              <span className="download-label">Windows</span>
              <span className="download-store">Скачать</span>
            </a>
          </div>
        </section>

        {/* Connect Section */}
        <section className="section">
          <h2 className="section-title">
            <span className="section-number">2</span>
            Добавьте сервер
          </h2>

          <div className="connect-grid">
            {/* Auto */}
            <div className="connect-card">
              <h3>Автоматически</h3>
              <p>Если V2RayTun уже установлен:</p>
              <button onClick={openDeepLink} className="deeplink-btn">
                Добавить сервер
              </button>
            </div>

            {/* Manual */}
            <div className="connect-card">
              <h3>Вручную</h3>
              <ol className="manual-steps">
                <li>
                  <span className="step-number">1</span>
                  <span>Скопируйте ключ ниже</span>
                </li>
                <li>
                  <span className="step-number">2</span>
                  <span>Откройте V2RayTun</span>
                </li>
                <li>
                  <span className="step-number">3</span>
                  <span><strong>+</strong> → <strong>Импорт из буфера</strong></span>
                </li>
                <li>
                  <span className="step-number">4</span>
                  <span>Подключитесь</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Key */}
          <div className="key-card">
            <p className="key-label">Ключ подключения:</p>
            <div className="key-container">
              <code className="key-text">{CONFIG.VLESS_KEY}</code>
            </div>
            <button onClick={copyToClipboard} className={`copy-btn ${copied ? 'copied' : ''}`}>
              {copied ? 'Скопировано!' : 'Копировать ключ'}
            </button>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-card">
          <h2 className="cta-title">Нужен полный VPN?</h2>
          <p className="cta-text">
            Получите доступ ко всем сайтам без ограничений
          </p>
          <a href={CONFIG.BOT_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
            Открыть {CONFIG.BOT_USERNAME}
          </a>
          <div className="cta-steps">
            <ol>
              <li>Подключитесь к этому серверу</li>
              <li>Откройте Telegram</li>
              <li>Перейдите в бот <a href={CONFIG.BOT_URL}>{CONFIG.BOT_USERNAME}</a></li>
              <li>Получите полноценный VPN</li>
            </ol>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>SafeKitty VPN</p>
          <p className="footer-note">Бесплатный сервер для обхода блокировок Telegram</p>
        </footer>
      </div>
    </div>
  )
}

export default App
