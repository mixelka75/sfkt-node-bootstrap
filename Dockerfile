FROM debian:12-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    python3 \
    python3-pip \
    systemd \
    dbus \
    procps \
    util-linux \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies for node agent
# Using --break-system-packages is safe in Docker containers (isolated environment)
RUN pip3 install --no-cache-dir --break-system-packages \
    aiohttp \
    psutil

# Copy node agent
COPY node_agent.py /usr/local/bin/node_agent.py
RUN chmod +x /usr/local/bin/node_agent.py

# Health check - verify node agent is responding
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD pgrep -f node_agent.py || exit 1

# Run node agent directly
CMD ["python3", "/usr/local/bin/node_agent.py"]
