# Implementation Plan: Professional UI Redesign — AyurSutra

## Overview

Incrementally elevate every surface of the AyurSutra app into a cohesive, high-end design system. Tasks are ordered so each step builds on the previous one: design tokens first, shared utilities and hooks next, reusable components, then page-by-page refactors, finishing with the shell (Navbar + Footer) that wraps everything.

## Tasks

- [x] 1. Design tokens — update `tailwind.config.js` and `index.css`
  - Extend `theme.extend.colors` in `tailwind.config.js` with the full amber scale (`amber-50` → `amber-900`), `gold-400`, `forest-600`, `forest-700`, and `neutral` scale; rename the existing `brand` key to `forest`.
  - Add `@import` for Cormorant Garamond alongside the existing Playfair Display + Inter Google Fonts import in `index.css`; add `Georgia, serif` and `system-ui, sans-serif` fallbacks to the font stacks.
  - Add `.shadow-card`, `.shadow-card-hover`, `.shadow-glow-amber`, `.shadow-glow-forest` utility classes to `index.css`.
  - Add `.btn-forest` and `.btn-outline-amber` utility classes to `index.css` alongside the existing `.btn-primary` and `.btn-outline`.
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 2. Create `src/utils/cn.ts` — className merge utility
  - [x] 2.1 Implement `cn(...classes)` function
    - Accept variadic `(string | undefined | false | null)[]` arguments.
    - Filter falsy values, join truthy strings with a single space, and return a trimmed result.
    - Export as the default and named export.
    - _Requirements: 13.1, 13.2, 13.3, 13.4_

  - [ ]* 2.2 Write property test for `cn()` utility
    - **Property 17: cn() utility — truthy-only output**
    - **Validates: Requirements 13.2, 13.3, 13.4**

- [x] 3. Create `src/hooks/useScrollNavbar.ts`
  - [x] 3.1 Implement `useScrollNavbar(threshold?: number)` hook
    - Accept optional `threshold` defaulting to `20`.
    - Register a **passive** `scroll` event listener on `window` inside `useEffect`.
    - Return `{ isScrolled: boolean }` where `isScrolled` is `true` when `window.scrollY > threshold`.
    - Remove the listener in the `useEffect` cleanup function.
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 3.2 Write property tests for `useScrollNavbar`
    - **Property 1: Navbar scroll threshold — frosted glass applied**
    - **Property 2: Navbar scroll threshold — transparent below threshold**
    - **Validates: Requirements 2.1, 2.2, 2.3**

- [x] 4. Create `src/hooks/useMobileDrawer.ts`
  - [x] 4.1 Implement `useMobileDrawer()` hook
    - Maintain `isOpen: boolean` state, initially `false`.
    - `toggle()` flips `isOpen`; sets `document.body.style.overflow = 'hidden'` when opening, `''` when closing.
    - `close()` always sets `isOpen = false` and restores `document.body.style.overflow = ''`.
    - `useEffect` cleanup restores body scroll on unmount.
    - _Requirements: 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

  - [ ]* 4.2 Write property tests for `useMobileDrawer`
    - **Property 5: Mobile drawer body scroll lock**
    - **Property 6: Mobile drawer body scroll restore (round-trip)**
    - **Validates: Requirements 3.5, 3.6, 3.7**

- [x] 5. Create `src/components/FormField.tsx`
  - [x] 5.1 Implement `FormField` component
    - Accept props: `id`, `label`, `type` (`'text' | 'email' | 'password' | 'number' | 'date' | 'time' | 'select' | 'textarea'`), `value`, `onChange`, `placeholder`, `required`, `options`, `rows`, `hint`, `error`.
    - Render label with `text-sm font-medium text-neutral-700 mb-1.5`.
    - Render `<select>` when `type === 'select'` (one `<option>` per entry in `options`).
    - Render `<textarea>` when `type === 'textarea'` (use `rows` prop).
    - All inputs share base classes: `w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 transition-colors duration-150`.
    - Apply focus ring: `focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500`.
    - Apply error state: `border-red-400 focus:ring-red-400/30` when `error` prop is non-empty.
    - Render hint text below input with `text-xs text-neutral-500 mt-1` when `hint` is provided.
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8_

  - [ ]* 5.2 Write property tests for `FormField`
    - **Property 11: FormField focus ring**
    - **Property 12: FormField error state**
    - **Property 13: FormField select options**
    - **Validates: Requirements 7.3, 7.4, 7.5**

