---
name: web-design
description: Professional web design guidance covering design systems, color theory, typography, spacing, layout patterns, and UI/UX principles. Use this to create polished, accessible, non-generic web interfaces that developers can implement confidently.
---

# Web Design Skill

Panduan lengkap untuk membuat web design yang profesional, accessible, dan tidak terlihat seperti template generik AI.

## Core Principles: Hindari "AI Slop"

**Ciri-ciri AI slop yang harus dihindari:**
- Gradient overload (terutama purple-blue-pink)
- Blur effects berlebihan
- Spacing tidak konsisten
- Typography hierarchy lemah
- Color contrast buruk
- Layout yang "symmetrical perfect" tapi membosankan
- Animasi tidak purposeful

**Prinsip desain yang kuat:**
- **Hierarchy yang jelas** — mata tahu kemana harus melihat
- **Whitespace purposeful** — bukan cuma "padding besar"
- **Consistency** — pattern yang predictable
- **Contrast intentional** — bukan semuanya "soft"
- **Typography readable** — bukan cuma "looks cool"

---

## 1. Design System Foundation

### 1.1 Spacing Scale (8pt Grid System)

Gunakan multipliers dari base unit (4px atau 8px):

```css
/* Spacing tokens — 8px base */
--space-1: 0.25rem;  /* 4px  - tight gaps */
--space-2: 0.5rem;   /* 8px  - small padding */
--space-3: 0.75rem;  /* 12px - default gap */
--space-4: 1rem;     /* 16px - standard padding */
--space-5: 1.5rem;   /* 24px - section padding */
--space-6: 2rem;     /* 32px - card padding */
--space-8: 3rem;     /* 48px - section margin */
--space-10: 4rem;    /* 64px - large spacing */
--space-12: 6rem;    /* 96px - hero spacing */
```

**Aturan penggunaan:**
- Gunakan `--space-4` (16px) sebagai default padding
- Gap antar elemen: `--space-3` atau `--space-4`
- Section spacing: minimum `--space-8`
- Jangan gunakan arbitrary values (e.g., `13px`, `19px`)

### 1.2 Breakpoint System

```css
/* Mobile-first breakpoints */
--breakpoint-sm: 640px;   /* Phone landscape */
--breakpoint-md: 768px;   /* Tablet portrait */
--breakpoint-lg: 1024px;  /* Tablet landscape / small desktop */
--breakpoint-xl: 1280px;  /* Desktop */
--breakpoint-2xl: 1536px; /* Large desktop */

/* Container max-widths */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
```

**Implementation pattern:**
```css
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin-inline: auto;
  padding-inline: var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding-inline: var(--space-6);
  }
}
```

---

## 2. Color System

### 2.1 Semantic Color Palette

**Hindari:**
- Single-hue palette (semua shades dari satu warna)
- Pure black `#000000` (terlalu harsh)
- Pure white text on colored backgrounds

**Gunakan:**
```css
/* Base colors — pilih 1-2 brand colors */
--color-primary-50: #f0f9ff;
--color-primary-100: #e0f2fe;
--color-primary-200: #bae6fd;
--color-primary-300: #7dd3fc;
--color-primary-400: #38bdf8;
--color-primary-500: #0ea5e9;  /* Main brand color */
--color-primary-600: #0284c7;  /* Hover state */
--color-primary-700: #0369a1;
--color-primary-800: #075985;
--color-primary-900: #0c4a6e;

/* Neutrals — warm atau cool, bukan pure gray */
--color-neutral-50: #fafaf9;   /* Warm gray */
--color-neutral-100: #f5f5f4;
--color-neutral-200: #e7e5e4;
--color-neutral-300: #d6d3d1;
--color-neutral-400: #a8a29e;
--color-neutral-500: #78716c;
--color-neutral-600: #57534e;
--color-neutral-700: #44403c;
--color-neutral-800: #292524;  /* Prefer over pure black */
--color-neutral-900: #1c1917;

/* Semantic colors */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;

/* Surfaces */
--color-background: #ffffff;
--color-surface: var(--color-neutral-50);
--color-border: var(--color-neutral-200);
```

