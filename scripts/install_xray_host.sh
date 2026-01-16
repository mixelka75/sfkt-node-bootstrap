#!/bin/bash
set -e

echo "=========================================="
echo "SFKT Bootstrap Node - Xray Host Installation"
echo "=========================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "ERROR: Please run as root"
    exit 1
fi

# Install Xray using official script
echo "Installing Xray-core..."
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install -u root

# Create config directory if it doesn't exist
mkdir -p /usr/local/etc/xray
mkdir -p /var/log/xray

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"

# Copy template config
if [ -f "$REPO_DIR/config/xray_config.json" ]; then
    echo "Copying config template..."
    cp "$REPO_DIR/config/xray_config.json" /usr/local/etc/xray/config.json
else
    echo "WARNING: Template config not found at $REPO_DIR/config/xray_config.json"
    echo "You'll need to create /usr/local/etc/xray/config.json manually"
fi

# Set permissions
chown -R root:root /usr/local/etc/xray
chown -R nobody:nogroup /var/log/xray
chmod 644 /usr/local/etc/xray/config.json

echo "=========================================="
echo "Xray installed successfully!"
echo "=========================================="
echo "Config file: /usr/local/etc/xray/config.json"
echo "Binary: /usr/local/bin/xray"
echo "Service: xray.service"
echo ""
echo "Next steps:"
echo "1. Run: ./scripts/generate_reality_keys.sh"
echo "2. Edit .env with your keys"
echo "3. Run: ./scripts/apply_config.sh"
echo "4. Start Xray: systemctl start xray"
echo "5. Enable autostart: systemctl enable xray"
echo "=========================================="
