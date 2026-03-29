# CLAUDE.md — Lapland Like This · Frontend Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- **Check `brand_assets/`** for logos, photos, or updated colour values before starting any page.

---

## Project Stack
- **Pure HTML + custom CSS** — no frameworks, no Tailwind, no build step
- All styles are written in `<style>` blocks within each HTML file
- JavaScript is vanilla, inline in `<script>` blocks at the bottom of each file
- No npm, no node_modules, no bundler

---

## File Structure
```
lapland-like-this/
├── index.html              ← Homepage + trip builder tool
├── about.html              ← About Us (Colin, Livi, Hugo, Rowan, Finley)
├── destinations/
│   ├── levi.html
│   ├── rovaniemi.html
│   ├── saariselka.html
│   └── yllas.html
├── guides/
│   ├── when-to-go.html
│   ├── lapland-with-kids.html
│   └── what-to-pack.html
├── images/                 ← All photos go here
├── brand_assets/           ← Logos, colour swatches, style refs
├── serve.mjs               ← Local dev server (localhost:3000)
├── screenshot.mjs          ← Puppeteer screenshot tool
└── CLAUDE.md               ← This file
```

---

## Brand Tokens — Always Use These
```css
--forest:     #1F3D2B;   /* Primary — deep forest green */
--forest-mid: #2A5239;   /* Hover states, elevated surfaces */
--forest-lt:  #3B6B4A;   /* Eyebrows, accents, muted green text */
--snow:       #F5F7F6;   /* Primary light background + text on dark */
--snow-dim:   #E8EBE9;   /* Secondary light background */
--off:        #F0F2F0;   /* Tertiary background (alternating sections) */
--amber:      #D9A441;   /* Primary CTA, highlights, accents */
--amber-lt:   #F0C06A;   /* Hover state for amber, italic headlines */
--amber-dim:  rgba(217,164,65,0.15); /* Amber backgrounds / badges */
--charcoal:   #2B2B2B;   /* Body text on light backgrounds */
--serif:      'Fraunces', Georgia, serif;
--sans:       'DM Sans', system-ui, sans-serif;
```

**Never invent new colours.** If something feels like it needs a new colour, use an opacity variant of an existing token.

---

## Typography Rules
- **Display headings:** `font-family: var(--serif)`, `font-weight: 300`, `letter-spacing: -0.02em`
- **Italic emphasis in headlines:** `font-style: italic`, `color: var(--amber-lt)` on dark or `color: var(--forest-lt)` on light
- **Eyebrows (section labels):** `font-size: 11px`, `letter-spacing: 0.14em`, `text-transform: uppercase`, `font-weight: 500`
- **Body text:** `font-family: var(--sans)`, `font-size: 15px`, `line-height: 1.9`, `color: #444`
- **Small labels / meta:** `font-size: 11–12px`, `color: var(--light-text)` or muted opacity
- Google Fonts import: `Fraunces` (300, 400, 500, italic) + `DM Sans` (300, 400, 500)

---

## Component Patterns

### Section eyebrow
```html
<div class="section-eyebrow">Label text</div>
```
```css
.section-eyebrow {
  font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
  color: var(--forest-lt); font-weight: 500;
  display: flex; align-items: center; gap: 10px; margin-bottom: 1.25rem;
}
.section-eyebrow::before {
  content: ''; display: block; width: 24px; height: 1px; background: var(--forest-lt);
}
```
On dark backgrounds: change color and `::before` background to `rgba(217,164,65,0.7)`

### Buttons
```css
/* Primary (amber) */
.btn-primary { background: var(--amber); color: var(--forest); border: none; border-radius: 8px; padding: 1rem 2rem; font-family: var(--sans); font-size: 14px; font-weight: 500; cursor: pointer; transition: background .2s, transform .2s; text-decoration: none; display: inline-block; }
.btn-primary:hover { background: var(--amber-lt); transform: translateY(-2px); }

/* Ghost on dark */
.btn-ghost { background: transparent; color: rgba(245,247,246,.75); border: 1px solid rgba(245,247,246,.25); border-radius: 8px; padding: 1rem 1.75rem; transition: all .2s; }
.btn-ghost:hover { border-color: rgba(245,247,246,.5); color: var(--snow); }

/* Outline on light */
.btn-outline { background: transparent; color: #555; border: 1px solid rgba(31,61,43,.2); border-radius: 8px; padding: 1rem 1.75rem; transition: all .2s; }
.btn-outline:hover { border-color: var(--forest); color: var(--forest); }
```

### Pull quote
```html
<blockquote class="pull-quote">Text here</blockquote>
```
```css
.pull-quote { border-left: 3px solid var(--amber); padding: .9rem 0 .9rem 1.25rem; margin: 2rem 0; font-family: var(--serif); font-size: 1.1rem; font-style: italic; color: var(--forest); line-height: 1.6; }
```

### Scroll reveal
```html
<div class="reveal">...</div>          <!-- fades in on scroll -->
<div class="reveal rd1">...</div>      <!-- 0.1s delay -->
<div class="reveal rd2">...</div>      <!-- 0.2s delay -->
<div class="reveal rd3">...</div>      <!-- 0.3s delay -->
```
```css
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
.reveal.visible { opacity: 1; transform: translateY(0); }
.rd1 { transition-delay: .1s; } .rd2 { transition-delay: .2s; } .rd3 { transition-delay: .3s; }
```
```js
const obs = new IntersectionObserver(e => { e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible') }) }, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
```

