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
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🔐</span>
          <span className="logo-text">SafeKitty VPN</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Бесплатный VPN для Telegram</h1>
        <p className="hero-subtitle">Обход блокировок без регистрации</p>
      </section>

      {/* Warning Section */}
      <section className="warning-section">
        <div className="warning-card">
          <div className="warning-icon">⚠️</div>
          <h2 className="warning-title">Важно понимать</h2>
          <p className="warning-text">
            Этот сервер предназначен <strong>только для доступа к Telegram</strong>.
          </p>
          <p className="warning-text blocked-services">
            YouTube, Instagram, Discord, TikTok и другие развлекательные сервисы <strong>заблокированы</strong>.
          </p>
          <div className="full-vpn-info">
            <p>Для полноценного VPN без ограничений:</p>
            <ol>
              <li>Подключитесь к этому серверу</li>
              <li>Откройте Telegram</li>
              <li>Перейдите в бот <a href={CONFIG.BOT_URL} target="_blank" rel="noopener noreferrer">{CONFIG.BOT_USERNAME}</a></li>
              <li>Получите полный доступ к свободному интернету</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="download-section">
        <h2 className="section-title">Шаг 1: Скачайте V2RayTun</h2>
        <div className="download-buttons">
          <a href={CONFIG.DOWNLOAD_LINKS.android} target="_blank" rel="noopener noreferrer" className="download-btn android">
            <span className="btn-icon">📱</span>
            <span className="btn-text">
              <span className="btn-label">Android</span>
              <span className="btn-store">Google Play</span>
            </span>
          </a>
          <a href={CONFIG.DOWNLOAD_LINKS.ios} target="_blank" rel="noopener noreferrer" className="download-btn ios">
            <span className="btn-icon">🍎</span>
            <span className="btn-text">
              <span className="btn-label">iPhone/iPad</span>
              <span className="btn-store">App Store</span>
            </span>
          </a>
          <a href={CONFIG.DOWNLOAD_LINKS.windows} target="_blank" rel="noopener noreferrer" className="download-btn windows">
            <span className="btn-icon">💻</span>
            <span className="btn-text">
              <span className="btn-label">Windows</span>
              <span className="btn-store">Скачать .exe</span>
            </span>
          </a>
        </div>
      </section>

      {/* Quick Connect Section */}
      <section className="connect-section">
        <h2 className="section-title">Шаг 2: Добавьте сервер</h2>

        <div className="connect-methods">
          {/* Auto method */}
          <div className="connect-method auto">
            <h3>Автоматически</h3>
            <p>Нажмите кнопку, если V2RayTun уже установлен:</p>
            <button onClick={openDeepLink} className="deeplink-btn">
              <span className="btn-icon">⚡</span>
              Добавить в V2RayTun
            </button>
          </div>

          {/* Manual method */}
          <div className="connect-method manual">
            <h3>Вручную</h3>
            <ol className="manual-steps">
              <li>Скопируйте ключ ниже</li>
              <li>Откройте V2RayTun</li>
              <li>Нажмите <strong>+</strong> → <strong>Импорт из буфера</strong></li>
              <li>Нажмите <strong>Подключиться</strong></li>
            </ol>
          </div>
        </div>

        {/* VLESS Key */}
        <div className="key-section">
          <h3>Ключ подключения:</h3>
          <div className="key-container">
            <code className="key-text">{CONFIG.VLESS_KEY}</code>
            <button onClick={copyToClipboard} className={`copy-btn ${copied ? 'copied' : ''}`}>
              {copied ? '✓ Скопировано' : '📋 Копировать'}
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Нужен полный VPN?</h2>
          <p>
            После подключения к Telegram, получите доступ ко <strong>всем сайтам</strong> через наш бот:
          </p>
          <a href={CONFIG.BOT_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
            <span className="btn-icon">🤖</span>
            Открыть {CONFIG.BOT_USERNAME}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>SafeKitty VPN © 2024</p>
        <p className="footer-note">Этот сервер предоставляется бесплатно для обхода блокировок Telegram</p>
      </footer>
    </div>
  )
}

export default App
