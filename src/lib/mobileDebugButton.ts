// Simple mobile login test utility
import { mobileSessionFix } from "./appwrite/mobileSessionFix";

// Add this to your signin form for debugging
export const addMobileDebugButton = () => {
  if (typeof window === 'undefined') return;
  
  // Only add on mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (!isMobile) return;
  
  // Don't add if already exists
  if (document.getElementById('mobile-debug-button')) return;
  
  const button = document.createElement('button');
  button.id = 'mobile-debug-button';
  button.innerHTML = '🔧 Mobile Debug';
  button.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 10000;
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 12px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  `;
  
  button.onclick = async () => {
    try {
      console.log('🔧 Starting mobile debug test...');
      
      // Test 1: Basic mobile detection
      console.log('📱 Device Info:', {
        userAgent: navigator.userAgent,
        isMobile: isMobile,
        online: navigator.onLine,
        cookieEnabled: navigator.cookieEnabled,
        language: navigator.language,
        platform: navigator.platform,
        windowSize: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      });
      
      // Test 2: Network connectivity
      console.log('🌐 Testing network...');
      const networkStart = performance.now();
      try {
        const response = await fetch(window.location.origin + '/favicon.ico', {
          method: 'HEAD',
          cache: 'no-cache'
        });
        const networkTime = performance.now() - networkStart;
        console.log('🌐 Network test result:', {
          status: response.status,
          ok: response.ok,
          time: networkTime + 'ms'
        });
      } catch (error) {
        console.error('🌐 Network test failed:', error);
      }
      
      // Test 3: Test mobile login capabilities
      console.log('🔐 Testing mobile login capabilities...');
      const loginTestResult = await mobileSessionFix.testMobileLogin();
      console.log('🔐 Mobile login test result:', loginTestResult);
      
      // Test 4: Storage test
      console.log('💾 Testing storage...');
      try {
        localStorage.setItem('test', 'test');
        const testValue = localStorage.getItem('test');
        localStorage.removeItem('test');
        console.log('💾 LocalStorage test:', testValue === 'test' ? 'PASS' : 'FAIL');
      } catch (error) {
        console.error('💾 LocalStorage test failed:', error);
      }
      
      // Test 5: Session storage test
      try {
        sessionStorage.setItem('test', 'test');
        const testValue = sessionStorage.getItem('test');
        sessionStorage.removeItem('test');
        console.log('💾 SessionStorage test:', testValue === 'test' ? 'PASS' : 'FAIL');
      } catch (error) {
        console.error('💾 SessionStorage test failed:', error);
      }
      
      // Test 6: Touch events test
      console.log('👆 Testing touch events...');
      let touchSupported = false;
      if ('ontouchstart' in window) {
        touchSupported = true;
      } else if (navigator.maxTouchPoints > 0) {
        touchSupported = true;
      }
      console.log('👆 Touch support:', touchSupported ? 'SUPPORTED' : 'NOT SUPPORTED');
      
      alert('Mobile debug test completed! Check console for results.');
      
    } catch (error) {
      console.error('🔧 Mobile debug test failed:', error);
      alert('Mobile debug test failed! Check console for details.');
    }
  };
  
  document.body.appendChild(button);
  
  // Auto-remove after 30 seconds
  setTimeout(() => {
    if (document.getElementById('mobile-debug-button')) {
      document.body.removeChild(button);
    }
  }, 30000);
};

// Auto-add the button in development mode
if (import.meta.env.DEV) {
  // Wait for DOM to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addMobileDebugButton);
  } else {
    addMobileDebugButton();
  }
}

export default addMobileDebugButton;