- [x] 6. Create `src/components/FeatureCard.tsx`
  - [x] 6.1 Implement `FeatureCard` component
    - Accept props: `icon`, `title`, `description`, `variant` (`'default' | 'gradient' | 'dark'`, default `'default'`), `accentColor` (`'amber' | 'forest' | 'blue'`, default `'amber'`), `link` (`{ href: string; label: string }`), `badge`.
    - `default` variant: white background, `shadow-card` class.
    - `gradient` variant: colored gradient background matching `accentColor` (amber → `from-amber-50 to-orange-50`, forest → `from-green-50 to-emerald-50`, blue → `from-blue-50 to-indigo-50`).
    - `dark` variant: `bg-amber-900 text-white`.
    - Render icon inside a 48×48 (`w-12 h-12`) rounded square with tinted background (`bg-amber-100` for amber, `bg-green-100` for forest, `bg-blue-100` for blue).
    - Apply `transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover` for hover lift.
    - Render `badge` string in top-right corner when provided.
    - Render `<Link>` element using `link.href` and `link.label` when `link` prop is provided.
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8_

  - [ ]* 6.2 Write property tests for `FeatureCard`
    - **Property 8: FeatureCard hover lift effect**
    - **Property 9: FeatureCard badge rendering**
    - **Property 10: FeatureCard link rendering**
    - **Validates: Requirements 6.5, 6.7, 6.8**

- [ ] 7. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Refactor `src/pages/Login.tsx` — split-panel layout
  - Add `showPassword` state; toggle password input `type` between `'password'` and `'text'` via an eye icon button.
  - On desktop (`md:` breakpoint): render a two-column layout — left decorative panel (amber gradient, serif Ayurveda quote, leaf SVG, trust badges) and right form panel.
  - On mobile: render a single centered card.
  - Replace raw `<input>` elements with `FormField` for email and password fields.
  - Right panel includes: AyurSutra logo mark, "Welcome back" heading, form, forgot password link, and terms note.
  - Submit button is full-width `btn-primary`; on submit navigate to `/schedule` (existing behavior preserved).
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8_

- [x] 9. Refactor `src/pages/RecordsDemo.tsx` — amber table, badges, dots, FormField search
  - Change table header row from `bg-gray-50` to `bg-amber-50` with amber-tinted column label text.
  - Change row hover from `hover:bg-gray-50` to `hover:bg-amber-50/50`.
  - Render each Record ID as a monospace pill badge: `font-mono text-xs bg-neutral-100 rounded-md px-2 py-0.5`.
  - Add a colored dot indicator next to each therapy name (amber `●` for Shirodhara, green `●` for Abhyanga, blue `●` for Nasya, purple `●` for others).
  - Replace the raw `<input>` search field with `FormField` (type `'text'`, with a search icon prefix rendered as a left-side adornment).
  - Change "Add mock" button from `btn-primary` to `btn-outline-amber`.
  - Replace the empty `<tr>` fallback with an illustrated empty state: a magnifying-glass icon and descriptive text centered in the table body.
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9_

  - [ ]* 9.1 Write property tests for RecordsDemo
    - **Property 15: Records search filtering**
    - **Property 16: Records add mock grows list**
    - **Validates: Requirements 9.6, 9.9**

