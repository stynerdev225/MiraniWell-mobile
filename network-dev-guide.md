# Network-Accessible Development Guide

This guide explains how to run your development server in a way that makes it accessible to other devices on your local network.

## What is Network-Accessible Local Development?

Network-accessible local development allows your web application to be accessible not just on the localhost (127.0.0.1) of your machine but on your machine's actual network IP address.

This is useful for:

1. Testing your application on multiple devices (phones, tablets, other computers)
2. Sharing your work-in-progress with colleagues on the same network
3. Debugging issues that are specific to certain devices

## How to Start the Network-Accessible Development Server

You have two options:

### Option 1: Use the dev:network script

```bash
npm run dev:network
```

This will start the Vite development server bound to all network interfaces (0.0.0.0). It will try to use port 3002 first, but if that port is already in use, it will automatically find an available port.

### Option 2: Use the standard dev script

```bash
npm run dev
```

With the updated vite.config.ts, this will also bind to all network interfaces and try to use port 3002 (or find an available port if 3002 is busy).

## How to Access Your Application from Other Devices

1. Find your computer's IP address on your local network:
   - On macOS: Open Terminal and run `ipconfig getifaddr en0` (for Wi-Fi) or `ipconfig getifaddr en1` (for Ethernet)
   - On Windows: Open Command Prompt and run `ipconfig`
   - On Linux: Open Terminal and run `hostname -I`

2. Note the port number from the terminal output when you start the server. Vite will display something like: "Local: `http://localhost:3002/`" where 3002 is the port.

3. On your other device (phone, tablet, another computer), open a web browser and navigate to:

   ```txt
   http://YOUR_IP_ADDRESS:PORT
   ```

   Replace YOUR_IP_ADDRESS with the IP address you found in step 1, and PORT with the port number shown in the terminal.

## Security Considerations

- This setup only exposes your development server to your local network, not the public internet.
- For additional security, make sure your local network is properly secured with a strong password.
- This setup is intended for development purposes only and should not be used for production.
