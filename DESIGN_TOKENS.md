# Design Tokens Reference
**Project:** Linqin.ai  
**Date:** March 1, 2026  
**Source:** Extracted from current implementation + UI_UX_REDESIGN_PLAN.md

---

## 🎨 Color Palette

### Current Colors (In Use)
```css
/* From app/globals.css @theme */
--color-brand-orange-50: #fff0e5;
--color-brand-orange-100: #ffdccc;
--color-brand-orange-500: #ff6b35;    /* Primary brand */
--color-brand-orange-600: #e5531d;
--color-brand-zinc-800: #27272a;
--color-brand-zinc-900: #18181b;
```

### New Extended Palette (From Redesign Plan)

#### Primary (Orange-Red) - Brand Color
```css
--color-primary-50: #fef3f2;
--color-primary-100: #fee4e2;
--color-primary-200: #fecdca;
--color-primary-300: #fda29b;
--color-primary-400: #f97066;
--color-primary-500: #f04438;      /* Main brand - evolved from #ff6b35 */
--color-primary-600: #d92d20;
--color-primary-700: #b42318;
--color-primary-800: #912018;
--color-primary-900: #7a271a;
```

#### Secondary (Deep Purple) - NEW
```css
--color-secondary-50: #f4f3ff;
--color-secondary-100: #ebe9fe;
--color-secondary-200: #d9d6fe;
--color-secondary-300: #bdb4fe;
--color-secondary-400: #9b8afb;
--color-secondary-500: #7a5af8;
--color-secondary-600: #6938ef;
--color-secondary-700: #5925dc;
--color-secondary-800: #4a1fb8;
--color-secondary-900: #3e1c96;
```

#### Accent (Electric Blue) - NEW
```css
--color-accent-50: #eff8ff;
--color-accent-100: #d1e9ff;
--color-accent-200: #b2ddff;
--color-accent-300: #84caff;
--color-accent-400: #53b1fd;
--color-accent-500: #2e90fa;
--color-accent-600: #1570ef;
--color-accent-700: #175cd3;
--color-accent-800: #1849a9;
--color-accent-900: #194185;
```

#### Neutral/Gray Scale - Enhanced
```css
--color-gray-50: #fafaf9;        /* Warmer than current */
--color-gray-100: #f5f5f4;
--color-gray-200: #e7e5e4;
--color-gray-300: #d6d3d1;
--color-gray-400: #a8a29e;
--color-gray-500: #78716c;
--color-gray-600: #57534e;
--color-gray-700: #44403c;
--color-gray-800: #292524;
--color-gray-900: #1c1917;
--color-gray-950: #0c0a09;
```

#### Status Colors
```css
/* Success */
--color-success-50: #ecfdf5;
--color-success-500: #10b981;
--color-success-600: #059669;
--color-success-700: #047857;

/* Warning */
--color-warning-50: #fffbeb;
--color-warning-500: #f59e0b;
--color-warning-600: #d97706;

/* Error */
--color-error-50: #fef2f2;
--color-error-500: #ef4444;
--color-error-600: #dc2626;
```

#### Background System
```css
--bg-primary: #ffffff;
--bg-secondary: #fafaf9;
--bg-tertiary: #f5f5f4;
--bg-elevated: #ffffff;
--bg-overlay: rgba(0, 0, 0, 0.5);
--bg-glass: rgba(255, 255, 255, 0.8);
```

---

## 📏 Spacing Scale

### Base: 8px System
```css
--space-0: 0;
--space-0.5: 0.125rem;   /* 2px */
--space-1: 0.25rem;      /* 4px */
--space-2: 0.5rem;       /* 8px */
--space-3: 0.75rem;      /* 12px */
--space-4: 1rem;         /* 16px */
--space-5: 1.25rem;      /* 20px */
--space-6: 1.5rem;       /* 24px */
--space-8: 2rem;         /* 32px */
--space-10: 2.5rem;      /* 40px */
--space-12: 3rem;        /* 48px */
--space-16: 4rem;        /* 64px */
--space-20: 5rem;        /* 80px */
--space-24: 6rem;        /* 96px */
--space-32: 8rem;        /* 128px */
```

### Section Spacing
```css
--section-spacing-sm: 3rem;     /* 48px - Mobile */
--section-spacing-md: 5rem;     /* 80px - Tablet */
--section-spacing-lg: 8rem;     /* 128px - Desktop */
```

---

## 🔤 Typography

### Font Family (Current)
```css
--font-primary: 'Inter', ui-sans-serif, system-ui, sans-serif;
```
**Source:** Google Fonts CDN  
**Weights:** 400, 500, 600, 700, 800

### Type Scale
```css
/* Display Sizes (Hero, Landing) */
--text-display-2xl: 4.5rem;    /* 72px */
--text-display-xl: 3.75rem;    /* 60px */
--text-display-lg: 3rem;       /* 48px */
--text-display-md: 2.25rem;    /* 36px */
--text-display-sm: 1.875rem;   /* 30px */

/* Body Text Sizes */
--text-xl: 1.25rem;      /* 20px */
--text-lg: 1.125rem;     /* 18px */
--text-base: 1rem;       /* 16px */
--text-sm: 0.875rem;     /* 14px */
--text-xs: 0.75rem;      /* 12px */
--text-2xs: 0.625rem;    /* 10px */
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Line Heights
```css
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