- [x] 10. Refactor `src/pages/ScheduleDemo.tsx` — amber border, dosha colors, confidence bars, forest CTA, booking confirmation
  - Add `border-t-4 border-amber-500` to both panel card wrappers.
  - In the DoshaCard, apply color coding: Vata → `text-blue-700 bg-blue-50`, Pitta → `text-red-700 bg-red-50`, Kapha → `text-green-700 bg-green-50`.
  - Replace plain confidence percentage text with `ConfidenceBar`: a `h-1.5 rounded-full bg-neutral-100` track containing a `bg-amber-500 transition-[width] duration-[600ms] ease-out` fill div whose inline `width` style equals `Math.round(confidence * 100) + '%'`.
  - Change "Book This Therapy" button from inline classes to `btn-forest`.
  - Replace the existing `bg-green-50` booking confirmation block with a styled success panel: green border, checkmark icon (`✓`), and all booking fields (ref, patient, therapy, date, time, ML confidence, notes).
  - Replace raw `<input>` / `<select>` / `<textarea>` elements with `FormField` where applicable.
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

  - [ ]* 10.1 Write property test for ConfidenceBar width accuracy
    - **Property 14: Confidence bar width accuracy**
    - **Validates: Requirements 10.3**

- [x] 11. Refactor `src/pages/DietPlannerDemo.tsx` — same visual enhancements as ScheduleDemo
  - Add `border-t-4 border-amber-500` to both panel card wrappers.
  - Apply the same dosha color coding as ScheduleDemo (Vata=blue, Pitta=red, Kapha=green) to the DoshaCard.
  - Replace plain confidence text with the same `ConfidenceBar` pattern (600ms ease-out animation, width = `Math.round(confidence * 100)%`).
  - Replace raw `<input>` / `<select>` elements with `FormField` for all form fields.
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ] 12. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Refactor `src/pages/Home.tsx` — enhanced Hero with TrustStats row and FeatureCard sections
  - [x] 13.1 Enhance HeroSection
    - Update gradient overlay to `from-black/80 via-amber-950/60 to-transparent`.
    - Add `background-color: #78350f` CSS fallback on the background image container.
    - Add TrustStats row below the CTA buttons: four stat pills ("500+ Ayurvedic Centers", "94% Therapy Accuracy", "40% Less Admin Work", "4.9★ Practitioner Rating") on a `bg-white/10 backdrop-blur-sm` frosted bar.
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [x] 13.2 Replace card markup in Features, Benefits, and Services sections with `FeatureCard`
    - Features section: use `variant="default" accentColor="amber"`.
    - Benefits section: use `variant="default" accentColor="amber"` (preserve the stat badge and bullet list inside the card body).
    - Services section: use `variant="gradient"` with per-service `accentColor` and `link` prop.
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8_

- [x] 14. Refactor `src/App.tsx` — new Navbar with scroll behavior, mobile drawer, active link styling, and multi-column dark Footer
  - [x] 14.1 Refactor Navbar
    - Import and use `useScrollNavbar(20)` and `useMobileDrawer()`.
    - Import `useLocation` from `react-router-dom` for active link detection.
    - Apply `cn()` to toggle `bg-white/90 backdrop-blur-lg shadow-sm border-b border-amber-100/60` vs transparent based on `isScrolled`.
    - Desktop nav: render links with `text-amber-800 font-semibold` + 2px amber underline when `location.pathname === link.href`; otherwise default muted style.
    - Mobile: render hamburger button (`md:hidden`) that calls `toggle()`; show X icon when `isOpen`, menu icon when closed.
    - Render `MobileDrawer` as a full-height slide-in panel from the right (`translate-x-full` → `translate-x-0`) containing all nav links; clicking any link calls `close()`.
    - Login CTA button always visible.
    - _Requirements: 2.1, 2.2, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 4.1, 4.2, 4.3_

  - [x] 14.2 Replace Footer with multi-column dark Footer
    - Dark amber background `bg-amber-950` with warm off-white text and a thin amber gradient top border.
    - Top row: AyurSutra brand logo + tagline (left) and newsletter signup input (right).
    - Middle row: four link columns — "Product", "Resources", "Company", "Legal" — each with the links defined in the design document.
    - Bottom row: copyright notice and social icons for Twitter/X, LinkedIn, and GitHub.
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [x] 15. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP.
- Each task references specific requirements for traceability.
- Checkpoints ensure incremental validation after each major phase.
- Property tests validate universal correctness properties using fast-check.
- Unit tests validate specific examples and edge cases.
- No new npm packages are required — all styling uses Tailwind CSS utilities and native CSS transitions.
