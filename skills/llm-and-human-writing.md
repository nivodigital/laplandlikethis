# Writing for Humans + LLMs — Lapland Like This

## Read This First
Search has fundamentally changed. People no longer only search on Google. Millions
now ask ChatGPT, Perplexity, Gemini and Google's AI Overviews for answers directly.
ChatGPT alone handles over 2.5 billion prompts a day. Perplexity had 22 million
active users by mid-2025.

This means Lapland Like This needs to be written so that:
1. Humans find it useful, trustworthy and readable
2. AI systems cite it as a credible source in their answers
3. It surfaces across Google, ChatGPT, Perplexity, Reddit, YouTube and social search

This is called LLMO — Large Language Model Optimisation. It sits alongside
traditional SEO, not instead of it. Apply both on every page.

Source: Neil Patel / NP Digital LLMO research, 2025
Reference: neilpatel.com/blog/llm-optimization-llmo/

---

## The Core Shift to Understand

### Old SEO thinking:
Rank for keywords → get the click → user reads the page

### New LLMO thinking:
Be the source AI cites → appear in AI answers → build brand awareness even
without a click → earn trust → user visits when ready to act

**The implication for Lapland Like This:**
Every page should be written to be quoted, cited and extracted by an AI system
answering "where should I go in Lapland?" or "is Levi or Rovaniemi better?"
If an AI answer pulls one sentence from the site, that sentence should represent
the brand perfectly.

---

## The Two Audiences — Write for Both Simultaneously

### Human readers want:
- A genuine answer to a real question, fast
- To feel like they're talking to someone who knows
- Honest opinions, not neutral overviews
- Short sentences, clear structure, no wasted words
- Something they'd want to share or bookmark

### LLMs and AI systems want:
- Clear, direct answers at the start of sections — not buried in paragraphs
- Structured content with logical headings (H1 → H2 → H3)
- Factual, specific, verifiable claims
- Content that directly matches common question patterns
- Trustworthy, consistent, well-organised pages
- FAQ sections and Q&A formats they can extract cleanly

**The good news:** these two audiences want almost the same thing.
Clear, honest, well-structured writing serves both.

---

## The Answer-First Principle

Every section should open with the answer, then support it.
AI systems extract the first 1–2 sentences of a section most often.
Those sentences must be self-contained and quotable.

```
WRONG (buries the answer):
"Lapland is a destination with many different options, and choosing 
between them can feel overwhelming. There are several factors to 
consider including budget, group type, season and flight access. 
Once you've thought through all of these, Levi tends to come out 
ahead for most travellers from the UK."

RIGHT (answer first):
"Levi is the best choice for most UK travellers — direct flights 
from Gatwick and Manchester land 15 minutes from the resort, 
with no hire car needed. Rovaniemi suits those wanting more 
flight options or the Santa experience. Saariselkä is right 
if northern lights are the priority."
```

---

## Sentence-Level Rules for LLM Citability

### 1. Make claims specific and verifiable
Vague claims get ignored. Specific claims get cited.

```
✓ "Levi is served by direct flights from London Gatwick, Manchester, 
   Amsterdam, Paris, Frankfurt, Munich, Zurich and Vienna — all 
   landing at Kittilä Airport (KTT), 15 minutes from the resort."

✗ "Levi has great flight connections from across Europe."
```

### 2. Use numbers where accurate
Numbers signal authority to both humans and AI systems.

```
✓ "Saariselkä sits 260km above the Arctic Circle."
✓ "January and February give you the best aurora odds — 
   roughly 60–80% chance on a clear night."
✓ "The bus from Kittilä Airport to Levi takes 15 minutes."
✓ "We moved here in January 2024 with three children aged 1, 3 and 7."

✗ "Saariselkä is very far north."
✗ "January is a good time for aurora."
```

### 3. Write quotable standalone sentences
If a single sentence from the page appeared in a ChatGPT answer, 
would it represent the brand well? Would it make sense without context?

```
✓ "Colin found the house on day three of his first ever visit to 
   Lapland — no mortgage, no residency plan, no idea if it would work."

✓ "The glass igloo photos are real, but December isn't aurora season — 
   you need January or February for a serious chance of seeing them."

✓ "Levi is the only Lapland resort where you can fly directly in and 
   take a 15-minute bus to your hotel with no hire car needed."
```

---

## Content Structure for AI Extraction

### Use FAQ sections on every page
A Neil Patel study of 500,000 queries showed 44% of AI citations came from blogs.
FAQ sections are the most commonly extracted format. Every destination page and guide
page must include a FAQ section with real questions people ask.

