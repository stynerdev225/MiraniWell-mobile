// Development mode utility
// This file contains functions to help with development mode

// Check if we are in development mode
export const isDevelopment = import.meta.env.MODE === 'development';

// For debug purposes
export function logDevInfo(message: string, data?: any) {
  if (isDevelopment) {
    console.log(`[DEV MODE] ${message}`, data ? data : '');
  }
}

// Display a development mode banner when the app is running in development mode
export function displayDevModeBanner() {
  if (isDevelopment) {
    setTimeout(() => {
      const existingBanner = document.getElementById('dev-mode-banner');
      if (existingBanner) return;

      const banner = document.createElement('div');
      banner.id = 'dev-mode-banner';
      banner.innerText = 'Development Mode - Using Mock Data';
      banner.style.position = 'fixed';
      banner.style.bottom = '10px';
      banner.style.left = '10px';
      banner.style.backgroundColor = 'rgba(255, 193, 7, 0.9)';
      banner.style.color = 'black';
      banner.style.padding = '5px 10px';
      banner.style.borderRadius = '4px';
      banner.style.fontSize = '12px';
      banner.style.zIndex = '9999';
      banner.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
      
      document.body.appendChild(banner);
    }, 1000);
  }
}
