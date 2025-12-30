# Total Blocking Time (TBT) Optimization Guide

## Current Performance Issues

Based on your portfolio's architecture, here are the main TBT contributors:

### 1. Heavy Dependencies
- **react-pdf** (~500KB): PDF viewer on /resume page
- **framer-motion** (~150KB): Animation library used throughout
- **Multiple icon libraries**: lucide-react, react-icons, simple-icons
- **Form libraries**: react-hook-form, zod validation

### 2. Client-Side Rendering
- All components using `'use client'` increase initial JavaScript execution time
- Framer-motion animations run on mount

---

## Recommended Optimizations (Priority Order)

### Priority 1: Code Splitting for Heavy Components

#### A. Lazy Load PDF Viewer
The PDF viewer is only needed on `/resume` page and is very heavy.

**Current:** Loaded eagerly
**Recommended:** Dynamic import with loading state

```tsx
// app/resume/page.tsx
import dynamic from 'next/dynamic'

const PDFViewer = dynamic(
  () => import('@/components/pdf/pdf-viewer'),
  {
    loading: () => <div>Loading PDF...</div>,
    ssr: false // PDF viewer doesn't need SSR
  }
)
```

**Impact:** Saves ~500KB from initial bundle

#### B. Lazy Load Contact Form
Contact form is only on `/contact` page with heavy validation.

```tsx
// app/contact/page.tsx
import dynamic from 'dynamic'

const ContactForm = dynamic(
  () => import('@/components/contact/contact-form'),
  {
    loading: () => <div>Loading form...</div>
  }
)
```

**Impact:** Saves ~100KB from initial bundle

---

### Priority 2: Optimize Framer Motion

#### A. Use Lazy Motion Components
Only load motion when needed.

```tsx
// Create a lazy motion wrapper
// components/animations/lazy-motion.tsx
import dynamic from 'next/dynamic'

export const LazyMotion = dynamic(
  () => import('framer-motion').then(mod => ({
    default: mod.LazyMotion
  })),
  { ssr: true }
)

export const domAnimation = () =>
  import('framer-motion').then(res => res.domAnimation)
```

Then wrap your app:

```tsx
// app/layout.tsx
import { LazyMotion, domAnimation } from '@/components/animations/lazy-motion'

<LazyMotion features={domAnimation}>
  {children}
</LazyMotion>
```

**Impact:** Reduces framer-motion bundle by ~70%

#### B. Reduce Motion for Users Who Prefer It

```tsx
// Add to globals.css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### Priority 3: Optimize Icon Imports

#### Current Issue
You're importing entire icon sets:

```tsx
import { FaGithub } from 'react-icons/fa6'
```

This can bundle unused icons.

#### Solution: Verify Tree-Shaking
React-icons should tree-shake automatically, but verify in bundle analyzer.

#### Alternative: Use Lucide Only
You have 3 icon libraries. Consider using only lucide-react:
- lucide-react: ~40KB (tree-shakeable)
- react-icons: Varies
- simple-icons: ~500KB

**Recommendation:** Remove simple-icons if unused, keep lucide-react + react-icons for brand icons only.

---

### Priority 4: Next.js Configuration Optimizations

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      'framer-motion',
    ],
  },

  // Minimize JavaScript
  swcMinify: true,
}

export default nextConfig
```

---

### Priority 5: Component-Level Optimizations

#### A. Memoize Heavy Components

```tsx
// components/skills/skills.tsx
import { memo } from 'react'

const Skills = memo(() => {
  // ... component code
})

export default Skills
```

#### B. Use React.lazy for Route-Specific Components

```tsx
// app/page.tsx
import { lazy, Suspense } from 'react'

const Skills = lazy(() => import('@/components/skills/skills'))

export default function Home() {
  return (
    <PageContainer>
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <Skills />
      </Suspense>
    </PageContainer>
  )
}
```

---

### Priority 6: Third-Party Script Optimization

If you add analytics or other third-party scripts:

```tsx
// app/layout.tsx
import Script from 'next/script'

<Script
  src="https://analytics.example.com/script.js"
  strategy="lazyOnload" // Load after page is interactive
/>
```

---

### Priority 7: Font Optimization

You're already using next/font with Roboto. Ensure:

```tsx
// app/layout.tsx
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap', // Add this for better performance
  preload: true,
})
```

---

## Bundle Analysis

### Setup

1. **Add script to package.json:**
```json
"scripts": {
  "analyze": "ANALYZE=true next build",
  "analyze:server": "ANALYZE=true BUNDLE_ANALYZE=server next build",
  "analyze:browser": "ANALYZE=true BUNDLE_ANALYZE=browser next build"
}
```

2. **Update next.config.ts:**
```typescript
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
```

3. **Run analysis:**
```bash
npm run analyze
```

---

## Measuring Impact

### Before Optimizations
Run Lighthouse or PageSpeed Insights on your deployed site and note:
- TBT score
- Total JavaScript size
- Time to Interactive (TTI)

### After Each Optimization
Re-run tests to measure improvement.

### Expected Improvements
- **Priority 1 (Code Splitting):** 30-40% TBT reduction
- **Priority 2 (Framer Motion):** 10-15% TBT reduction
- **Priority 3 (Icon Optimization):** 5-10% TBT reduction
- **Priority 4-7 (Config + Components):** 5-10% TBT reduction

**Total Expected:** 50-75% TBT improvement

---

## Quick Wins (Implement First)

1. ✅ Add dynamic imports to PDF viewer
2. ✅ Add dynamic imports to Contact form
3. ✅ Configure next.config.ts optimizations
4. ✅ Add bundle analyzer
5. ✅ Run analysis to identify other large bundles

---

## Monitoring

### Tools
- **Lighthouse:** Chrome DevTools
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Web Vitals:** Install `web-vitals` package for real-user monitoring

### Web Vitals Implementation

```tsx
// app/layout.tsx
import { Analytics } from '@/components/analytics'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

```tsx
// components/analytics.tsx
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function Analytics() {
  useReportWebVitals((metric) => {
    console.log(metric)
    // Send to analytics service
  })
  return null
}
```

---

## Additional Resources

- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [Framer Motion Performance](https://www.framer.com/motion/guide-reduce-bundle-size/)
