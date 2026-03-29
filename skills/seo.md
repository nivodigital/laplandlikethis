# SEO Skill — Lapland Like This

## Read This First
This skill defines SEO rules for laplandlikethis.com. Read this entire file before
writing any meta tags, page titles, headings, copy, or schema markup. Apply every
rule on every page. No exceptions.

---

## The Site's SEO Opportunity

Lapland Like This has a rare competitive advantage: a real family who **lives** in
Levi, Finnish Lapland. The SEO strategy is built around owning the high-intent,
decision-stage searches that package holiday sites and tourism boards cannot answer
honestly. We are not competing on volume — we are competing on trust and specificity.

### Primary search intents to own:
- "Where should I go in Lapland" — decision/comparison intent
- "Levi vs Rovaniemi" — comparison intent
- "Where to stay in Lapland" — accommodation intent
- "Best Lapland experience" — quality/recommendation intent
- "Lapland with kids" — family travel intent
- "When to go to Lapland for northern lights" — timing intent
- "Lapland travel guide" — planning intent
- "Lapland itinerary" — planning intent
- "Is Lapland worth it" — validation intent

---

## Page Titles

### Format
```
[Primary keyword] — Lapland Like This
```

### Rules
- 50–60 characters maximum including the brand name
- Primary keyword goes first — not the brand name
- Never use pipe `|` — always use em dash `—`
- Never stuff multiple keywords in — one clear topic per title
- Must be unique across every page on the site

### Examples by page
```
index.html:
Where Should I Go in Lapland? — Lapland Like This

about.html:
About Us — A Family Living in Levi, Finnish Lapland — Lapland Like This

destinations/levi.html:
Levi Lapland Guide — Honest Advice from People Who Live Here — Lapland Like This

destinations/rovaniemi.html:
Rovaniemi Travel Guide — What to Do, See and Avoid — Lapland Like This

destinations/saariselka.html:
Saariselkä Guide — Northern Lights, Aurora and Arctic Wilderness — Lapland Like This

destinations/yllas.html:
Ylläs Lapland — The Quieter Alternative to Levi — Lapland Like This

guides/when-to-go.html:
When to Go to Lapland — Season by Season Guide — Lapland Like This

guides/lapland-with-kids.html:
Lapland with Kids — Honest Family Travel Guide — Lapland Like This

guides/what-to-pack.html:
What to Pack for Lapland — Arctic Winter Packing List — Lapland Like This
```

---

## Meta Descriptions

### Rules
- 140–155 characters maximum
- Must include the primary keyword naturally — not forced
- Write for the human first, the algorithm second
- Must create a reason to click — what will they learn that they can't get elsewhere?
- Our differentiator: we live here, we're honest, we have no commercial agenda
- Never duplicate a meta description across pages
- Never use "click here", "learn more" or generic CTAs

### Formula
```
[What the page answers] + [why our answer is different] + [specific hook]
```

### Examples
```
index.html:
Where should you go in Lapland? We moved our family of five from Bristol to Levi in 
2023. Honest answers, real flight routes, no agenda.
(153 chars)

destinations/levi.html:
Levi is our home — we live here. Honest guide to flights, activities, where to stay 
and what's genuinely worth the money.
(122 chars)

destinations/rovaniemi.html:
Rovaniemi is Lapland's busiest gateway — but there are traps. Our honest guide to 
what's worth it and what to skip.
(116 chars)

guides/lapland-with-kids.html:
We moved to Lapland with a 1, 3 and 7-year-old. What we know about Lapland with kids 
that no travel blog will tell you.
(120 chars)
```

---

## Heading Structure

