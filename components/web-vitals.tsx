'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(metric)
    }

    // You can send metrics to analytics service
    switch (metric.name) {
      case 'FCP': // First Contentful Paint
        console.log('FCP:', metric.value, 'ms')
        break
      case 'LCP': // Largest Contentful Paint
        console.log('LCP:', metric.value, 'ms', metric.value < 2500 ? '✅' : '❌')
        break
      case 'CLS': // Cumulative Layout Shift
        console.log('CLS:', metric.value, metric.value < 0.1 ? '✅' : '❌')
        break
      case 'FID': // First Input Delay
        console.log('FID:', metric.value, 'ms')
        break
      case 'TTFB': // Time to First Byte
        console.log('TTFB:', metric.value, 'ms')
        break
      case 'INP': // Interaction to Next Paint
        console.log('INP:', metric.value, 'ms')
        break
    }

    // Example: Send to Google Analytics
    // if (window.gtag) {
    //   window.gtag('event', metric.name, {
    //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //     event_label: metric.id,
    //     non_interaction: true,
    //   })
    // }

    // Example: Send to custom analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metric),
    // })
  })

  return null
}
