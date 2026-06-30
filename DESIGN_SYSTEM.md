# Portfolio Design System & Brand Identity

This file serves as the strict source of truth for the site's brand identity, color tokens, layout architecture, and interaction states. All component orchestration and layout placement must rigidly follow these guidelines using a mobile-first philosophy.

## 1. Layout & Responsive Architecture Philosophy

- **Viewport Constraint:** The application must fit exactly within a single screen across all devices. Native document/body scrolling is disabled globally. Use modern dynamic viewport units (`h-dvh` or `h-screen`) combined with `overflow-hidden`.
- **Mobile-First Responsiveness:** All utility classes must be coded for mobile layouts by default, using Tailwind's `md:` and `lg:` breakpoints to scale up seamlessly for desktop screens.
- **Tone:** Premium architectural showcase, bold structural lines, responsive structural adaptivity.

## 2. Color Palette Configuration (shadcn/ui HSL Tokens)

Extracted directly from the verified brand palette in `{BAE2A64B-D4EB-49C7-AF67-BF173C5D33A1}.png`.

```css
@layer base {
  :root {
    --background: 0 10% 4%;         /* #0B0909 - Rich Charcoal Black */
    --foreground: 236 67% 83%;      /* #B5B9F0 - Illuminating Lavender Periwinkle */
    
    --card: 167 20% 12%;            
    --card-foreground: 236 67% 83%; 
    --popover: 0 10% 4%;            
    --popover-foreground: 236 67% 83%;
    
    --primary: 236 67% 83%;         /* #B5B9F0 - Periwinkle text / structural focus */
    --primary-foreground: 0 10% 4%; 
    
    --secondary: 167 20% 23%;       /* #2E4540 - Dark Forest Green / Deep Teal */
    --secondary-foreground: 236 67% 83%;
    
    --muted: 167 20% 16%;           
    --muted-foreground: 169 15% 65%;
    
    --accent: 169 34% 38%;          /* #408175 - Vibrant Sage / Deep Teal Accent */
    --accent-foreground: 236 67% 83%;
    
    --border: 167 20% 23%;          /* #2E4540 - Framing lines */
    --input: 167 20% 23%;           
    --ring: 169 34% 38%;            
    
    --radius: 0rem;                 /* Brutalist, sharp 90-degree layout corners */
  }
}
```

## 3. Hardcoded Content Taxonomy

The portfolio displays projects grouped strictly into four distinct structural categories. The build agent must enforce these exact values for content routing, layout filters, and database/sanity schema structures (case-sensitive):

- Kitchens
- Bedrooms
- Bathrooms
- Apartments

## 4. Structural Layout Grid & Placement (Mobile vs. Desktop)

### A. Mobile Layout Structure (Default / Base Tailwind Classes)

On mobile devices, components stack vertically within the single-screen viewport limits:

```
+-----------------------------------------------------------------------+
|  GLOBAL NAVBAR (Logo / Compact Menu Trigger / Contact Button)         |
+-----------------------------------------------------------------------+
|  COMPACT PROFILE BLOCK (Top / Small Avatar + Job Title Inline)        |
+-----------------------------------------------------------------------+
|  DYNAMIC CENTER ARENA (Massive Stacked Category Links)                |
|  - Kitchens / Bathrooms / Apartments / Bedrooms                       |
+-----------------------------------------------------------------------+
|  PINNED MOBILE FOOTER                                                 |
+-----------------------------------------------------------------------+
```

**Profile Behavior (Mobile):** The profile picture scales down significantly into a small, elegant thumbnail. The job description is hidden or condensed to ensure the 4 massive category links fit entirely above the fold without causing a screen overflow.

### B. Desktop Layout Structure (md: Breakpoint and Above)

On desktop viewports, the grid splits side-by-side:

```
+-----------------------------------------------------------------------+
|  GLOBAL NAVBAR (Logo / Category Quick-Links / Contact Popup Button)  |
+------------------------------------+----------------------------------+
|                                    |                                  |
|  LEFT PANEL (Persistent Bio)       |  RIGHT PANEL (Interactive View)  |
|  - Full Profile Picture            |  - Default: Huge Category Texts  |
|  - Cascading Job Titles            |  - Active State: Full-View Layer |
|  - Full Description Text           |    (Takes whole screen for grid) |
|                                    |                                  |
+------------------------------------+----------------------------------+
|  FOOTER (Left-pinned metadata)     |  FOOTER (Right-pinned credits)   |
+------------------------------------+----------------------------------+
```

### C. Full Takeover Project View (Universal Behavior)

When a user clicks any category (via the right pane links, mobile center arena, or navbar):

- The application injects a full-viewport layout takeover block (`fixed inset-0 z-50 bg-background`).
- This completely masks both structural panels to maximize artwork visibility.

**Scroll Containment Rule:** While the main site body remains locked down with `overflow-hidden`, this specific overlay component is permitted to have localized internal scrolling (`overflow-y-auto`) so the user can scroll through the project list if many works are loaded. A sharp, high-contrast "Close / Return" action element must remain persistently visible.

## 5. Agent Technical Execution Rules

- **Enforce Responsive Layout Shifts:** Use flex utility classes matching a mobile-first pattern: `flex flex-col md:flex-row`.
- **Explicit Sizing Controls:** Use exact panel distributions when hitting the desktop breakpoint: `w-full md:w-[40%]` for the bio panel, and `w-full md:w-[60%]` for the interactive focus area.
- **Typography Scaling:** Ensure the massive category text blocks scale proportionally using standard responsive modifiers (e.g., `text-4xl sm:text-5xl md:text-7xl lg:text-8xl`), guaranteeing text remains impactful on massive screens but doesn't wrap awkwardly or cause overflow scrolling on mobile phones.

## 6. Post-Execution Commit Requirements

**Mandatory Output:** After performing any file edits, architecture scaffolding, or component iterations, the agent MUST append a precise Git commit message suggestion at the end of its response.

**Commit Format:** Use the Conventional Commits specification. The message must be written in lowercase, starting with an active imperative verb (e.g., `feat`, `fix`, `refactor`), followed by an explicit layout or functional scope.

**Format Example:**

```
### Suggested Commit Message
feat(layout): implement mobile-first single-screen split pane
```

## 7. Production Asset & Content Quality Enforcements

### Strict Prohibition of Mock Data

The agent must treat this project as a high-end commercial live production site. Using placeholder keywords, arbitrary sandbox mock values, or joke asset names (such as "banana", "test-image", or "lorem ipsum") is strictly forbidden.

### Production Asset Schema

All simulated image locations in markup must link to clear, structured local path directories under the public folder, matching the project taxonomy schema:

- `/assets/projects/kitchens/minimalist-matte-01.jpg`
- `/assets/projects/bathrooms/concrete-spa-01.jpg`
- `/assets/projects/apartments/industrial-loft-01.jpg`
- `/assets/projects/bedrooms/editorial-suite-01.jpg`

### High-Fidelity Testing Assets

If external image assets are pulled in via URL placeholders to test render boxes or image grid containers, the agent must exclusively target high-resolution architectural photography or interior design rendering placeholders (e.g., architectural imagery platforms).

### Professional Fine Arts Microcopy

Any generated dummy data titles, mock descriptions, or navigation micro-copy must adopt a polished, authentic lexicon matching fine arts curation, spatial design, and architectural visualization.