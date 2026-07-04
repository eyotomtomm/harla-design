# DESIGN.md — Harla

Visual system reference. Extracted from the live codebase. Strategy lives in PRODUCT.md; this file answers "how it looks."

---

## Register

**Split codebase.** Two visual languages, one project.

- **Brand surface** (public pages): dark-first, photography-led, editorial restraint, gold accent, sharp corners.
- **Product surface** (admin CMS): functional dark theme, smaller radii, denser layout, warm tan accent.

Every section below marks which register it applies to, or both.

---

## Color

### CSS custom properties (set on `body`)

```
--primary-color:    #C9A84C     /* warm gold — brand accent */
--heading-color:    #FFFFFF     /* pure white headings */
--secondary-color:  #0A1628    /* deepest dark — overlays, preloader */
--harla-blue:       #3D5A80    /* slate blue — light mode primary */
--border-color:     #D9DFE7    /* light border, used sparingly */
```

### Monochromatic scale (dark mode default)

| Token        | Hex       | Role                              |
|--------------|-----------|-----------------------------------|
| `--black-120`| `#0A1628` | Deepest background, preloader     |
| `--black-110`| `#0D192C` | Section background alt            |
| `--black-100`| `#112240` | Primary background, input bg      |
| `--black-90` | `#1B3050` | Borders, input borders            |
| `--black-80` | `#2A4060` | Subtle dividers                   |
| `--black-70` | `#3D5A80` | = harla-blue                      |
| `--black-60` | `#4E6E90` | Muted interactive                 |
| `--black-50` | `#6082A0` | Placeholder text                  |
| `--black-40` | `#7A98B5` | Disabled text                     |
| `--black-30` | `#B0C4D8` | **Body text** (default)           |
| `--black-20` | `#D0DCE8` | Secondary text, light surfaces    |
| `--black-10` | `#E8EEF4` | Light mode background             |

Body background: `#141414`.

### Light mode overrides

Triggered by `.light-mode` class on body (or `body:has(.light-mode)`):

```
--primary-color:  #3D5A80    /* gold replaced by harla-blue */
Body text color:  var(--black-90)  /* #1B3050 */
Backgrounds:      white, var(--black-10)
Heading color:    var(--black-100)
Text shadows:     removed below 992px, inverted to white above
Borders:          var(--black-30)
```

### Admin surface colors

Separate palette, not driven by CSS custom properties:

```
Background:     #111
Card bg:        #1a1a1a
Accent:         #E1B78C     /* warm tan variant of brand gold */
Border:         #333
Body text:      #ccc
Muted text:     #999
Error:          #e74c3c
```

### Color rules

- Gold (`#C9A84C`) is the single accent on brand pages. No secondary accent.
- In light mode, harla-blue (`#3D5A80`) replaces gold entirely. Not additive.
- Admin uses its own palette. Do not mix admin tokens into public pages.
- No gradients on brand surface except the contact page split (50/50 solid fill, not a blend).

---

## Typography

### Font stack

```
font-family: "Montserrat", sans-serif;
```

Loaded via `next/font/google` with `display: swap`, CSS variable `--font-montserrat`.

Single typeface. No secondary font.

### Weight scale

| Weight | Name     | Usage                                          |
|--------|----------|------------------------------------------------|
| 200    | Light    | Preloader "HARLA" text, logo typography         |
| 400    | Regular  | Body text, paragraphs                           |
| 500    | Medium   | Labels, form labels, secondary headings, links  |
| 700    | Bold     | Filter buttons, strong emphasis                 |
| 900    | Black    | h1–h4, `.heading`, `.big-text`                  |

### Type scale (desktop, >= 1400px)

| Element     | Size   | Line height | Letter spacing | Weight |
|-------------|--------|-------------|----------------|--------|
| `.big-text` | 120px  | 1.2         | -10px          | 900    |
| h1          | 90px   | 1.2         | -3px           | 900    |
| h2          | 67px   | 1.2         | -3px           | 900    |
| h3          | 51px   | 1.2         | -2px           | 900    |
| h4          | 38px   | 1.2         | -2px           | 900    |
| h5          | 28px   | 1.32        | —              | —      |
| h6          | 20px   | 1.5         | —              | —      |
| body        | 16px   | 28px        | —              | 400    |

### Responsive type scale

Headings step down through five breakpoints: 1600px, 1400px, 1200px, 992px, 768px. Each breakpoint reduces sizes by roughly one tier (h1 at 1400px = 90px, at 1200px = 51px, at 768px = 42px).

### Text effects

- **Text shadow on h1/h2**: `2px 0 var(--heading-color)` — creates a subtle embossing. Active only above 992px. Removed in light mode below 992px.
- **Gradient text**: Used on contact/error pages only — `background: linear-gradient(...)` with `-webkit-text-fill-color: transparent`.
- **Sub-titles**: Always `text-transform: uppercase`, colored `var(--primary-color)`.
- **Logo text**: weight 200, `letter-spacing: 8px` (preloader) / `3px` (header).

### Typography rules

