# PRODUCT.md — Harla

Loaded before every command. Strategy only. No colors, fonts, or pixel values — those live in DESIGN.md.

---

## Register

**Split.** Two surfaces, one codebase.

- **Brand** — public pages (portfolio, projects, blog, about, contact). The impression is the product. Visitors judge Harla's capability by how the site itself feels.
- **Product** — admin CMS (`/admin`). Operators managing content. The design helps someone finish a task. Efficiency over atmosphere.

Commands must know which surface they are touching. Brand pages get editorial restraint. Admin pages get functional density.

---

## Product

Architecture and interior design consultancy portfolio with an integrated content management system. Database-driven (Prisma + MySQL). Projects, blog posts, team, testimonials, services — all managed through a protected admin dashboard.

The public site exists to convert visitors into clients. The admin exists to keep the public site current without developer involvement.

---

## Users

### Primary: Prospective clients
People considering hiring Harla for architecture or interior design work. Browsing project galleries, reading case studies, evaluating credentials. Often comparing multiple firms. Decision involves trust, taste, and budget. They scroll slowly when interested, leave fast when unconvinced.

### Secondary: Industry peers
Other architects, designers, potential collaborators. Evaluating Harla's portfolio quality and range. Looking at project details, construction methods, material choices. More critical eye than clients. Will notice if the site undermines the work it presents.

### Tertiary: Content editors
Harla's own team using the admin CMS. Managing projects, writing blog posts, updating hero slides and testimonials. Not developers. Need clear interfaces with no ambiguity about what a field does or where content appears on the public site.

---

## Voice

**Quiet. Precise. Grounded.**

Three words that survive disagreement. Applied differently per register:

- **Brand surface:** Let the work speak. Copy is a counterpoint to photography, not a competitor. No exclamation marks. No superlatives unless earned by a specific fact. Confidence through restraint, not volume.
- **Product surface (admin):** Functional clarity. Labels say exactly what they do. No personality in error messages — just what happened and what to do next.

---

## Anti-references

Things this site must never feel like. Named, not described.

- **Dribbble trending shots.** Glassmorphism, purple gradients, floating dashboards with no real data, 3D blobs. Decoration mistaken for design.
- **Houzz and mass-market listing platforms.** Cluttered grids, generic stock photography, review scores as credibility, quantity over curation.
- **Template portfolio sites.** ThemeForest starter kits with Lorem Ipsum still visible. Animation for animation's sake. Parallax on every scroll. Carousels that auto-advance while you're reading.

---

## References

The current site itself. The existing direction is correct — enhancement, not reinvention. Improvements should feel like the same hand with more confidence, not a different voice.

Where the current site already succeeds: project photography given room, clear service articulation, dark mode option, database-driven flexibility.

Where enhancement is welcome: reducing animation noise, tightening typographic hierarchy, improving information density in project detail pages, making the admin CMS more self-explanatory.

---

## Design principles

1. **The work is the interface.** Photography and project content are the primary design material. UI elements exist to frame them, not compete.
2. **Quiet until needed.** Animations, transitions, and interactive elements earn their presence. Default is stillness.
3. **One idea per viewport.** Each scroll position should communicate one thing clearly. No layered messages fighting for attention.
4. **Enhancement over reinvention.** Changes build on what exists. No ground-up redesigns without explicit instruction.
5. **Split register, single quality bar.** Brand pages and admin pages look different but share the same standard of craft.

---

## Accessibility

No formal compliance mandate. Handle sensibly:

- Maintain reasonable contrast ratios (aim for AA where practical)
- Keyboard navigation must work
- Images need meaningful alt text, especially project photography
- Dark mode should be genuinely usable, not an afterthought
- Respect `prefers-reduced-motion` for users who set it

---

## Technical context

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Database:** Prisma ORM, MySQL
- **Auth:** NextAuth.js
- **Styling:** Bootstrap 5 + custom CSS (7,400 lines in `styles/style.css`)
- **Key dependencies:** React Bootstrap, Slick carousel, Tiptap editor, Yet Another React Lightbox
- **Entry points:** `src/app/page.tsx` (public), `src/app/admin/page.tsx` (CMS)

---

## What to run next

Based on what the scan found:

- **Existing work to evaluate:** `critique` or `audit` — the site has substantial code. Start by understanding what needs attention before adding anything.
- **New work:** `craft` or `shape` — for building new components or pages within the established direction.
- **Visual iteration:** `live` — for variant exploration on specific components.

DESIGN.md should be generated next to establish the visual system (colors, typography, spacing, elevation). Run `/impeccable document` when ready.