### 2.2 Accessibility (WCAG AA minimum)

**Contrast ratios:**
- Normal text (16px+): minimum 4.5:1
- Large text (24px+ or 19px+ bold): minimum 3:1
- Interactive elements: minimum 3:1

**Check dengan:**
```bash
# Online tools
https://webaim.org/resources/contrastchecker/
https://contrast-ratio.com/
```

**Safe combinations:**
- Dark text: `--color-neutral-800` on `--color-background`
- Light text: `--color-neutral-50` on `--color-primary-600`
- Subtle text: `--color-neutral-600` (secondary content only)

### 2.3 Dark Mode Pattern

```css
:root {
  --color-text: var(--color-neutral-800);
  --color-bg: #ffffff;
  --color-surface: var(--color-neutral-50);
  --color-border: var(--color-neutral-200);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-text: var(--color-neutral-100);
    --color-bg: var(--color-neutral-900);
    --color-surface: var(--color-neutral-800);
    --color-border: var(--color-neutral-700);
  }
}

/* Usage */
body {
  background: var(--color-bg);
  color: var(--color-text);
}
```

---

## 3. Typography

### 3.1 Type Scale (Perfect Fourth — 1.333 ratio)

```css
/* Font families */
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;

/* Type scale */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */

/* Line heights */
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

/* Font weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 3.2 Typography Hierarchy

```css
/* Headings */
h1 {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;  /* Tighter tracking for large text */
}

h2 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.01em;
}

h3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
}

/* Body text */
p {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  max-width: 65ch;  /* Optimal reading length */
}

/* Small text */
.text-secondary {
  font-size: var(--text-sm);
  color: var(--color-neutral-600);
}

/* Code */
code {
  font-family: var(--font-mono);
  font-size: 0.875em;  /* Relative to parent */
  background: var(--color-surface);
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
}
```

### 3.3 Aturan Readability

- **Line length:** 50-75 karakter untuk body text (max `65ch`)
- **Line height:** 1.5-1.75 untuk paragraf
- **Paragraph spacing:** `1em` antar paragraf
- **Font size minimum:** 16px untuk body text (mobile)
- **Contrast:** minimum 4.5:1 untuk readability

---

## 4. Layout & Composition

### 4.1 Grid System

**12-column grid:**
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-4);
}

/* Span utilities */
.col-span-6 { grid-column: span 6; }
.col-span-4 { grid-column: span 4; }
.col-span-3 { grid-column: span 3; }

/* Responsive */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
  .col-span-6,
  .col-span-4,
  .col-span-3 {
    grid-column: span 1;
  }
}
```

### 4.2 Flexbox Patterns

**Card layout:**
```css
.card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.card-body {
  flex: 1;  /* Grow to fill space */
}

.card-footer {
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
}
```

**Sidebar layout:**
```css
.layout-with-sidebar {
  display: flex;
  gap: var(--space-6);
  min-height: 100vh;
}

.sidebar {
  width: 16rem;
  flex-shrink: 0;
}

.main-content {
  flex: 1;
  min-width: 0;  /* Prevent overflow */
}

@media (max-width: 1024px) {
  .layout-with-sidebar {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
}
```

### 4.3 Visual Hierarchy

**Z-index scale:**
```css
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1100;
--z-fixed: 1200;
--z-modal-backdrop: 1300;
--z-modal: 1400;
--z-popover: 1500;
--z-tooltip: 1600;
```

**Elevation system (box-shadow):**
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

/* Usage */
.card { box-shadow: var(--shadow-base); }
.dropdown { box-shadow: var(--shadow-lg); }
.modal { box-shadow: var(--shadow-xl); }
```

---

## 5. Component Patterns

### 5.1 Buttons

```css
/* Base button */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  line-height: 1;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 150ms ease;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.btn-primary {
  background: var(--color-primary-600);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-primary-700);
}

.btn-secondary {
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-text);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--color-surface);
}

