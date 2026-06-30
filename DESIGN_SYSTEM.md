# Portfolio Design System (Condensed)

## 1. Layout & Responsive Architecture
- **Viewport**: Single-screen fit across all devices; `overflow-hidden` globally; use `h-dvh` or `h-screen`.
- **Mobile-First**: Default to mobile layouts; use `md:` and `lg:` for desktop scaling.
- **Tone**: Premium architectural showcase with bold structural lines.

## 2. Color Palette (shadcn/ui HSL Tokens)

```css
@layer base {
  :root {
    --background: 0 0% 0%;           /* #000000 */
    --foreground: 220 14% 93%;       /* #EAECF0 */
    --card: 0 0% 4%;
    --card-foreground: 220 14% 93%;
    --popover: 0 0% 0%;
    --popover-foreground: 220 14% 93%;
    --primary: 220 14% 93%;
    --primary-foreground: 0 0% 0%;
    --secondary: 203 38% 22%;        /* #233D4D */
    --secondary-foreground: 220 14% 93%;
    --muted: 203 38% 12%;
    --muted-foreground: 203 20% 65%;
    --accent: 24 99% 59%;            /* #FE7F2D */
    --accent-foreground: 0 0% 0%;
    --border: 203 38% 22%;
    --input: 203 38% 22%;
    --ring: 24 99% 59%;
    --radius: 0rem;                  /* Brutalist sharp corners */
  }
}
```

## 3. Content Taxonomy (Case-Sensitive)
- Kitchens
- Bedrooms
- Bathrooms
- Apartments

## 4. Layout Structure

**Mobile (Default)**
```
┌─ Navbar ─────────────────┐
├─ Profile Block (Compact)─┤
├─ Category Links (Stacked)┤
├─ Footer ─────────────────┤
```

**Desktop (md: Breakpoint)**
```
┌─ Navbar ─────────────────────────────────┐
├─ Bio Panel (40%) ─ │ ─ Interactive (60%)─┤
├─ Left Footer ────────│ ──── Right Footer──┤
```

**Full Takeover**: Click category → fixed inset-0 z-50 overlay (internal `overflow-y-auto` permitted).

## 5. Technical Execution
- Use `flex flex-col md:flex-row` for responsive shifts.
- Panel widths: `w-full md:w-[40%]` (bio), `w-full md:w-[60%]` (focus).
- Typography: Mobile uses dynamic viewport (`text-[11.5vw]`); desktop uses `sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl`.

## 6. Post-Execution Commits
After edits: append Conventional Commit message (lowercase, imperative verb, explicit scope).
Example: `feat(layout): implement mobile-first single-screen split pane`

## 7. Production Asset & Content Quality
- **No mock data**: No "banana", "test-image", "lorem ipsum".
- **Asset paths**: `/assets/projects/{category}/descriptive-name-01.jpg`
- **External placeholders**: Use architectural photography or interior design renders only.
- **Microcopy**: Professional fine arts curation lexicon, spatial design terminology.