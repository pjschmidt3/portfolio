# Final LCP Tweaks - Push to 100 Score 🎯

You're almost at 100! Here are the **final micro-optimizations** to get you there:

---

## 1. **Add Fetchpriority to Critical Elements** ⚡

### A. Mark Hero Text as High Priority

Since the Hero heading is your LCP element, tell the browser to prioritize it:

```typescript
// registry/new-york/ui/hero.tsx
export function Hero({ title, subtitle, description, /* ... */ }: HeroProps) {
  return (
    <div className={cn('flex-col space-y-5 text-center', className)}>
      <Heading
        level={1}
        className={cn('text-4xl md:text-6xl', titleClassName)}
        // Add this data attribute for the browser
        data-fetchpriority="high"
      >
        {title}
      </Heading>
      {/* ... rest */}
    </div>
  )
}
```

**Impact:** 50-100ms improvement

---

## 2. **Preload Critical Font Files** 🔤

Next.js doesn't always preload the exact font files needed. Manually preload the critical one:

```typescript
// app/layout.tsx - Add to metadata
export async function generateMetadata() {
  return {
    title: 'Portfolio | Phillip Schmidt',
    description: 'Phillip Schmidt | Senior Software Developer | Portfolio',
    // This doesn't exist in metadata, use the head approach below
  }
}
```

**Better approach - Create a font preload component:**

```typescript
// app/font-preload.tsx
export function FontPreload() {
  return (
    <>
      <link
        rel="preload"
        href="/_next/static/media/[hash].woff2" // You'll get this from build output
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  )
}

// app/layout.tsx - Add to head
<head>
  <FontPreload />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  {/* ... */}
</head>
```

**Even Better - Let Next.js handle it (already doing this!)** ✅

You're already using `preload: true` on fonts, so this is handled.

---

## 3. **Remove Unused Font Package** 📦

I noticed you have `@piducancore/fonts-andale-mono` but it's only used in test mocks.

### Remove if not needed:

```bash
npm uninstall @piducancore/fonts-andale-mono
```

Then remove from `jest.config.ts`:

```typescript
// jest.config.ts
moduleNameMapper: {
  // Remove this line:
  // '@piducancore/fonts-andale-mono': '<rootDir>/lib/test-utils/mocks/font-mock.ts',
}
```

**Impact:** Faster bundle, cleaner build

---

## 4. **Optimize CSS Imports Order** 🎨

Move critical CSS first in globals.css:

```css
/* app/globals.css */

/* 1. Critical base styles FIRST */
html,
body {
  max-width: 100vw;
  height: 100%;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 2. THEN import frameworks */
@import 'tailwindcss';
@import 'tw-animate-css';

/* 3. Custom variants after */
@custom-variant dark (&:is(.dark *));

/* ... rest */
```

**Impact:** Slightly faster initial paint

---

## 5. **Add Resource Hints for Fonts** 🚀

You already have preconnect, but add one more optimization:

```typescript
// app/layout.tsx
<head>
  {/* Existing */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

  {/* ADD: Preload key for better font loading */}
  <link
    rel="preload"
    as="style"
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
  />
</head>
```

**Note:** Since you're using next/font/google, this is already optimized. Skip this!

---

## 6. **Ensure No Layout Shifts** 📏

Check that font fallback is preventing CLS:

```typescript
// app/layout.tsx - Already added! ✅
const roboto = Roboto({
  adjustFontFallback: true // This prevents CLS
})
```

---

## 7. **Optimize Navigation** 🧭

Since Navigation is sticky and always visible, ensure it's not blocking:

```typescript
// components/navigation/navigation.tsx
// Already using 'use client' ✅
// Already has backdrop-blur optimization ✅

// Consider: Remove backdrop-blur if Lighthouse flags it
<nav className="sticky top-0 z-50 w-full border-b bg-background py-4 px-6">
  {/* Remove: backdrop-blur-sm if needed */}
</nav>
```

**Impact:** Backdrop-blur can be GPU-intensive, remove if score is still low

---

## 8. **Minimize Render-Blocking Resources** 🚫

### Check for blocking scripts:

```typescript
// app/layout.tsx
// Make sure WebVitals doesn't block (it shouldn't, it's client-side)
<WebVitals /> // ✅ This is fine, it's async
```

### If you add analytics later:

```typescript
import Script from 'next/script'

<Script
  src="https://analytics.example.com/script.js"
  strategy="afterInteractive" // NOT "beforeInteractive"
/>
```

---

## 9. **Content Visibility for Below-Fold** 👁️