.btn-ghost {
  background: transparent;
  color: var(--color-neutral-700);
}

.btn-ghost:hover:not(:disabled) {
  background: var(--color-surface);
}

/* Sizes */
.btn-sm {
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
}

.btn-lg {
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-lg);
}
```

### 5.2 Form Inputs

```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  line-height: 1.5;
  color: var(--color-text);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  transition: all 150ms ease;
}

.input:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-color: var(--color-primary-500);
}

.input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--color-surface);
}

.input::placeholder {
  color: var(--color-neutral-400);
}

/* Error state */
.input-error {
  border-color: var(--color-error);
}

.input-error:focus {
  outline-color: var(--color-error);
}

/* Form group */
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text);
}

.form-hint {
  font-size: var(--text-sm);
  color: var(--color-neutral-600);
}

.form-error {
  font-size: var(--text-sm);
  color: var(--color-error);
}
```

### 5.3 Cards

```css
.card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transition: box-shadow 200ms ease;
}

.card-compact {
  padding: var(--space-4);
}

.card-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-3);
}

.card-description {
  font-size: var(--text-sm);
  color: var(--color-neutral-600);
  margin-bottom: var(--space-4);
}
```

---

## 6. UI/UX Best Practices

### 6.1 Interaction States

**Semua interactive elements harus punya 5 states:**
1. **Default** — state awal
2. **Hover** — cursor di atas element
3. **Active/Pressed** — sedang diklik
4. **Focus** — keyboard navigation
5. **Disabled** — tidak bisa diinteraksi

```css
/* Example: button states */
.button {
  /* Default */
  background: var(--color-primary-600);
  transform: scale(1);
}

.button:hover {
  /* Hover */
  background: var(--color-primary-700);
}

.button:active {
  /* Active */
  transform: scale(0.98);
}