- h1–h4 are always weight 900 with tight negative letter-spacing. No exceptions.
- Body text is never heavier than 500.
- Uppercase is reserved for sub-titles, filter buttons, and navigation. Not for body copy.
- One typeface only. Do not introduce a second font.

---

## Spacing

### Base unit

5px increments. Utility classes from `.p-5` through `.p-250`, `.m-5` through `.m-250`.

### Common values

| Context              | Value     |
|----------------------|-----------|
| Component padding    | 16px 32px |
| Section vertical     | 100px–128px (desktop), 50px–80px (mobile) |
| Card internal        | 20px–40px |
| Grid gutter          | 0 default (`--bs-gutter-x: 0`), explicit 10px–128px via `.gap-*` |
| List item spacing    | 18px between items |
| Form group margin    | 20px bottom |
| Button padding       | 16px 32px |

### Section spacing pattern

Desktop sections use 100px–130px vertical padding. At 768px and below, this collapses to 50px–80px. The transition is not linear — each section defines its own responsive breakpoints.

### Container

Max-width `1410px` at `>= 1400px`. Full-width below.

---

## Borders & corners

### Border treatments

| Pattern                  | Value                              |
|--------------------------|------------------------------------|
| Standard border          | `1px solid var(--black-90)`        |
| Tab active indicator     | `1px solid var(--primary-color)` (bottom only) |
| Filter button border     | `1px solid var(--border-color)`    |
| Social icon border       | `1px solid var(--heading-color)`   |
| Admin dashed upload      | `2px dashed #333`                  |

### Border radius

- **Brand surface**: `0` on nearly everything. Sharp corners are a deliberate design choice.
- **Exceptions**: Social icons (`50%` circles), scroll-to-top button.
- **Admin surface**: `4px` on inputs, `8px` on cards.

### Rule

Do not add `border-radius` to brand surface elements. The sharp-corner aesthetic is intentional, not an omission.

---

## Elevation & shadow

Shadows are used sparingly. The visual hierarchy relies on background color steps, not depth.

| Context            | Value                                                  |
|--------------------|--------------------------------------------------------|
| Subtle card glow   | `0px 0px 30px 0px rgba(87, 95, 245, 0.1)`            |
| Admin minimal      | `0 2px 10px rgba(0,0,0,0.1)`                          |
| Double-sided soft  | `2px 2px 5px 1px rgba(0,0,0,0.05), -2px 0px 5px 1px rgba(0,0,0,0.05)` |

Most elements explicitly set `box-shadow: none`. Elevation is communicated through background color contrast, not shadows.

---

## Motion

### Default transition

```css
transition: 0.5s;  /* all properties, ease timing */
```

Used on links, buttons, and most interactive elements.

### Transition catalog

| Context            | Duration | Easing              |
|--------------------|----------|---------------------|
| Links, hover       | 0.5s     | ease (default)      |
| Admin hover        | 0.2s     | ease                |
| Theme toggle       | 0.3s     | ease                |
| Carousel slides    | 400ms    | ease-in-out         |
| Image overlay      | 0.7s     | linear              |

### Animations

| Name               | Duration  | Pattern                          | Usage              |
|--------------------|-----------|----------------------------------|---------------------|
| `preloaderPulse`   | 1.6s      | scale(0.95) ↔ scale(1), opacity  | Logo on load        |
| `preloaderLine`    | 1.2s      | scaleX(0) → scaleX(1) → scaleX(0) | Loading bar       |
| `sticky`           | 0.4s      | translateY(-100px → 0)          | Header stick        |
| `shapeAnimation*`  | various   | translate + rotate               | Hero floating shapes |
| `upDownLeft`       | n/a       | translateY(0 ↔ 50px)            | Decorative float    |
| `zoomInOut`        | n/a       | scale(1 ↔ 0.5)                  | Background shapes   |

### 3D transforms

Project cards and team cards use perspective transforms on hover:
```css
perspective(250px) rotateY(-90deg)  /* hidden state */
perspective(250px) rotateY(0deg)    /* revealed on hover */
```

### Stagger delays

Utility classes `.delay-0-1s` through `.delay-1-9s` in 0.1s increments. Used with Animate.css classes for scroll-triggered entrance animations.

### Motion rules

- Default interactive transition is 0.5s. Do not shorten to feel "snappy" — the pacing is intentional.
- `prefers-reduced-motion` is **not currently handled**. New code should respect it.
- Auto-advancing carousels: the hero carousel auto-advances. Interior project carousel does not.
- 3D transforms are hover-only. Nothing rotates on load.

---

## Layout

### Grid

Bootstrap 5 grid. Default gutter is `0` (`--bs-gutter-x: 0`). Explicit gutters applied via `.gap-10` through `.gap-128`.

### Breakpoints

| Name     | Min-width | Container max-width |
|----------|-----------|---------------------|
| XS       | 0         | 100%                |
| SM       | 576px     | 100%                |
| MD       | 768px     | 100%                |
| LG       | 992px     | 100%                |
| XL       | 1200px    | 100%                |
| XXL      | 1400px    | 1410px              |
| Ultra    | 1600px    | 1410px              |

