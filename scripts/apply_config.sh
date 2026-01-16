#!/bin/bash
set -e

echo "=========================================="
echo "Applying Xray configuration from .env"
echo "=========================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "ERROR: Please run as root"
    exit 1
fi

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
ENV_FILE="$REPO_DIR/.env"
CONFIG_FILE="/usr/local/etc/xray/config.json"

# Check if .env exists
if [ ! -f "$ENV_FILE" ]; then
    echo "ERROR: .env file not found at $ENV_FILE"
    echo "Please create .env from .env.example"
    exit 1
fi

# Source .env file
set -a
source "$ENV_FILE"
set +a

# Validate required variables
if [ -z "$REALITY_PRIVATE_KEY" ]; then
    echo "ERROR: REALITY_PRIVATE_KEY not set in .env"
    exit 1
fi

if [ -z "$REALITY_SHORT_ID" ]; then
    echo "ERROR: REALITY_SHORT_ID not set in .env"
    exit 1
fi

if [ -z "$SHARED_UUID" ]; then
    echo "ERROR: SHARED_UUID not set in .env"
    exit 1
fi

# Check if config exists
if [ ! -f "$CONFIG_FILE" ]; then
    echo "ERROR: Config file not found at $CONFIG_FILE"
    echo "Please run install_xray_host.sh first"
    exit 1
fi

# Backup current config
cp "$CONFIG_FILE" "$CONFIG_FILE.bak"

# Replace placeholders in config
echo "Updating configuration..."

# Replace PRIVATE_KEY_PLACEHOLDER
sed -i "s/PRIVATE_KEY_PLACEHOLDER/$REALITY_PRIVATE_KEY/g" "$CONFIG_FILE"

# Replace SHORT_ID_PLACEHOLDER
sed -i "s/SHORT_ID_PLACEHOLDER/$REALITY_SHORT_ID/g" "$CONFIG_FILE"

# Replace SHARED_UUID_PLACEHOLDER
sed -i "s/SHARED_UUID_PLACEHOLDER/$SHARED_UUID/g" "$CONFIG_FILE"

# Validate config
echo "Validating configuration..."
if ! xray run -test -config "$CONFIG_FILE" > /dev/null 2>&1; then
    echo "ERROR: Configuration validation failed!"
    echo "Restoring backup..."
    cp "$CONFIG_FILE.bak" "$CONFIG_FILE"
    echo "Please check your .env values"
    exit 1
fi

echo ""
echo "=========================================="
echo "Configuration applied successfully!"
echo "=========================================="
echo ""
echo "Private Key: ${REALITY_PRIVATE_KEY:0:10}..."
echo "Short ID: $REALITY_SHORT_ID"
echo "Shared UUID: $SHARED_UUID"
echo ""
echo "Next steps:"
echo "  systemctl restart xray"
echo "  systemctl status xray"
echo ""
