import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig: NextConfig = {
  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp']
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
    optimizeCss: true // Inline critical CSS for faster LCP
  }
}

export default withBundleAnalyzer(nextConfig)