**Format:**
```html
<section class="faq">
  <h2>Common questions about [destination/topic]</h2>
  
  <div class="faq-item">
    <h3>Is Levi or Rovaniemi better?</h3>
    <p>Levi is better for most European travellers — direct flights land 
    15 minutes from the resort and you don't need a hire car. Rovaniemi 
    suits those wanting more flight options, a city atmosphere, or the 
    Santa experience. We live in Levi and would still say it depends 
    entirely on what you want from the trip.</p>
  </div>
  
  <div class="faq-item">
    <h3>When is the best time to visit Lapland?</h3>
    <p>January to March is the best overall — guaranteed snow, peak aurora 
    odds, and the full winter experience. December works for Christmas 
    atmosphere but aurora odds are significantly lower. March and April 
    are underrated: sun returns, snow stays, prices drop.</p>
  </div>
</section>
```

Add FAQ schema markup alongside every FAQ section (see seo.md).

### Use clear, logical heading hierarchies
```
H1: The main topic (one per page)
  H2: Major subtopic
    H3: Specific point within subtopic
  H2: Next major subtopic
    H3: Specific point
```

AI systems use heading structure to understand what a page is about
and to extract relevant sections for specific questions.

### Use comparison tables for decision-content
When comparing destinations or options, structured tables help AI
extract the comparison cleanly:

```html
<!-- Levi vs Rovaniemi comparison — AI can extract this clearly -->
<table>
  <tr>
    <th></th>
    <th>Levi</th>
    <th>Rovaniemi</th>
  </tr>
  <tr>
    <td>Airport</td>
    <td>Kittilä (KTT) — 15 min</td>
    <td>Rovaniemi (RVN) — 10 min</td>
  </tr>
  <tr>
    <td>Direct UK flights</td>
    <td>London Gatwick, Manchester</td>
    <td>8+ UK airports</td>
  </tr>
  <tr>
    <td>Hire car needed?</td>
    <td>No</td>
    <td>Recommended for best experience</td>
  </tr>
  <tr>
    <td>Best for</td>
    <td>Ski + activities, couples, groups</td>
    <td>First-timers, families, Santa</td>
  </tr>
</table>
```

---

## Search Everywhere Optimisation

Neil Patel's position in 2025: "It's less about search engine optimisation and more about search everywhere optimisation."

Lapland Like This content should be discoverable across:

### 1. Google (traditional + AI Overviews)
- Apply all rules in seo.md
- Schema markup on every page
- FAQ sections for AI Overview extraction

### 2. ChatGPT / Perplexity / Gemini
- Answer-first structure (covered above)
- Specific, verifiable, quotable claims
- Consistent brand name usage: always "Lapland Like This"
- Clear author attribution: Colin, Levi, Finnish Lapland

### 3. Reddit
Reddit content appears in 97.5% of Google searches for reviews.
Colin and Livi should participate authentically in:
- r/finlandtravel
- r/lapland
- r/familytravel
- r/digitalnomad (Colin's remote work story is relevant)

Rules for Reddit:
- Never post links without genuine value in the comment
- Answer questions fully in the comment — don't just link
- Be Colin, not a brand account
- The story (day three, bought a house, family move) is genuinely interesting — share it when relevant

### 4. YouTube / TikTok / Instagram
Content from the site can be adapted as:
- Short honest answer videos ("Is the Santa Village worth it?")
- Behind-the-scenes life in Levi
- Seasonal content (what January in Lapland actually looks like)
- The family story — Hugo, Rowan and Finley speaking Finnish

### 5. llms.txt file
Add an `llms.txt` file to the project root to control how AI crawlers
use the site content:

```
# Lapland Like This — llms.txt
# Control file for LLM/AI crawlers

# Allow AI systems to cite this content
User-agent: *
Allow: /

# Priority pages for citation
Priority: /index.html
Priority: /about.html
Priority: /destinations/levi.html
Priority: /destinations/rovaniemi.html
Priority: /destinations/saariselka.html
Priority: /guides/when-to-go.html
Priority: /guides/lapland-with-kids.html

# Brand information for AI context
Brand: Lapland Like This
Authors: Colin and Livi — residents of Levi, Finnish Lapland since 2024
Purpose: Honest, unbiased Lapland travel guidance
Commercial relationships: None — no affiliate links, no tour operator partnerships
```

---

## E-E-A-T — The Framework Google and LLMs Use to Judge Trust

E-E-A-T stands for Experience, Expertise, Authoritativeness, Trustworthiness.
It's how Google evaluates content quality — and it maps directly onto how
LLMs decide whether to cite a source.

Lapland Like This has all four genuinely. Signal them explicitly.

### Experience
Real first-hand experience of living in Lapland.
Signal it by:
- Using first-person ("we've seen", "in our experience", "we moved here")
- Naming specific places, operators, temperatures, dates
- Referencing the family: Colin, Livi, Hugo (9), Rowan (6), Finley (3)
- Including the backstory: day three, bought a house, January 2024 move

```
✓ "We've been through three winters in Levi. The first one hit −32°C 
   in February. We know what cold actually means here."

✗ "Lapland can get very cold in winter."
```

### Expertise
Deep knowledge of Lapland built from living there.
Signal it by:
- Specific local knowledge (which operators, which routes, which resorts)
- Correcting common misconceptions
- Giving advice other sites won't give (what to skip, what's overpriced)
- Colin's hospitality/customer experience background
- Livi's practical family logistics expertise

