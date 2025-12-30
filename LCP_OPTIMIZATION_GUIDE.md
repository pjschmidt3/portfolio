# Largest Contentful Paint (LCP) Optimization Guide

## What is LCP?

LCP measures how long it takes for the **largest content element** (image, text block, or video) to become visible in the viewport. Good LCP is under 2.5 seconds.

## Current LCP Elements (Likely)

Based on your portfolio structure:
- **Home page:** Hero title/subtitle (largest text block)
- **Projects page:** Project heading or first project image
- **Resume page:** PDF viewer container
- **Contact page:** Page heading or form container

---

## Priority 1: Optimize Font Loading ⚡

### Current Status
✅ Already implemented:
- `display: 'swap'` - Prevents invisible text
- `preload: true` - Loads fonts early

### Additional Optimizations

#### A. Font Subsetting (Reduce Font File Size)

```typescript
// app/layout.tsx
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '700'], // Only load weights you use
  style: ['normal'], // Only normal, not italic
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
  preload: true,
  weight: ['400', '500'], // Limit to used weights
})
```

**Impact:** 30-50% smaller font files

#### B. Optimize @piducancore/fonts-andale-mono

This is a custom font package. Check if it's critical for above-the-fold content.

**If not critical:** Load it asynchronously
```typescript
// Remove from layout.tsx import
// Load only where needed:
import('@piducancore/fonts-andale-mono').then(() => {
  // Font loaded
})
```

**If critical:** Ensure it's optimized and preloaded

---

## Priority 2: Preload Critical Resources 🚀

### A. Add Resource Hints to layout.tsx

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${geistMono.variable}`}>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* DNS prefetch for any external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <ThemeProvider>
          <Navigation />
          <main className="w-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### B. Preload Hero Images (If Any)

If you add a profile picture or hero image:

```typescript
// app/page.tsx
import Image from 'next/image'

export default function Home() {
  return (
    <PageContainer>
      <Image
        src="/profile.jpg"
        alt="Profile"
        width={400}
        height={400}
        priority // This preloads the image!
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..." // Add blur placeholder
      />
      <Hero />
      <Skills />
    </PageContainer>
  )
}
```

---

## Priority 3: Optimize Hero Section 🎯

### Current Issue
Hero uses framer-motion with `initial="hidden"` which delays visibility.

### Solution: Prevent Animation Delay

```typescript
// registry/new-york/ui/hero.tsx
export function Hero({ /* props */ }: HeroProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 1 }, // Start visible, not hidden!
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0 // Remove delay
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 1, y: 0 }, // Start in final position
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, // Shorter duration
        ease: 'easeOut' as const
      }
    }
  }

  return (
    <motion.div
      className={cn('flex-col space-y-5 text-center', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Content */}
    </motion.div>
  )
}
```

**Better Alternative:** Remove animations from hero entirely for fastest LCP

```typescript
// For best LCP, hero should be static
return (
  <div className={cn('flex-col space-y-5 text-center', className)}>
    {/* No motion wrapper */}
  </div>
)
```

**Impact:** 200-500ms faster LCP

---

## Priority 4: Optimize Images 🖼️

### A. Use Next.js Image Component

**Current:** Regular `<img>` or StaticImport in projects

**Optimized:**
```typescript
// components/projects/projects.tsx
import Image from 'next/image'
import TrueCodersLogoBanner from '@/public/images/truecoders-logo-banner.webp'

<Image
  src={TrueCodersLogoBanner}
  alt="TrueCoders Student Portal"
  width={800}
  height={400}
  loading="lazy" // Lazy load below-fold images
  quality={85} // Good balance of quality/size
  placeholder="blur" // Built-in blur placeholder
/>
```

### B. Optimize Image Sizes

Check your images:
```bash
# See image sizes
ls -lh public/images/
```

**Recommendations:**
- **Hero images:** Max 1200px wide, 200-400KB
- **Project images:** Max 800px wide, 100-200KB
- **Icons/logos:** SVG preferred, or PNG < 50KB

### C. Convert to Modern Formats

Already configured in next.config.ts ✅:
```typescript
images: {
  formats: ['image/avif', 'image/webp']
}
```

Next.js will auto-convert images to AVIF/WebP.

### D. Add Responsive Images

```typescript
<Image
  src={image}
  alt="Project"
  width={800}
  height={400}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  // Serves different sizes based on viewport
/>
```

---

## Priority 5: Server-Side Rendering Optimization 📄

### Current Status
Your components are mostly client-side (`'use client'`)

### Optimize for SSR

#### A. Remove Unnecessary 'use client'

Only components that need interactivity should be client components.

**Example - Projects Component:**
```typescript
// components/projects/projects.tsx
// Remove 'use client' from top

// Only wrap interactive parts:
export function Projects({ className }: ProjectsProps) {
  return (
    <section className={cn('bg-background my-16', className)}>
      <Heading level={2}>Projects</Heading>
      {/* Static content here */}

      {/* Only carousel needs client-side */}
      <ClientCarousel items={projectItems} />
    </section>
  )
}

// Separate client component
'use client'
function ClientCarousel({ items }) {
  return (
    <Carousel>
      {/* ... */}
    </Carousel>
  )
}
```

**Impact:** Faster initial render, better LCP

#### B. Hero Should Be Server-Side

```typescript
// registry/new-york/ui/hero.tsx
// REMOVE 'use client'

