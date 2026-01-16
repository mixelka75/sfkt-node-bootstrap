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
            <img src={`${import.meta.env.BASE_URL}sfktlogo.png`} alt="SafeKitty" className="logo-img" />
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
            Бесплатный доступ к Telegram без регистрации
          </p>
        </section>

        {/* Purpose Banner */}
        <div className="purpose-banner">
          <div className="purpose-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="purpose-content">
            <h3>Зачем этот сервер?</h3>
            <p>
              Чтобы получить доступ к боту <a href={CONFIG.BOT_URL}>{CONFIG.BOT_USERNAME}</a> и
              оформить <strong>полноценный VPN</strong> для всех сайтов
            </p>
          </div>
        </div>

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
            <a href={CONFIG.DOWNLOAD_LINKS.android} target="_blank" rel="noopener noreferrer" className="download-btn android">
              <div className="download-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.341c-.5 0-.908-.406-.908-.906s.406-.906.908-.906c.5 0 .908.406.908.906s-.408.906-.908.906zm-11.046 0c-.5 0-.908-.406-.908-.906s.406-.906.908-.906c.5 0 .908.406.908.906s-.408.906-.908.906zm11.4-6.293l1.997-3.463a.416.416 0 00-.152-.567.416.416 0 00-.568.152l-2.022 3.504a12.238 12.238 0 00-5.132-1.103c-1.834 0-3.57.39-5.132 1.103L4.846 5.17a.416.416 0 00-.568-.152.416.416 0 00-.152.567l1.997 3.463C2.69 11.107.342 14.543.342 18.5h23.316c0-3.957-2.348-7.393-5.781-9.452z"/>
                </svg>
              </div>
              <span className="download-label">Android</span>
              <span className="download-store">Google Play</span>
              <span className="download-arrow">→</span>
            </a>
            <a href={CONFIG.DOWNLOAD_LINKS.ios} target="_blank" rel="noopener noreferrer" className="download-btn ios">
              <div className="download-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <span className="download-label">iPhone / iPad</span>
              <span className="download-store">App Store</span>
              <span className="download-arrow">→</span>
            </a>
            <a href={CONFIG.DOWNLOAD_LINKS.windows} target="_blank" rel="noopener noreferrer" className="download-btn windows">
              <div className="download-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                </svg>
              </div>
              <span className="download-label">Windows</span>
              <span className="download-store">Скачать .exe</span>
              <span className="download-arrow">→</span>
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
