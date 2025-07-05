// Utility to apply dynamic styles based on data attributes
export const applyDynamicStyles = () => {
  // Handle progress bars
  const progressBars = document.querySelectorAll('.progress-bar[data-progress-width]');
  progressBars.forEach((bar) => {
    const width = bar.getAttribute('data-progress-width');
    if (width && bar instanceof HTMLElement) {
      bar.style.width = width;
    }
  });

  // Handle chart bars
  const chartBars = document.querySelectorAll('.chart-bar[data-bar-height]');
  chartBars.forEach((bar) => {
    const height = bar.getAttribute('data-bar-height');
    if (height && bar instanceof HTMLElement) {
      bar.style.height = height;
    }
  });
};

// Apply styles on DOM content loaded and when needed
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', applyDynamicStyles);
  
  // Create a MutationObserver to handle dynamically added elements
  const observer = new MutationObserver(() => {
    applyDynamicStyles();
  });
  
  // Start observing when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-progress-width', 'data-bar-height']
      });
    });
  } else {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-progress-width', 'data-bar-height']
    });
  }
}