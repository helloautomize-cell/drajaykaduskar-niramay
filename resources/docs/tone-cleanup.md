# Tone and style cleanup

Scan of `resources/content/**`, component strings, `lib/site-config.ts` and the
email templates for the prohibited word and pattern list. The site copy was
already written in plain clinic voice, so hits were few.

## Rewrites

### 1. "journey" (metaphorical) — resources/content/blog/smart-love-parenting-teenagers.md

Before:

> Adolescence is a journey from childhood to adulthood, and parenting a
> teenager is a journey too: guiding a young person towards independence,
> passing on values, and helping them handle friendships and relationships.

After:

> Adolescence is the move from childhood to adulthood. Parenting a teenager
> means guiding a young person towards independence, passing on values, and
> helping them handle friendships and relationships.

### 2. "journey" (literal travel) — resources/content/blog/diabetes-myths-and-facts.md

Before:

> Talk to your doctor at least two weeks before a planned fast or a long
> journey, and check your sugar more often during it.

After:

> Talk to your doctor at least two weeks before a planned fast or a long
> trip, and check your sugar more often during it.

### 3. "not just" rhetorical negation — resources/content/diabetes-heart/preventive-health-check-ups.md

Before:

> Every check-up at Niramay Clinics ends with a doctor's consultation, not
> just a printed report.

After:

> Every check-up at Niramay Clinics ends with a doctor's consultation. You
> never leave with only a printed report.

### 4. "seamless" in a code comment — components/home/ConditionsMarquee.tsx

Before: `duplicate for the seamless loop`
After: `duplicate for the continuous loop`

## Clean scans (no hits)

- delve, embark, realm, tapestry, testament, comprehensive, holistic, robust,
  leverage, empower, elevate, unlock, tailored, cutting-edge, state-of-the-art,
  world-class, top-notch, game-changer, peace of mind, rest assured
- "it's important to note", "in today's fast-paced world", "whether you're … or …",
  "not just … but …" (as a rhetorical pair), "look no further", "we've got you covered"
- furthermore / moreover / additionally at the start of a sentence
- three-adjective rhythm lists, rhetorical-question headings (the FAQ page's
  genuine patient questions are kept), exclamation marks, emojis
- Title Case headings: all headings are sentence case or proper nouns

## Email template dashes (fixed)

- `lib/email.ts`: "…" — agreed" -> "…" - agreed" (×2); subject
  "We received your workshop request — Niramay Clinics" -> "…request. Niramay Clinics"
- `app/actions/forms.ts`: "—" placeholders -> "Not given" (5 fields)
