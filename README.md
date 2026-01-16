# SFKT Bootstrap Node

Бесплатная VPN-нода с ограниченным доступом для обхода блокировки Telegram.

## Назначение

Эта нода предназначена для пользователей, которые не могут получить доступ к Telegram без VPN.
Она позволяет подключиться к VPN без регистрации через Telegram-бот.

**Что работает:**
- Telegram (все сервисы)
- WhatsApp, Signal
- Почтовые сервисы (Gmail, Yandex, Mail.ru)
- Банки и финансы
- Новостные сайты
- Большинство обычных сайтов

**Что заблокировано:**
- YouTube, Netflix, TikTok
- Instagram, Facebook, Twitter/X
- Discord, Reddit, LinkedIn
- Spotify, SoundCloud
- ChatGPT, Claude
- Twitch
- Порно-сайты
- И другие "развлекательные" сервисы

## Архитектура

- **Xray-core**: Работает на хосте через systemd
- **Node Agent**: Работает в Docker, отправляет health checks на main server
- **Один общий UUID**: Все пользователи используют один ключ

## Требования

- Сервер с Debian 12 / Ubuntu 22.04+
- Docker и Docker Compose
- Root доступ
- Открытый порт 443
- Доступ к главному серверу SFKT

## Установка

### 1. Клонирование репозитория

```bash
mkdir -p /opt/sfkt-bootstrap
cd /opt/sfkt-bootstrap
# Скопируйте файлы из sfkt-node-bootstrap
```

### 2. Установка Xray на хост

```bash
chmod +x scripts/*.sh
sudo ./scripts/install_xray_host.sh
```

### 3. Генерация ключей

```bash
./scripts/generate_reality_keys.sh
```

Сохраните вывод - вам понадобятся:
- Private Key
- Public Key
- Short ID
- Shared UUID

### 4. Настройка .env

```bash
cp .env.example .env
nano .env
```

Заполните:
```bash
NODE_NAME=Бесплатный сервер (ТОЛЬКО ТГ)
NODE_HOSTNAME=free.yourserver.com
NODE_IP=1.2.3.4
NODE_PORT=443

REALITY_PRIVATE_KEY=<из шага 3>
REALITY_PUBLIC_KEY=<из шага 3>
REALITY_SHORT_ID=<из шага 3>
SHARED_UUID=<из шага 3>

MAIN_SERVER_URL=https://sfkt.mxl.wtf
NODE_API_KEY=<NODE_API_SECRET с главного сервера>
```

### 5. Применение конфигурации

```bash
sudo ./scripts/apply_config.sh
```

### 6. Запуск Xray

```bash
sudo systemctl start xray
sudo systemctl enable xray
sudo systemctl status xray
```

### 7. Запуск Node Agent (для мониторинга)

```bash
docker network create sfkt_network 2>/dev/null || true
docker compose up -d --build
```

### 8. Проверка

```bash
# Статус Xray
sudo systemctl status xray

# Логи Xray
sudo journalctl -u xray -f

# Статус Node Agent
docker compose logs -f
```

## Получение VLESS-ссылки

После настройки, сгенерируйте ссылку для клиентов:

```bash
# Загрузите переменные
source .env

# Сгенерируйте ссылку
echo "vless://${SHARED_UUID}@${NODE_HOSTNAME}:${NODE_PORT}?type=xhttp&security=reality&sni=${NODE_SNI}&fp=chrome&pbk=${REALITY_PUBLIC_KEY}&sid=${REALITY_SHORT_ID}&path=/sfkt-free#${NODE_NAME// /%20}"
```

Эту ссылку можно:
- Опубликовать на сайте
- Отправить по email
- Распространять через QR-код

## Управление

### Xray (на хосте)

```bash
# Запуск
sudo systemctl start xray

# Остановка
sudo systemctl stop xray

# Перезапуск
sudo systemctl restart xray

# Статус
sudo systemctl status xray

# Логи
sudo journalctl -u xray -f
```

### Node Agent (Docker)

```bash
# Логи
docker compose logs -f

# Перезапуск
docker compose restart

# Остановка
docker compose down

# Запуск
docker compose up -d
```

## Заблокированные сервисы

Полный список заблокированных доменов находится в `config/xray_config.json` в секции `routing.rules`.

Категории:
- Видео: YouTube, Netflix, TikTok, Twitch, Vimeo
- Соцсети: Instagram, Facebook, Twitter/X, Discord, Reddit, LinkedIn, Pinterest, Snapchat
- Музыка: Spotify, SoundCloud, Apple Music
- AI: OpenAI/ChatGPT, Claude/Anthropic
- Игры: Steam, Epic Games
- Стриминг: Amazon Prime, Disney+, HBO Max, Hulu
- Adult: основные порно-сайты

## Безопасность

1. Храните `.env` в безопасности
2. Не коммитьте `.env` в git
3. Используйте сильный `NODE_API_KEY`
4. Регулярно обновляйте Xray

## Мониторинг

Node Agent отправляет health checks на главный сервер каждые 60 секунд.
Отслеживаются:
- CPU usage
- Memory usage
- Доступность сервера

## Troubleshooting

### Xray не запускается

```bash
# Проверьте конфигурацию
sudo xray run -test -config /usr/local/etc/xray/config.json

# Проверьте логи
sudo journalctl -u xray -n 50
```

### Node Agent не регистрируется

```bash
# Проверьте доступность сервера
curl https://sfkt.mxl.wtf/api/health

# Проверьте NODE_API_KEY
docker compose exec node-agent env | grep NODE_API_KEY
```

### VPN не подключается

```bash
# Проверьте порт
sudo ss -tulpn | grep 443

# Проверьте firewall
sudo ufw status
```