### Z-index layers

| Layer         | Value      | Usage                     |
|---------------|------------|---------------------------|
| Background    | -1, -2     | Pseudo-element overlays   |
| Content       | 0–2        | Default stacking          |
| Interactive   | 5          | Carousel controls         |
| Overlay       | 9–10       | Project card overlays     |
| Sticky header | 999        | Fixed navigation          |
| Modal-level   | 99–100     | Popups, tooltips          |
| Preloader     | 9999999    | Above everything          |

### Page wrapper

```css
.page-wrapper {
  position: relative;
  z-index: 9;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  min-width: 300px;
}
```

---

## Component patterns

### Buttons

| Variant        | Background              | Text color          | Padding      | Border radius |
|----------------|-------------------------|---------------------|--------------|---------------|
| `.theme-btn`   | `var(--heading-color)`  | `var(--black-100)`  | 16px 32px    | 0             |
| `.load-more`   | `var(--primary-color)`  | `var(--black-100)`  | 16px 32px    | 0             |
| `.read-more`   | transparent             | `var(--black-30)`   | —            | —             |

`.read-more` uses `text-decoration: underline` and an arrow icon that shifts 3px on hover.

### Cards (project)

- Image container: `object-fit: cover`, max-height 800px
- Caption: absolutely positioned, revealed via 3D perspective transform on hover
- Padding: 64px (desktop), 32px (tablet), 16px (mobile)
- Background splits: 50% dark / 50% lighter via pseudo-elements

### Forms

- Input: `padding: 16px 32px`, `background: var(--black-100)`, `border: 1px solid var(--black-90)`
- Focus: `border-color: var(--black-90)`, no box-shadow
- Contact form variant: transparent background, bottom-border only
- Textarea: inherits display, 20px top padding

### Navigation tabs

- `.tab-style-one`: transparent background, bottom border indicator
- Active state: `color: var(--primary-color)`, `border-bottom-color: var(--primary-color)`
- Padding: 16px 32px per tab

### Social links

- 36px circle (width/height), `border-radius: 50%`
- 1px solid border matching heading color
- Hover: border and color switch to `var(--primary-color)`

### Pagination

- 56px square items, 1px solid border, no border-radius
- Active: `background: var(--primary-color)`, `color: var(--black-100)`
- Prev/next: fit-content width, 20px horizontal padding

### Filter buttons

- `font-size: 16px`, `font-weight: 700`, `text-transform: uppercase`
- `padding: 8px 15px`, `border: 1px solid var(--border-color)`
- Active: filled with `var(--primary-color)`, text becomes `var(--heading-color)`

---

## Imagery

### Treatment

- `object-fit: cover` on all contained images
- `max-width: 100%` global default
- No rounded corners on images (matches sharp-corner system)
- Grayscale filter on embedded maps: `filter: grayscale(100%)`

### Overlays

- Dark overlays via `::before` pseudo-elements with `opacity: 0.3` and `background-color: var(--heading-color)`
- Split-tone backgrounds (50/50) via pseudo-elements, not image manipulation

### Photography rules

- Project photography is the primary design material. Size images generously.
- No stock photo patterns. No watermarks. No decorative image borders.
- Dark mode: images do not invert or dim. They stand as-is against dark backgrounds.

---

## Icons

**Font Awesome 5.14.0** — loaded from vendor CSS.

- Icon weight set to `lighter` globally (`.fa, .fas { font-weight: lighter }`)
- Star icons: `font-size: 12px`, `font-weight: bolder`, colored `var(--primary-color)`
- Theme toggle icon: 22px, fixed sizing

No icon system beyond Font Awesome. No custom SVG icon set.

---

## Do's and don'ts

### Do

- Use the monochromatic scale (`--black-*`) for all grays. No arbitrary hex grays.
- Keep brand surface corners sharp (`border-radius: 0`).
- Let photography fill available space with `object-fit: cover`.
- Use 5px-increment spacing utilities.
- Apply `text-transform: uppercase` only on sub-titles and filter labels.
- Respect the weight hierarchy: 900 for headings, 400 for body, 500 for labels.
- Transition at 0.5s for interactive elements on the brand surface.
- Use background color contrast for elevation, not shadows.

### Don't

- Add `border-radius` to cards, buttons, or images on brand pages.
- Introduce a second typeface.
- Use shadows for depth on brand pages.
- Apply gradients (except the established contact-page split pattern).
- Mix admin palette tokens (`#E1B78C`, `#1a1a1a`) into public pages.
- Auto-advance carousels beyond the hero section.
- Use h1–h4 at weights below 900.
- Add decorative borders or ornamental dividers.
- Shorten the 0.5s transition default to feel "faster."

---

## File reference

| File | Lines | Purpose |
|------|-------|---------|
| `src/styles/style.css` | 7,474 | All brand surface styles |
| `src/styles/admin.css` | 335 | Admin CMS styles |
| `src/styles/globals.css` | — | Vendor imports, load order |
| `src/styles/vendor/` | — | Font Awesome, Bootstrap, Slick, Magnific Popup, Nice Select, Animate.css |
