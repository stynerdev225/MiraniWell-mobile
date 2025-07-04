#!/bin/zsh

# Get the IP address
IP=$(ipconfig getifaddr en0 2>/dev/null) || IP=$(ipconfig getifaddr en1 2>/dev/null)

if [ -z "$IP" ]; then
  echo "Could not determine your IP address. Please check your network connection."
  exit 1
fi

# Default port 
DEFAULT_PORT=3002

echo "========================================================"
echo "🌐 Starting Network-Accessible Development Server"
echo "========================================================"
echo "📱 Your application will be available at:"
echo "   http://$IP:$DEFAULT_PORT (or another port if $DEFAULT_PORT is busy)"
echo ""
echo "🔍 Watch the terminal output for the actual port number"
echo "   if port $DEFAULT_PORT is already in use."
echo "========================================================"
echo ""

# Start the development server
npm run dev:network