For Skills section (below the fold), add content-visibility:

```typescript
// components/skills/skills.tsx
<div
  className="..."
  style={{ contentVisibility: 'auto' }}
>
  {/* Skills content */}
</div>
```

**Impact:** Browser skips rendering off-screen content

---

## 10. **Aggressive Image Optimization** 🖼️

If you add images to Hero later:

```typescript
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // CRITICAL for above-fold images
  quality={90} // High quality for hero
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Generate with plaiceholder
/>
```

---

## 11. **Remove Unused Dependencies** 📦

Check these packages - are they used above the fold?

```json
// Potentially unused or deferred:
"react-scrollspy-nav": "^1.3.0",
"react-scrollspy-navigation": "^2.0.7",
"recharts": "^2.15.4", // Only if charts are below fold
```

If not needed immediately, lazy load:

```typescript
const Charts = dynamic(() => import('recharts'))
```

---

## 12. **HTTP Headers (Deployment)** 🌐

When deploying, add these headers:

### Vercel (vercel.json):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### Next.js config:
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  // ... existing config

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      }
    ]
  }
}
```

---

## 13. **Build Size Analysis** 📊

Run the analyzer to find any remaining bloat:

```bash
npm run analyze
```

Look for:
- Large icon libraries (keep only what you need)
- Duplicate dependencies
- Unused code in bundles

---

## 14. **Server-Side Rendering Audit** 🖥️

Ensure these are SSR (not 'use client'):

- ✅ Hero component (now static, perfect!)
- ✅ PageContainer
- ✅ Page headings
- ⚠️ Navigation (client-side is fine, it's interactive)

---

## 15. **Final Checklist** ✅

Before running Lighthouse:

### Build:
```bash
npm run build
```

Check output for:
- ✅ Route sizes (/, /projects, /contact should be < 100KB)
- ✅ No warnings about large pages
- ✅ First Load JS < 100KB

### Run:
```bash
npm start
```

### Test:
1. Open in Incognito (no extensions)
2. Throttle to "Mobile 4G" in DevTools
3. Hard refresh (Ctrl+Shift+R)
4. Run Lighthouse

---

## Quick Wins (Do These First) 🏆

### 1. Remove Andale Mono Font
```bash
npm uninstall @piducancore/fonts-andale-mono
```

### 2. Reorder globals.css
Put critical styles before @import statements

### 3. Remove backdrop-blur if needed
```typescript
// navigation.tsx
<nav className="sticky top-0 z-50 w-full border-b bg-background/95 py-4 px-6">
  {/* Changed bg-background/80 backdrop-blur-sm to bg-background/95 */}
</nav>
```

### 4. Add content-visibility
```typescript
// skills.tsx
style={{ contentVisibility: 'auto' }}
```

### 5. Verify bundle size
```bash
npm run analyze
```
Look for any packages > 100KB

---

## Expected Final Score 🎯

With these optimizations:

- **LCP:** < 1.2s (was ~2.5s)
- **FCP:** < 1.0s
- **TBT:** < 100ms (already optimized)
- **CLS:** < 0.05
- **SI (Speed Index):** < 1.5s

**Total Lighthouse Score:** 95-100 ✨

---

## If Still Not 100... 🤔

### Check these Lighthouse flags:

1. **"Eliminate render-blocking resources"**
   - Move CSS imports
   - Ensure all fonts are preloaded

2. **"Properly size images"**
   - Use Next.js Image component everywhere
   - Set explicit width/height

3. **"Serve images in next-gen formats"**
   - Already done with AVIF/WebP ✅

4. **"Reduce unused JavaScript"**
   - Run bundle analyzer
   - Remove unused deps

5. **"Avoid enormous network payloads"**
   - Check bundle sizes
   - Split large components

6. **"Ensure text remains visible during webfont load"**
   - Already using font-display: swap ✅

---

## Pro Tips 💡

### 1. Test on Real Devices
Lighthouse scores vary by device. Test on:
- Actual mobile phone
- Slow 3G connection
- Low-end device simulation

### 2. Multiple Runs
Run Lighthouse 3-5 times and average the scores

### 3. Field Data vs Lab Data
- **Lab:** What Lighthouse shows (controlled)
- **Field:** Real users (PageSpeed Insights)

Both should be green!

### 4. Monitor Continuously
```typescript
// Set up automatic monitoring
// Send Web Vitals to your analytics
```

---

## Resources 📚

- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Lighthouse Guide](https://web.dev/lighthouse-performance/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