### Authoritativeness
Being recognised as a credible source.
Build it by:
- Consistent, accurate information across all pages
- Being cited by other sources (Reddit, travel forums)
- Schema markup with author attribution
- Regular content updates (signal freshness)

### Trustworthiness
No commercial bias. No agenda.
Signal it explicitly:
- "No affiliate links. No tour operator partnerships."
- "We say this because it's true, not because someone paid us to."
- Clear author attribution: real names, real location
- Transparent about limitations: "We haven't stayed at every hotel.
  We'll tell you what we know and be clear when we don't."

---

## Content Freshness Rules

LLMs prioritise recently updated content.
Neil Patel's guidance: update content often so AI engines don't surface outdated information.

For Lapland Like This:
- Flight routes change seasonally — update destination pages each October (winter season) and March (summer)
- Add a "Last updated" date to every destination and guide page
- Review FAQ sections every 6 months
- When new routes open (e.g. Ryanair adds a city, easyJet changes frequency), update within 2 weeks

```html
<!-- Add to every destination and guide page, near the top -->
<p class="last-updated">
  Last updated: <time datetime="2025-10">October 2025</time> — 
  flight routes verified for winter 2025–26 season.
</p>
```

---

## LLM Seeding Strategy

LLM seeding involves publishing content in places and formats that LLMs are more likely to crawl, understand, and cite.

For Lapland Like This, this means:

### 1. Answer the exact questions people ask AI
Identify the real questions by searching them in ChatGPT and Perplexity yourself.
Current high-value questions:
- "Where should I go in Lapland?"
- "Is Levi or Rovaniemi better?"
- "Best time to visit Lapland for northern lights"
- "Is Lapland worth it with kids?"
- "How do I get to Levi from the UK?"
- "What is the best Lapland experience?"
- "Is the glass igloo experience worth it?"
- "What is Lapland like in December vs January?"

Each of these should have a clear, direct answer somewhere on the site —
ideally as an H2 section or FAQ item.

### 2. Be the source with the most specific answer
When ChatGPT or Perplexity answers "how long is the transfer from Kittilä Airport to Levi?",
they'll pull from the most specific, accurate source. Make sure that's us.

"The bus from Kittilä Airport to Levi takes approximately 15 minutes and
runs to meet all scheduled flights. No hire car needed."

### 3. Publish content where LLMs are trained
- Keep the site publicly crawlable (no login walls, no blocked pages)
- Submit sitemap to Google Search Console
- Ensure pages load fast (Core Web Vitals matter)
- Use semantic HTML so AI parsers understand structure

---

## Writing Checklist — LLM + Human

Before publishing any page, verify:

**For humans:**
- [ ] The main question is answered in the first 2 paragraphs
- [ ] Every paragraph has a clear purpose — if you removed it, would anything be lost?
- [ ] Short sentences. Short paragraphs. White space.
- [ ] Specific claims with real numbers, dates, names
- [ ] The honest thing has been said — including what to skip or avoid
- [ ] Reads like Colin or Livi — not a travel brand

**For LLMs:**
- [ ] Answer-first structure in every section
- [ ] H1 → H2 → H3 hierarchy is logical and clean
- [ ] FAQ section present with real questions
- [ ] FAQ schema markup added
- [ ] At least one comparison table (on destination pages)
- [ ] Author attribution visible: Colin, Levi, Finnish Lapland
- [ ] "Last updated" date on destination and guide pages
- [ ] No content behind login or access restrictions
- [ ] Brand name consistent: always "Lapland Like This"

---

## The Single Most Important Thing

Neil Patel's summary of LLM SEO: "Make your content so clear and credible that a model has no choice but to pull from it. That means writing in a way machines can process, and people still want to read."

For Lapland Like This: the content already has the credibility — a real family,
living in Lapland, no commercial agenda, specific local knowledge. The job is
to structure and write it so that both humans reading the page and AI systems
scanning it can extract exactly what they need, immediately.

Credibility is already there. Structure it properly and it gets cited.