### Rules
- One `<h1>` per page — contains the primary keyword, written naturally
- `<h1>` should match or closely mirror the page title
- `<h2>` for major sections — written for humans, not keyword-stuffed
- `<h3>` for subsections within an `<h2>` area
- Never skip heading levels (don't go h1 → h3)
- Headings should read like a table of contents if extracted — logical, clear flow
- Never bold a line of body text as a substitute for a heading

### H1 examples by page
```html
<!-- index.html -->
<h1>Where should I go in Lapland?</h1>

<!-- destinations/levi.html -->
<h1>Levi — our honest guide to Finnish Lapland's best-connected resort</h1>

<!-- destinations/rovaniemi.html -->
<h1>Rovaniemi — the gateway to Lapland and where most people start</h1>

<!-- guides/lapland-with-kids.html -->
<h1>Lapland with kids — what we know from living here with three boys</h1>

<!-- guides/when-to-go.html -->
<h1>When to go to Lapland — the honest season-by-season guide</h1>
```

### H2 examples (destination page)
```html
<h2>Why Levi suits most travellers</h2>
<h2>How to get to Levi — flights and transfers</h2>
<h2>Where to stay in Levi</h2>
<h2>What's actually worth doing</h2>
<h2>What to skip (and why)</h2>
<h2>Levi in different seasons</h2>
<h2>Levi vs Rovaniemi — which is right for you</h2>
```

---

## Keyword Usage in Body Copy

### Rules
- Primary keyword in the first 100 words of body copy — naturally, not forced
- Use semantic variations — don't repeat exact keyword phrases robotically
- Keyword density: don't think about it. Write honest, useful copy and it happens naturally
- Internal links: every page should link to at least 2 other pages on the site
- Anchor text: use descriptive anchors, never "click here" or "read more"

### Semantic variations to use naturally
```
Primary: "Lapland" 
Variations: Finnish Lapland, Arctic Finland, northern Finland, Lapland Finland

Primary: "where to go in Lapland"
Variations: best destination in Lapland, which resort in Lapland, Lapland destination guide

Primary: "Levi"
Variations: Levi ski resort, Levi Finland, Levi fell resort, Kittilä region

Primary: "northern lights"
Variations: aurora borealis, aurora, northern lights Finland, aurora in Lapland
```

---

## Internal Linking Rules

Every page must link to at least 2 others. Priority links:

```
Every destination page → index.html#tool (trip builder)
Every destination page → at least one other destination page
Every guide page → relevant destination page
index.html → about.html (via story section)
about.html → index.html#tool (via CTA)
```

### Anchor text examples
```html
<!-- Good -->
<a href="destinations/levi.html">our honest guide to Levi</a>
<a href="destinations/rovaniemi.html">how Rovaniemi compares</a>
<a href="index.html#tool">find which destination suits you</a>
<a href="guides/when-to-go.html">when to go to Lapland for aurora</a>

<!-- Bad — never do these -->
<a href="destinations/levi.html">click here</a>
<a href="destinations/levi.html">read more</a>
<a href="destinations/levi.html">this page</a>
```

---

## Schema Markup

Add the following schema to every page inside a `<script type="application/ld+json">` 
block in the `<head>`. Adjust per page.

### Site-wide organisation schema (add to every page)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Lapland Like This",
  "url": "https://laplandlikethis.com",
  "description": "Honest Lapland travel guidance from a family living in Levi, Finnish Lapland.",
  "foundingLocation": {
    "@type": "Place",
    "name": "Levi, Finnish Lapland, Finland"
  }
}
</script>
```

### Homepage schema
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Lapland Like This",
  "url": "https://laplandlikethis.com",
  "description": "Where should I go in Lapland? Honest travel guidance from a family living in Levi, Finnish Lapland.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://laplandlikethis.com/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### Destination page schema (example: Levi)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TravelGuide",
  "name": "Levi Lapland Guide",
  "url": "https://laplandlikethis.com/destinations/levi.html",
  "description": "Honest guide to Levi, Finnish Lapland — flights, activities, where to stay and what's worth the money.",
  "about": {
    "@type": "TouristDestination",
    "name": "Levi",
    "containedInPlace": {
      "@type": "Place",
      "name": "Finnish Lapland, Finland"
    }
  },
  "author": {
    "@type": "Person",
    "name": "Colin",
    "jobTitle": "Resident of Levi, Finnish Lapland"
  }
}
</script>
```

### Guide page schema (example: when to go)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "When to Go to Lapland — Season by Season Guide",
  "url": "https://laplandlikethis.com/guides/when-to-go.html",
  "author": {
    "@type": "Person",
    "name": "Colin",
    "jobTitle": "Resident of Levi, Finnish Lapland since 2023"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Lapland Like This",
    "url": "https://laplandlikethis.com"
  },
  "description": "When is the best time to visit Lapland? Honest season-by-season guide from a family living in Levi, Finnish Lapland."
}
</script>
```

### FAQ schema (use on pages with Q&A sections)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where should I go in Lapland?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on what you want. Levi is the best-connected resort with direct flights from across Europe and no hire car needed. Rovaniemi is the easiest gateway with the most flight options. Saariselkä is the best for northern lights. Use our trip builder to find which suits you."
      }
    },
    {
      "@type": "Question", 
      "name": "What is the best time to visit Lapland?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "January to March is the best overall. You get guaranteed snow, the best aurora odds, and the full winter experience. December is good for Christmas atmosphere but aurora odds are lower. March and April offer sunshine with snow still on the ground — underrated."
      }
    },
    {
      "@type": "Question",
      "name": "Is Levi or Rovaniemi better?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Levi is better if you want to fly directly into a resort with no hire car, or if skiing is part of the trip. Rovaniemi is better if you want the widest choice of flights, a proper city base, or the Santa experience. We live in Levi — but Rovaniemi is right for many travellers."
      }
    }
  ]
}
</script>
```

