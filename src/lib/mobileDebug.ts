// Mobile debugging utility
export const mobileDebug = {
  // Log mobile device information
  logDeviceInfo: () => {
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      online: navigator.onLine,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      hardwareConcurrency: navigator.hardwareConcurrency,
      maxTouchPoints: navigator.maxTouchPoints,
      vendor: navigator.vendor,
      connection: (navigator as any).connection,
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        pixelRatio: window.devicePixelRatio
      },
      viewport: {
        visualViewport: window.visualViewport,
        orientation: window.orientation || screen.orientation
      },
      storage: {
        localStorage: !!window.localStorage,
        sessionStorage: !!window.sessionStorage,
        indexedDB: !!window.indexedDB
      }
    };
    
    console.log('📱 Device Information:', info);
    return info;
  },

  // Check if device is mobile
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  // Check if device is iOS
  isIOS: () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  },

  // Check if device is Android
  isAndroid: () => {
    return /Android/i.test(navigator.userAgent);
  },

  // Check network connection
  checkNetworkStatus: () => {
    const connection = (navigator as any).connection;
    const status = {
      online: navigator.onLine,
      effectiveType: connection?.effectiveType || 'unknown',
      downlink: connection?.downlink || 'unknown',
      rtt: connection?.rtt || 'unknown',
      saveData: connection?.saveData || false
    };
    
    console.log('📶 Network Status:', status);
    return status;
  },

  // Monitor touch events
  monitorTouchEvents: () => {
    let touchCount = 0;
    
    const logTouch = (event: TouchEvent) => {
      touchCount++;
      console.log(`👆 Touch Event #${touchCount}:`, {
        type: event.type,
        touches: event.touches.length,
        targetTouches: event.targetTouches.length,
        changedTouches: event.changedTouches.length,
        target: event.target,
        timestamp: Date.now()
      });
    };

    document.addEventListener('touchstart', logTouch);
    document.addEventListener('touchmove', logTouch);
    document.addEventListener('touchend', logTouch);
    document.addEventListener('touchcancel', logTouch);

    return () => {
      document.removeEventListener('touchstart', logTouch);
      document.removeEventListener('touchmove', logTouch);
      document.removeEventListener('touchend', logTouch);
      document.removeEventListener('touchcancel', logTouch);
    };
  },

  // Monitor form submission issues
  monitorFormSubmissions: () => {
    let submissionCount = 0;

    const logSubmission = (event: SubmitEvent) => {
      submissionCount++;
      console.log(`📝 Form Submission #${submissionCount}:`, {
        target: event.target,
        submitter: event.submitter,
        timestamp: Date.now(),
        formData: event.target ? new FormData(event.target as HTMLFormElement) : null
      });
    };

    document.addEventListener('submit', logSubmission);

    return () => {
      document.removeEventListener('submit', logSubmission);
    };
  },

  // Monitor click vs touch events
  monitorClickEvents: () => {
    let eventCount = 0;

    const logEvent = (event: Event) => {
      eventCount++;
      console.log(`🖱️ Click Event #${eventCount}:`, {
        type: event.type,
        target: event.target,
        isTrusted: event.isTrusted,
        timestamp: Date.now(),
        detail: (event as MouseEvent).detail || 0
      });
    };

    document.addEventListener('click', logEvent);
    document.addEventListener('mousedown', logEvent);
    document.addEventListener('mouseup', logEvent);

    return () => {
      document.removeEventListener('click', logEvent);
      document.removeEventListener('mousedown', logEvent);
      document.removeEventListener('mouseup', logEvent);
    };
  },

  // Test API connectivity
  testAPIConnectivity: async (baseURL: string) => {
    const endpoints = [
      '/health',
      '/api/health',
      '/v1/health',
      '/'
    ];

    for (const endpoint of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(baseURL + endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        console.log(`🔗 API Test ${endpoint}:`, {
          status: response.status,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries())
        });

        if (response.ok) {
          return true;
        }
      } catch (error) {
        console.log(`❌ API Test ${endpoint} failed:`, error);
      }
    }

    return false;
  },

  // Performance monitoring
  monitorPerformance: () => {
    return {
      mark: (name: string) => {
        performance.mark(name);
        console.log(`⏱️ Performance Mark: ${name} at ${performance.now()}ms`);
      },
      
      measure: (name: string, startMark: string, endMark: string) => {
        try {
          performance.measure(name, startMark, endMark);
          const measure = performance.getEntriesByName(name)[0];
          console.log(`📊 Performance Measure: ${name} took ${measure.duration}ms`);
          return measure.duration;
        } catch (error) {
          console.error(`❌ Performance Measure failed:`, error);
          return null;
        }
      },

      getMetrics: () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const metrics = {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          firstPaint: 0,
          firstContentfulPaint: 0
        };

        // Get paint timings if available
        const paintTimings = performance.getEntriesByType('paint');
        paintTimings.forEach(timing => {
          if (timing.name === 'first-paint') {
            metrics.firstPaint = timing.startTime;
          } else if (timing.name === 'first-contentful-paint') {
            metrics.firstContentfulPaint = timing.startTime;
          }
        });

        console.log('🚀 Performance Metrics:', metrics);
        return metrics;
      }
    };
  }
};

// Additional mobile debugging functions
export const debugMobile = {
  // Network connectivity test
  testNetworkConnectivity: async () => {
    console.log('📱 Testing network connectivity...');
    const results = {
      online: navigator.onLine,
      connection: (navigator as any).connection,
      appwriteEndpoint: '',
      appwriteProject: '',
      envVarsStatus: {}
    };
    
    // Test Appwrite endpoint
    try {
      const response = await fetch('https://cloud.appwrite.io/v1/health');
      results.appwriteEndpoint = response.ok ? 'Connected' : 'Failed';
    } catch (error) {
      results.appwriteEndpoint = 'Network Error';
    }
    
    // Check environment variables
    results.envVarsStatus = {
      VITE_APPWRITE_URL: !!import.meta.env.VITE_APPWRITE_URL,
      VITE_APPWRITE_PROJECT_ID: !!import.meta.env.VITE_APPWRITE_PROJECT_ID,
      VITE_USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA,
      PROJECT_ID_VALUE: import.meta.env.VITE_APPWRITE_PROJECT_ID || 'NOT SET'
    };
    
    console.log('📱 Network test results:', results);
    return results;
  },
  
  // Comprehensive system info
  getSystemInfo: () => {
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      storage: {
        localStorage: !!window.localStorage,
        sessionStorage: !!window.sessionStorage,
        localStorageItems: localStorage.length,
        sessionStorageItems: sessionStorage.length
      },
      appwrite: {
        url: import.meta.env.VITE_APPWRITE_URL || 'NOT SET',
        projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || 'NOT SET',
        mockMode: import.meta.env.VITE_USE_MOCK_DATA === 'true'
      }
    };
    
    console.log('📱 System info:', info);
    return info;
  }
};

// Auto-initialize debugging in development
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Mobile Debug Mode Enabled');
  mobileDebug.logDeviceInfo();
  mobileDebug.checkNetworkStatus();
  
  // Monitor network status changes
  window.addEventListener('online', () => {
    console.log('📶 Network: ONLINE');
    mobileDebug.checkNetworkStatus();
  });
  
  window.addEventListener('offline', () => {
    console.log('📶 Network: OFFLINE');
  });
}

export default mobileDebug;
