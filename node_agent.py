#!/usr/bin/env python3
"""
Bootstrap Node Agent - Simplified agent for free Telegram-only VPN node.
Only sends health checks to main server, no user sync or traffic tracking.
"""
import asyncio
import aiohttp
import os
import psutil
import logging
from datetime import datetime
from typing import Optional

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class BootstrapNodeAgent:
    """Simplified node agent for bootstrap (free) VPN node"""

    def __init__(self):
        # Configuration from environment
        self.node_id = os.getenv('NODE_ID')
        self.main_server_url = os.getenv('MAIN_SERVER_URL', 'http://localhost:8000')
        self.api_key = os.getenv('NODE_API_KEY')
        self.health_check_interval = int(os.getenv('HEALTH_CHECK_INTERVAL', '60'))

        # Session
        self.session: Optional[aiohttp.ClientSession] = None

    async def start(self):
        """Start the bootstrap node agent"""
        logger.info("Starting Bootstrap Node Agent...")
        logger.info("This is a FREE node with limited access (Telegram only)")

        # Create aiohttp session
        self.session = aiohttp.ClientSession(
            headers={
                'X-API-Key': self.api_key,
                'Content-Type': 'application/json'
            }
        )

        # Register node if not registered
        if not self.node_id:
            await self.register_node()

        # Start background tasks (only health check)
        tasks = [
            asyncio.create_task(self.health_check_loop()),
        ]

        try:
            await asyncio.gather(*tasks)
        except KeyboardInterrupt:
            logger.info("Shutting down...")
        finally:
            await self.session.close()

    async def register_node(self):
        """Register node with main server"""
        logger.info("Registering bootstrap node with main server...")

        # Get node info
        node_info = {
            'hostname': os.getenv('NODE_HOSTNAME', 'localhost'),
            'ip_address': os.getenv('NODE_IP', '0.0.0.0'),
            'port': int(os.getenv('NODE_PORT', '443')),
            'country': os.getenv('NODE_COUNTRY', 'RU'),
            'country_code': os.getenv('NODE_COUNTRY_CODE', 'RU'),
            'city': os.getenv('NODE_CITY'),
            'name': os.getenv('NODE_NAME', 'Free Server (Telegram Only)'),
            'public_key': os.getenv('REALITY_PUBLIC_KEY'),
            'short_id': os.getenv('REALITY_SHORT_ID'),
            'sni': os.getenv('NODE_SNI', 'max.ru'),
            'api_url': 'http://node-agent:10085',
            'is_bootstrap': True,  # Mark as bootstrap node
        }

        try:
            async with self.session.post(
                f"{self.main_server_url}/api/v1/nodes/register",
                json=node_info
            ) as resp:
                if resp.status == 200:
                    data = await resp.json()
                    self.node_id = data.get('id')
                    logger.info(f"Registered as bootstrap node {self.node_id}")
                else:
                    error_text = await resp.text()
                    logger.error(f"Failed to register node: {resp.status} - {error_text}")
        except Exception as e:
            logger.error(f"Error registering node: {e}")

    async def health_check_loop(self):
        """Periodically send health check to main server"""
        logger.info(f"Starting health check loop (interval: {self.health_check_interval}s)")

        while True:
            try:
                await self.send_health_check()
                await asyncio.sleep(self.health_check_interval)
            except Exception as e:
                logger.error(f"Error in health check loop: {e}")
                await asyncio.sleep(self.health_check_interval)

    async def send_health_check(self):
        """Send health check and system stats to main server"""
        if not self.node_id:
            logger.warning("Node not registered, skipping health check")
            return

        # Get system stats
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()

        # For bootstrap node, we don't track individual users
        # Just report basic stats
        payload = {
            'node_id': self.node_id,
            'timestamp': datetime.utcnow().isoformat(),
            'cpu_usage': cpu_percent,
            'memory_usage': memory.percent,
            'active_connections': 0,  # Not tracking for bootstrap
            'is_healthy': True
        }

        try:
            async with self.session.post(
                f"{self.main_server_url}/api/v1/nodes/{self.node_id}/health",
                json=payload
            ) as resp:
                if resp.status == 200:
                    logger.debug("Health check sent successfully")
                else:
                    logger.warning(f"Failed to send health check: {resp.status}")
        except Exception as e:
            logger.error(f"Error sending health check: {e}")


async def main():
    """Main entry point"""
    agent = BootstrapNodeAgent()
    await agent.start()


if __name__ == "__main__":
    asyncio.run(main())