---

## Image SEO

### File naming
```
✓ levi-lapland-winter-snow.jpg
✓ rovaniemi-northern-lights-aurora.jpg
✓ colin-livi-family-levi-finland.jpg
✗ IMG_4821.jpg
✗ photo1.jpg
✗ image-final-v2.jpg
```

### Alt text rules
- Descriptive, specific, natural — written for someone who cannot see the image
- Include location where relevant
- Never keyword-stuff
- Never start with "image of" or "photo of"

```html
<!-- Good -->
<img src="images/levi-fell-winter.jpg" 
     alt="Levi fell covered in snow at dusk, Finnish Lapland">

<img src="images/family-levi.jpg" 
     alt="Colin, Livi and their three boys on the fell above Levi village">

<img src="images/northern-lights-levi.jpg" 
     alt="Northern lights over the pine forest near Levi, January">

<!-- Bad -->
<img src="images/levi.jpg" alt="Levi Lapland travel guide best resort Finland">
<img src="images/aurora.jpg" alt="image of northern lights">
```

---

## URL Structure

```
laplandlikethis.com/                          ← homepage
laplandlikethis.com/about                     ← about us
laplandlikethis.com/destinations/levi         ← destination pages
laplandlikethis.com/destinations/rovaniemi
laplandlikethis.com/destinations/saariselka
laplandlikethis.com/destinations/yllas
laplandlikethis.com/guides/when-to-go
laplandlikethis.com/guides/lapland-with-kids
laplandlikethis.com/guides/what-to-pack
```

### Rules
- Lowercase only
- Hyphens not underscores
- No trailing slashes in links
- No dates in URLs
- Keep them short and descriptive

---

## Technical SEO Checklist

Add to every page `<head>`:

```html
<!-- Canonical URL — prevents duplicate content issues -->
<link rel="canonical" href="https://laplandlikethis.com/[page-path]">

<!-- Open Graph — controls how the page looks when shared on social -->
<meta property="og:title" content="[Page title]">
<meta property="og:description" content="[Meta description]">
<meta property="og:url" content="https://laplandlikethis.com/[page-path]">
<meta property="og:type" content="website">
<meta property="og:image" content="https://laplandlikethis.com/images/og-default.jpg">
<meta property="og:site_name" content="Lapland Like This">

<!-- Twitter/X card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Page title]">
<meta name="twitter:description" content="[Meta description]">
<meta name="twitter:image" content="https://laplandlikethis.com/images/og-default.jpg">

<!-- Language -->
<meta name="language" content="English">
<html lang="en">
```

---

## What Google Will Reward This Site For

These are the genuine advantages — lean into them in every page:

1. **First-hand experience** — Colin and Livi live in Levi. Hugo, Rowan and Finley go to Finnish school. This is E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) at its most genuine.

2. **No commercial bias** — no affiliate links, no tour operator deals. Google increasingly rewards content that exists to inform rather than convert.

3. **Specific, honest opinions** — "the Santa village at the airport is a theme park — go 40 minutes out instead" is the kind of specific, useful, opinionated content that earns backlinks and trust.

4. **Answering questions others won't** — "Is the glass igloo worth it?", "Levi vs Rovaniemi — which is actually better?", "What's Lapland really like with a toddler?" Answer these honestly and you own them.

5. **Local knowledge** — knowing which local operators are worth it, which routes save money, what the seasons actually feel like. This cannot be faked or replicated by a site that hasn't been there.

---

## Hard Rules — Never Do These

- Never write a title tag over 60 characters
- Never duplicate a title or meta description across two pages  
- Never use `<h1>` more than once per page
- Never skip heading levels
- Never use keyword-stuffed anchor text
- Never add schema markup you haven't verified is accurate
- Never write alt text that starts with "image of" or "photo of"
- Never create a page without a canonical tag once the domain is live
- Never name an image file with camera-generated names (IMG_xxxx)