### Letter Spacing
```css
--tracking-tight: -0.025em;
--tracking-normal: 0;
--tracking-wide: 0.025em;
```

---

## 📐 Border Radius

```css
--radius-sm: 0.375rem;      /* 6px */
--radius-base: 0.5rem;      /* 8px */
--radius-md: 0.75rem;       /* 12px */
--radius-lg: 1rem;          /* 16px */
--radius-xl: 1.5rem;        /* 24px */
--radius-2xl: 2rem;         /* 32px - Current cards */
--radius-3xl: 3rem;         /* 48px - Hero sections */
--radius-full: 9999px;      /* Pills, avatars */
```

**Current Usage:**
- Cards: `rounded-[2rem]` (32px)
- Buttons: `rounded-xl` (24px) or `rounded-full`
- Inputs: `rounded-xl` (24px)
- Badges: `rounded-full`

---

## 🌑 Shadows

### Current Shadows (In Use)
```css
/* Subtle card shadow */
shadow-sm shadow-gray-200/50

/* Medium shadow */
shadow-md shadow-orange-500/20

/* Large shadow */
shadow-xl shadow-zinc-900/20

/* Extra large */
shadow-2xl shadow-gray-200/50
```

### Enhanced Shadow System (Redesign Plan)
```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-2xl: 0 50px 100px -20px rgba(0, 0, 0, 0.3);

/* Colored shadows for brand elements */
--shadow-primary: 0 10px 25px -5px rgba(240, 68, 56, 0.2);
--shadow-secondary: 0 10px 25px -5px rgba(122, 90, 248, 0.2);
--shadow-accent: 0 10px 25px -5px rgba(46, 144, 250, 0.2);
```

---

## 🎨 Gradients

### Current Gradients (In Use)
```css
/* Background grid pattern */
background-image: 
  linear-gradient(to right, #e2e8f0 1px, transparent 1px),
  linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
```

### New Gradients (Redesign Plan)
```css
--gradient-primary: linear-gradient(135deg, #f04438 0%, #d92d20 100%);
--gradient-secondary: linear-gradient(135deg, #7a5af8 0%, #6938ef 100%);
--gradient-hero: linear-gradient(180deg, #ffffff 0%, #fafaf9 100%);
--gradient-card: linear-gradient(145deg, #ffffff 0%, #f5f5f4 100%);
--gradient-mesh: radial-gradient(at 0% 0%, rgba(240, 68, 56, 0.1) 0px, transparent 50%),
                 radial-gradient(at 100% 100%, rgba(122, 90, 248, 0.1) 0px, transparent 50%);
```

---

## 🎬 Transitions & Animations

### Current Transitions
```css
/* Generic transition */
transition

/* All properties */
transition-all

/* Color transitions */
transition-colors
```

### Animation Timing
```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-medium: 300ms;
--duration-slow: 500ms;

--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Current Animations in Use
- `animate-pulse` - Status indicators
- `animate-ping` - Active system dot
- `hover:-translate-y-1` - Button hovers
- `hover:scale-105` - Logo hover

---

## 📱 Breakpoints

```css
/* Tailwind default breakpoints */
--screen-sm: 640px;    /* Small tablets */
--screen-md: 768px;    /* Tablets */
--screen-lg: 1024px;   /* Small desktops */
--screen-xl: 1280px;   /* Desktops */
--screen-2xl: 1536px;  /* Large desktops */
```

### Current Usage Patterns
- `md:text-7xl` - Typography responsive
- `md:grid-cols-2` - Grid responsive
- `hidden md:flex` - Visibility responsive
- `md:p-8` - Spacing responsive

---

## 🎯 Quick Reference: Common Patterns

### Button Patterns
```typescript
// Primary CTA
className="px-6 py-3 bg-[#FF6B35] text-white rounded-xl hover:bg-[#e5531d] shadow-md shadow-orange-500/20 transition-all font-semibold text-sm"

// Secondary
className="px-6 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 shadow-md shadow-zinc-900/20 transition-all font-bold text-sm"

// Outline
className="px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition text-sm font-medium"
```

### Card Patterns
```typescript
// Standard card
className="bg-white rounded-[2rem] border border-gray-100 shadow-sm shadow-gray-200/50 p-6 md:p-8"

// Elevated card
className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 p-6 md:p-12 border border-gray-100"
```

### Input Patterns
```typescript
// Text input
className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
```

### Badge Patterns
```typescript
// Status badge
className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700"
```

---

## 📝 Notes for Implementation

### Phase 1 Priority
1. ✅ Update `app/globals.css` @theme with new colors
2. ✅ Keep current orange (#FF6B35) as primary-500
3. ✅ Add secondary (purple) and accent (blue) colors
4. ✅ Add enhanced gray scale
5. ✅ Add new shadow definitions
6. ✅ Add gradient utilities

### Backward Compatibility
- Keep current `brand-orange-500` as alias to `primary-500`
- Keep current `brand-zinc-900` as alias to `gray-900`
- Gradually migrate to new token names

### Tailwind 4 Notes
- Using `@theme` directive (new in Tailwind 4)
- Custom properties defined in globals.css
- No separate tailwind.config file needed

---

**Document Status:** Ready for Phase 1 Implementation  
**Last Updated:** March 1, 2026  
**Next Step:** Update app/globals.css with extended design tokens