// If animations are needed, wrap only that part:
export function Hero({ /* props */ }: HeroProps) {
  return (
    <div className="flex-col space-y-5 text-center">
      {/* Static content renders immediately */}
      <Heading level={1}>{title}</Heading>
      <Heading level={2}>{subtitle}</Heading>
      <Paragraph>{description}</Paragraph>

      {/* Only social links animated */}
      <AnimatedSocialLinks {...socialLinks} />
    </div>
  )
}

'use client'
function AnimatedSocialLinks(props) {
  // Animation logic here
}
```

---

## Priority 6: Reduce JavaScript Execution ⚙️

### A. Defer Non-Critical Scripts

If you add analytics or other scripts:

```typescript
// app/layout.tsx
<Script
  src="https://analytics.example.com/script.js"
  strategy="afterInteractive" // Loads after page interactive
/>
```

### B. Code Split Heavy Dependencies

Already done ✅:
- Contact Form (dynamic import)
- PDF Viewer (dynamic import)

---

## Priority 7: Optimize CSS Delivery 🎨

### A. Critical CSS Inline

Next.js handles this automatically, but you can optimize:

```typescript
// next.config.ts
experimental: {
  optimizeCss: true, // Inline critical CSS
}
```

### B. Remove Unused CSS

```bash
# Install PurgeCSS (optional)
npm install -D @fullhuman/postcss-purgecss

# Configure in postcss.config.js
```

Tailwind already purges unused CSS ✅

---

## Priority 8: Navigation Optimization 🧭

### Current Issue
Navigation is sticky, always rendered, adds to initial bundle.

### Optimization

```typescript
// app/layout.tsx
import dynamic from 'next/dynamic'

const Navigation = dynamic(
  () => import('@/components/navigation/navigation').then(mod => ({ default: mod.Navigation })),
  { ssr: true } // Keep SSR for SEO
)
```

**Better:** Keep Navigation as-is but ensure it's not blocking LCP
- Current implementation is fine since it's in viewport

---

## Quick Wins Summary ⚡

### Implement These First:

1. **Remove animation delay from Hero** (Priority 3)
   - Change `hidden: { opacity: 1, y: 0 }`
   - Impact: 200-500ms faster LCP

2. **Limit font weights** (Priority 1A)
   - Only load weights you use
   - Impact: 30-50% smaller font files

3. **Add preconnect hints** (Priority 2A)
   - Preconnect to Google Fonts
   - Impact: 100-200ms faster font loading

4. **Use Next.js Image for projects** (Priority 4A)
   - Replace regular images
   - Impact: Better loading, automatic optimization

5. **Make Hero server-side** (Priority 5B)
   - Remove 'use client' directive
   - Impact: Faster initial render

---

## Measuring LCP

### Tools

1. **Lighthouse** (Chrome DevTools)
   ```
   F12 → Lighthouse → Performance
   ```

2. **PageSpeed Insights**
   ```
   https://pagespeed.web.dev/
   Enter your deployed URL
   ```

3. **Web Vitals Extension**
   ```
   Chrome extension: Web Vitals
   Shows real-time metrics
   ```

### Command Line

```bash
# Using Lighthouse CI
npm install -g @lhci/cli
lhci autorun --collect.url=http://localhost:3000
```

### Real User Monitoring

```typescript
// components/web-vitals.tsx
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (metric.name === 'LCP') {
      console.log('LCP:', metric.value)
      // Send to analytics
    }
  })
  return null
}
```

```typescript
// app/layout.tsx
import { WebVitals } from '@/components/web-vitals'

<body>
  <WebVitals />
  {/* ... */}
</body>
```

---

## Expected Improvements

| Optimization | LCP Impact |
|-------------|-----------|
| Remove hero animation delay | -200 to -500ms |
| Optimize font weights | -100 to -200ms |
| Preconnect hints | -100 to -200ms |
| Next.js Image optimization | -200 to -400ms |
| Server-side Hero | -100 to -300ms |
| **Total Expected** | **-700ms to -1600ms** |

**Target:** LCP < 2.5s
**Good:** LCP < 2.0s
**Excellent:** LCP < 1.5s

---

## Before & After Checklist

### Before Optimization
- [ ] Run Lighthouse audit
- [ ] Note current LCP value
- [ ] Identify LCP element
- [ ] Screenshot for comparison

### After Each Change
- [ ] Build production version
- [ ] Run Lighthouse again
- [ ] Compare LCP values
- [ ] Check for regressions

### Final Validation
- [ ] LCP < 2.5s on mobile
- [ ] LCP < 2.0s on desktop
- [ ] No layout shifts (CLS < 0.1)
- [ ] All images optimized
- [ ] Fonts loading efficiently

---

## Common LCP Elements by Page

### Home Page (/)
**LCP Element:** Hero title (H1)
**Fix:** Remove animation, ensure SSR, optimize fonts

### Projects (/projects)
**LCP Element:** Page heading or first project image
**Fix:** Use Next.js Image, add priority to first image

### Resume (/resume)
**LCP Element:** PDF viewer container
**Fix:** Already optimized with dynamic import ✅

### Contact (/contact)
**LCP Element:** Page heading
**Fix:** Ensure static rendering, optimize fonts

---

## Resources

- [Web.dev LCP Guide](https://web.dev/lcp/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Google Fonts Optimization](https://web.dev/optimize-webfont-loading/)
- [Chrome LCP Debugging](https://web.dev/debug-web-vitals-in-the-field/)
