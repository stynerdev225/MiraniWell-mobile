// Development mode utility
// This file contains functions to help with development mode

// Check if we are in development mode or demo mode
// For demo purposes, we'll always use mock data since we don't have a real Appwrite setup
export const isDevelopment = import.meta.env.MODE === 'development' || 
                           import.meta.env.VITE_USE_MOCK_DATA === 'true' ||
                           !import.meta.env.VITE_APPWRITE_PROJECT_ID ||
                           import.meta.env.VITE_APPWRITE_PROJECT_ID === 'mock_project_id';

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
      banner.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">Development Mode - Using Mock Data</div>
        <div style="font-size: 12px; opacity: 0.8;">
          Test credentials: test@test.com / password<br>
          Or: demo@demo.com / demo
        </div>
      `;
      banner.style.position = 'fixed';
      banner.style.bottom = '10px';
      banner.style.left = '10px';
      banner.style.backgroundColor = 'rgba(255, 193, 7, 0.95)';
      banner.style.color = 'black';
      banner.style.padding = '10px';
      banner.style.borderRadius = '8px';
      banner.style.zIndex = '9999';
      banner.style.fontSize = '13px';
      banner.style.fontFamily = 'monospace';
      banner.style.lineHeight = '1.4';
      banner.style.maxWidth = '250px';
      banner.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
      banner.style.border = '2px solid #ffc107';
      
      document.body.appendChild(banner);
    }, 1000);
  }
}