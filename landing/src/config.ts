export const CONFIG = {
  // ============================================
  // VLESS-ключ для бесплатного сервера
  // Замените PLACEHOLDER на реальные значения после развёртывания ноды
  // ============================================
  VLESS_KEY: "vless://PLACEHOLDER_UUID@PLACEHOLDER_HOST:443?type=xhttp&security=reality&sni=max.ru&fp=chrome&pbk=PLACEHOLDER_PUBLIC_KEY&sid=PLACEHOLDER_SHORT_ID&path=/sfkt-free#Бесплатный%20сервер%20(ТОЛЬКО%20ТГ)",

  // Telegram бот для получения полного VPN
  BOT_URL: "https://t.me/safekittyvpn_bot",
  BOT_USERNAME: "@safekittyvpn_bot",

  // Ссылки на скачивание V2RayTun
  DOWNLOAD_LINKS: {
    android: "https://play.google.com/store/apps/details?id=com.v2raytun.android",
    ios: "https://apps.apple.com/app/v2raytun/id6476628951",
    windows: "https://storage.v2raytun.com/v2RayTun_Setup.exe"
  }
};