.button:focus-visible {
  /* Focus */
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.button:disabled {
  /* Disabled */
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 6.2 Loading States

**Jangan gunakan generic spinner di semua tempat:**

```css
/* Skeleton loader untuk content */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-neutral-200) 25%,
    var(--color-neutral-100) 50%,
    var(--color-neutral-200) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: 0.25rem;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Inline loader untuk buttons */
.btn.is-loading {
  position: relative;
  color: transparent;
}

.btn.is-loading::after {
  content: '';
  position: absolute;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### 6.3 Empty States

**Jangan cuma tulis "No data":**

```html
<!-- Bad -->
<div class="empty">No data</div>

<!-- Good -->
<div class="empty-state">
  <div class="empty-icon">
    <!-- Icon atau illustration -->
  </div>
  <h3 class="empty-title">No projects yet</h3>
  <p class="empty-description">
    Create your first project to get started
  </p>
  <button class="btn-primary">Create Project</button>
</div>
```

### 6.4 Error Messages

**Gunakan progressive disclosure:**

```html
<!-- Simple error -->
<div class="alert alert-error">
  <span>Failed to save changes</span>
  <button>Retry</button>
</div>

<!-- Detailed error (expandable) -->
<div class="alert alert-error">
  <div class="alert-content">
    <span>Failed to save changes</span>
    <button class="btn-link">Show details</button>
  </div>
  <details class="alert-details">
    <summary>Technical details</summary>
    <pre><code>Error: Network timeout after 30s...</code></pre>
  </details>
</div>
```

---

## 7. Animation & Motion

### 7.1 Timing Functions

```css
/* Easing variables */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Duration scale */
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 350ms;
```

### 7.2 Purposeful Animation

**DO:**
- Animate layout shifts (collapsing sidebar)
- Feedback animations (button press, hover)
- State transitions (loading → success)
- Drawing attention (new notification)

**DON'T:**
- Animate everything on scroll
- Use animations >500ms (feels slow)
- Auto-play hero animations
- Distract from primary content

```css
/* Good: subtle hover feedback */
.card {
  transition: transform var(--duration-fast) var(--ease-out);
}

.card:hover {
  transform: translateY(-2px);
}

/* Good: loading state */
.spinner {
  animation: spin 1s linear infinite;
}

/* Bad: distracting */
.hero-title {
  animation: bounce 2s infinite;  /* ❌ Annoying */
}
```

### 7.3 Respect `prefers-reduced-motion`

```css
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

## 8. Accessibility Checklist

### 8.1 Keyboard Navigation

- [ ] Semua interactive elements bisa diakses dengan `Tab`
- [ ] Tab order logical (top → bottom, left → right)
- [ ] Focus indicator visible (outline atau custom style)
- [ ] Modal traps focus (tidak bisa tab keluar)
- [ ] Escape key closes modals/dropdowns

```css
/* Custom focus style */
*:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Hide default outline, ONLY if you provide custom focus style */
*:focus:not(:focus-visible) {
  outline: none;
}
```

### 8.2 Screen Readers

```html
<!-- Use semantic HTML -->
<button>Click me</button>  <!-- ✅ -->
<div onclick="...">Click me</div>  <!-- ❌ -->

<!-- Descriptive labels -->
<button aria-label="Close dialog">×</button>

<!-- Hidden decorative icons -->
<span aria-hidden="true">🎉</span>

<!-- Loading states -->
<div role="status" aria-live="polite">
  Loading...
</div>

<!-- Error announcements -->
<div role="alert" aria-live="assertive">
  Form submission failed
</div>
```

### 8.3 Color & Contrast

- [ ] Text contrast ≥4.5:1 (normal text)
- [ ] Large text contrast ≥3:1 (24px+ or 19px+ bold)
- [ ] Interactive elements contrast ≥3:1
- [ ] Jangan gunakan warna sebagai satu-satunya indicator

```html
<!-- Bad: color only -->
<span style="color: red;">Error</span>

<!-- Good: icon + color -->
<span class="text-error">
  <svg><!-- error icon --></svg>
  Error
</span>
```

---

## 9. Design Patterns Anti-Generic

### 9.1 Personality Through Details

**Gunakan:**
- Custom illustrations (bukan stock photos)
- Micro-interactions (hover effects unik)
- Consistent voice & tone dalam copy
- Unexpected delights (success confetti)

**Contoh: Custom empty state**
```css
.empty-state {
  text-align: center;
  padding: var(--space-12);
}

.empty-illustration {
  /* Bukan generic icon, tapi custom SVG */
  max-width: 240px;
  margin: 0 auto var(--space-6);
  opacity: 0.8;
}

.empty-title {
  font-size: var(--text-2xl);
  margin-bottom: var(--space-3);
  /* Personality: casual tone */
}
```

### 9.2 Asymmetric Layouts

**Hindari "centered + symmetric" di semua halaman:**

```css
/* Instead of always centering... */
.hero {
  max-width: 600px;
  margin: 0 auto;  /* ❌ Predictable */
}

/* Try offset layouts */
.hero {
  max-width: 50ch;
  margin-left: 10%;  /* ✅ Unexpected */
}

/* Or diagonal splits */
.split-section {
  display: grid;
  grid-template-columns: 1fr 1.2fr;  /* ✅ Asymmetric ratio */
}
```

### 9.3 Data Visualization

**Jangan gunakan default chart colors:**

```javascript
// Bad: default blue bars
const chartConfig = {
  colors: ['#3b82f6']
};

// Good: semantic + branded colors
const chartConfig = {
  colors: [
    'var(--color-primary-500)',
    'var(--color-success)',
    'var(--color-warning)'
  ],
  // Add personality
  borderRadius: 4,
  tooltip: {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }
};
```

---

## 10. Developer Handoff Checklist

### 10.1 Design Tokens Export

Sertakan file tokens yang bisa langsung dipakai:

```css
/* design-tokens.css */
:root {
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  /* ... dst */

  /* Colors */
  --color-primary-500: #0ea5e9;
  /* ... dst */

  /* Typography */
  --text-base: 1rem;
  --font-sans: system-ui, sans-serif;
  /* ... dst */
}
```

### 10.2 Component Specifications

Untuk setiap component, document:
- **States:** default, hover, active, focus, disabled
- **Variants:** sizes (sm, md, lg), colors (primary, secondary)
- **Spacing:** padding, margin, gap
- **Responsive behavior:** breakpoint changes

```markdown
## Button Component

### Variants
- `btn-primary`: Main call-to-action
- `btn-secondary`: Secondary actions
- `btn-ghost`: Tertiary/text buttons

### Sizes
- `btn-sm`: padding 0.5rem 0.75rem, text 0.875rem
- `btn-md`: padding 0.75rem 1rem, text 1rem (default)
- `btn-lg`: padding 1rem 1.5rem, text 1.125rem

### States
- Hover: darken 10%, shadow-md
- Active: scale(0.98)
- Focus: outline 2px primary-500, offset 2px
- Disabled: opacity 0.5, cursor not-allowed
```

### 10.3 Accessibility Notes

```markdown
## Accessibility Requirements

### Keyboard
- Tab order follows visual flow
- Enter/Space activates buttons
- Escape closes modals

### Screen Readers
- All images have alt text
- Form inputs have labels (visible or aria-label)
- Error messages announced with role="alert"

### Color Contrast
- All text meets WCAG AA (4.5:1)
- Focus indicators visible (3:1 against background)
```

---

## 11. Tools & Resources

### 11.1 Color Tools
- **Contrast checker:** https://webaim.org/resources/contrastchecker/
- **Palette generator:** https://coolors.co/
- **Accessibility check:** https://accessibilityinsights.io/

### 11.2 Typography
- **Type scale calculator:** https://typescale.com/
- **Font pairing:** https://fontpair.co/
- **System fonts:** https://systemfontstack.com/

### 11.3 Spacing & Layout
- **8pt grid guide:** https://spec.fm/specifics/8-pt-grid
- **Layout patterns:** https://every-layout.dev/
- **Flexbox guide:** https://css-tricks.com/snippets/css/a-guide-to-flexbox/

### 11.4 Component Libraries (untuk referensi)
- **Shadcn UI:** https://ui.shadcn.com/
- **Radix UI:** https://www.radix-ui.com/ (unstyled, accessible)
- **Tailwind UI:** https://tailwindui.com/ (premium, high quality)

### 11.5 Inspiration (tapi jangan copy mentah-mentah)
- **Dribbble:** https://dribbble.com/ (UI inspiration)
- **Behance:** https://www.behance.net/ (case studies)
- **Land-book:** https://land-book.com/ (landing pages)

---

## 12. Quick Reference: Common Mistakes

| ❌ Jangan | ✅ Lakukan |
|-----------|------------|
| Pure black text `#000` | `--color-neutral-800` |
| Centered layout semua halaman | Variasi alignment |
| Single brand color + grays | 2 brand colors + warm/cool neutrals |
| `padding: 13px` | `padding: var(--space-3)` |
| Default blue links | Branded link colors |
| Spinner di semua loading states | Context-aware loaders (skeleton, inline) |
| "No data" empty states | Illustrated + actionable empty states |
| Click handler di `<div>` | Semantic `<button>` |
| Color-only error indicators | Icon + color + text |
| Auto-play animations | User-triggered or subtle micro-interactions |

---

## Usage Pattern

Saat membuat web design baru:

1. **Start with tokens** — define spacing, colors, typography dulu
2. **Build components** — button, input, card dengan variants
3. **Test accessibility** — keyboard nav, contrast, screen readers
4. **Add personality** — custom illustrations, micro-interactions
5. **Document for devs** — export tokens, component specs, a11y notes

Saat review existing design:
```bash
# Checklist cepat
- [ ] Spacing konsisten (8pt grid)?
- [ ] Contrast text ≥4.5:1?
- [ ] Focus states visible?
- [ ] Typography hierarchy jelas?
- [ ] Loading/error states designed?
- [ ] Responsive di 3 breakpoints?
- [ ] Tidak over-animated?
```

**Result:** Web design yang professional, accessible, dan memiliki personality — bukan AI slop generik.
