# Nexora - Complete Branding Guide
**Your AI LinkedIn Presence**

---

## 🎨 Brand Identity

### Name
**Nexora**
- Pronunciation: "nex-OR-ah"
- Origin: Next + Aura (next-level presence)

### Tagline Options
1. "Your AI LinkedIn Presence" (Primary)
2. "Next-Level LinkedIn Automation"
3. "Elevate Your LinkedIn Aura"

---

## 🎯 Logo Design Concept

### Icon Design: **Radiating Connectivity**
The Nexora icon represents:
- **Central Core:** Your profile/presence
- **Radiating Circles:** Expanding influence and reach
- **Connected Nodes:** Network growth
- **Purple Gradient:** Premium AI technology

### Icon Specifications

**SVG Logo Implementation:**
```jsx
// Simple radiating circles design
<svg viewBox="0 0 32 32" fill="none">
  {/* Outer ring */}
  <circle cx="16" cy="16" r="14" stroke="url(#gradient)" strokeWidth="1.5" opacity="0.3"/>
  {/* Middle ring */}
  <circle cx="16" cy="16" r="10" stroke="url(#gradient)" strokeWidth="2" opacity="0.6"/>
  {/* Inner core with glow */}
  <circle cx="16" cy="16" r="6" fill="url(#gradient)"/>
  {/* Connection nodes */}
  <circle cx="16" cy="4" r="2" fill="#a855f7"/>
  <circle cx="28" cy="16" r="2" fill="#a855f7"/>
  <circle cx="16" cy="28" r="2" fill="#a855f7"/>
  <circle cx="4" cy="16" r="2" fill="#a855f7"/>
  
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#a855f7"/>
      <stop offset="100%" stopColor="#d946ef"/>
    </linearGradient>
  </defs>
</svg>
```

---

## 🎨 Color Palette

### Primary Colors (Purple Theme)
- **Primary:** #a855f7 (Purple 500)
- **Primary Dark:** #9333ea (Purple 600)
- **Primary Light:** #c084fc (Purple 400)

### Gradient
- **Logo Gradient:** linear-gradient(135deg, #a855f7 0%, #d946ef 100%)
- **Background Gradient:** radial-gradient purple/pink accents

---

## 📝 Typography

### Wordmark Style
**Nexora**
- Font Weight: Bold (700)
- Letter Spacing: Tight (-0.02em)
- Style: Modern, clean sans-serif

### Display
```
<span className="font-bold text-xl">
  Nexora
</span>
```

---

## 🔄 Implementation Plan

### Files to Update:
1. Navigation component - Logo + name
2. Footer - Branding
3. Hero section - Brand name
4. Metadata - Site title
5. All references to "Linqin" → "Nexora"

---

**Status:** Implementing now...