### Nav (fixed, dark)
```html
<nav>
  <a href="index.html" class="nav-logo">Lapland <span>Like This</span></a>
  <div class="nav-links">
    <a href="index.html#destinations">Destinations</a>
    <a href="index.html#tool">Trip builder</a>
    <a href="about.html">About us</a>
    <a href="index.html#tool" class="nav-cta">Plan my trip</a>
  </div>
</nav>
```
```css
nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.25rem 2rem; display: flex; justify-content: space-between; align-items: center; background: rgba(31,61,43,0.97); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(245,247,246,0.08); }
.nav-logo { font-family: var(--serif); font-size: 1.1rem; font-weight: 400; color: var(--snow); text-decoration: none; }
.nav-logo span { color: var(--amber); }
.nav-links { display: flex; gap: 2rem; align-items: center; }
.nav-links a { font-size: 13px; color: rgba(245,247,246,0.7); text-decoration: none; transition: color .2s; }
.nav-links a:hover { color: var(--snow); }
.nav-cta { background: var(--amber) !important; color: var(--forest) !important; padding: .55rem 1.25rem; border-radius: 6px; font-weight: 500 !important; }
```

### Footer
```html
<footer>
  <div class="footer-logo">Lapland <span>Like This</span></div>
  <div class="footer-links">
    <a href="destinations/levi.html">Levi</a>
    <a href="destinations/rovaniemi.html">Rovaniemi</a>
    <a href="index.html#tool">Trip builder</a>
    <a href="about.html">About us</a>
    <a href="#">Privacy</a>
  </div>
  <div class="footer-note">© 2025 Lapland Like This · Levi, Finnish Lapland</div>
</footer>
```
```css
footer { background: #111C14; padding: 3rem 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem; border-bottom: 1px solid rgba(245,247,246,.06); }
.footer-logo { font-family: var(--serif); font-size: 1rem; color: rgba(245,247,246,.5); }
.footer-logo span { color: var(--amber); }
.footer-links { display: flex; gap: 1.75rem; flex-wrap: wrap; }
.footer-links a { font-size: 12px; color: rgba(245,247,246,.35); text-decoration: none; transition: color .2s; }
.footer-links a:hover { color: rgba(245,247,246,.65); }
.footer-note { font-size: 11px; color: rgba(245,247,246,.25); }
```

---

## Section Alternation Pattern
Pages alternate background colours between sections:
```
Dark (--forest)  →  Light (--snow)  →  Alt (--off / #F0F2F0)  →  Dark  →  Light...
```
Never put two dark sections or two identical light sections back to back.

---

## Local Server & Screenshots
- Start dev server: `node serve.mjs` (serves at `http://localhost:3000`)
- Screenshot: `node screenshot.mjs http://localhost:3000`
- Screenshots save to `./temporary screenshots/screenshot-N.png`
- **Always screenshot from localhost, never from file:///**
- Update Puppeteer path in `screenshot.mjs` to match your machine username

---

## Page Template
Every new page starts with this shell:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="[Page description — 150 chars max, include primary keyword]">
<title>[Page title] — Lapland Like This</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --forest:#1F3D2B;--forest-mid:#2A5239;--forest-lt:#3B6B4A;
  --snow:#F5F7F6;--snow-dim:#E8EBE9;--off:#F0F2F0;
  --amber:#D9A441;--amber-lt:#F0C06A;--amber-dim:rgba(217,164,65,0.15);
  --charcoal:#2B2B2B;
  --serif:'Fraunces',Georgia,serif;--sans:'DM Sans',system-ui,sans-serif;
}
html{scroll-behavior:smooth}
body{font-family:var(--sans);background:var(--snow);color:var(--charcoal);overflow-x:hidden}
/* Nav, footer, reveal, buttons — paste from CLAUDE.md component library */
</style>
</head>
<body>
<!-- NAV -->
<!-- PAGE CONTENT -->
<!-- FOOTER -->
<script>
const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible')})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
</script>
</body>
</html>
```

---

## SEO Rules
- Every page needs a unique `<title>` and `<meta name="description">`
- H1 must contain the primary keyword naturally
- Use semantic HTML: `<nav>`, `<section>`, `<article>`, `<footer>`, `<blockquote>`
- Alt text on every image: descriptive, not keyword-stuffed
- Target keywords per page:
  - `index.html` → "where should I go in Lapland", "Lapland travel guide"
  - `about.html` → "Lapland Like This", "family living in Levi Finland"
  - `destinations/levi.html` → "Levi Lapland guide", "Levi Finland travel"
  - `destinations/rovaniemi.html` → "Rovaniemi travel guide", "Rovaniemi vs Levi"

---

## Tone of Voice (apply to all copy)
- Honest, calm, slightly opinionated
- Sounds like someone who lives there, not a travel brochure
- No "must-do", no "magical", no "unforgettable"
- Will say what's not worth the money
- Uses real names: Colin, Livi, Hugo, Rowan, Finley
- Short sentences. No jargon. No hype.

---

## Hard Rules
- Never use Tailwind or any CSS framework
- Never invent brand colours outside the token list
- Never use `transition-all` — always specify the property
- Never put two dark sections back to back
- Never use placeholder copy on destination pages — write real, honest content
- Always include nav and footer on every page
- Always mobile-first: test at 375px, 768px, 1280px
