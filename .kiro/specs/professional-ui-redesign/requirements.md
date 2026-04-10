# Requirements Document

## Introduction

AyurSutra is a Panchakarma Patient Management & Therapy Scheduling web application built with React, TypeScript, Tailwind CSS, and Vite. This document captures the functional and non-functional requirements for the professional UI redesign, derived from the approved design document. The redesign elevates every surface — navigation, hero, cards, forms, tables, and footer — into a cohesive, high-end design system while preserving all existing functionality and routing. Requirements are organized by component and cross-cutting concern.

## Glossary

- **Navbar**: The sticky top navigation bar rendered in `App.tsx` that persists across all routes.
- **MobileDrawer**: The full-height slide-in navigation panel triggered by the hamburger button on viewports narrower than 768px.
- **HeroSection**: The full-viewport introductory section on the Home page with background image, headline, CTAs, and trust stats row.
- **FeatureCard**: The reusable card component used in the Features, Benefits, and Services sections of the Home page.
- **FormField**: The unified styled input/select/textarea wrapper component used across Login, ScheduleDemo, and DietPlannerDemo pages.
- **LoginPage**: The authentication page with a split-panel layout on desktop and a single centered card on mobile.
- **RecordsDemo**: The digital health records page with a searchable data table and mock-data controls.
- **ScheduleDemo**: The ML-powered therapy scheduling page with dosha prediction, therapy recommendations, and booking confirmation.
- **DietPlannerDemo**: The ML-powered diet planning page with dosha prediction and personalized meal recommendations.
- **Footer**: The multi-column dark footer replacing the current minimal two-item footer.
- **DesignToken**: A named CSS custom property or Tailwind config value that represents a single visual decision (color, spacing, shadow, etc.).
- **TrustStats**: The horizontal row of four stat pills displayed below the hero CTAs.
- **DoshaCard**: The prediction result card in ScheduleDemo and DietPlannerDemo that displays Vata/Pitta/Kapha percentages.
- **ConfidenceBar**: The animated progress bar that visually represents a confidence percentage value in the range [0, 1].
- **cn_Utility**: The `cn()` className merging utility function that joins truthy class strings and filters falsy values.
- **useScrollNavbar**: The custom React hook that tracks whether the page has scrolled past the threshold and returns `{ isScrolled: boolean }`.
- **useMobileDrawer**: The custom React hook that manages mobile drawer open/close state and body scroll locking.

---

## Requirements

### Requirement 1: Design Token System

**User Story:** As a developer, I want all visual decisions to flow from a single source of truth in `tailwind.config.js` and `index.css`, so that the design system is consistent and maintainable without hardcoded values scattered across component files.

#### Acceptance Criteria

1. THE System SHALL define all color tokens (amber scale, gold-400, forest-600/700, neutral scale) in `tailwind.config.js` under the `theme.extend.colors` key.
2. THE System SHALL define shadow utility classes (`shadow-card`, `shadow-card-hover`, `shadow-glow-amber`, `shadow-glow-forest`) in `index.css`.
3. THE System SHALL define button utility classes (`btn-primary`, `btn-outline`, `btn-forest`, `btn-outline-amber`) in `index.css`.
4. THE System SHALL load Playfair Display, Inter, and Cormorant Garamond fonts from Google Fonts with `display=swap` to prevent flash of invisible text.
5. THE System SHALL apply `font-family: 'Inter', sans-serif` as the default body font and `font-family: 'Playfair Display', serif` via the `.font-serif` utility class.
6. IF the Google Fonts CDN is unavailable, THEN THE System SHALL fall back to `Georgia, serif` for serif fonts and `system-ui, sans-serif` for sans-serif fonts.

---

### Requirement 2: Navbar — Scroll Behavior

**User Story:** As a user, I want the navigation bar to be transparent at the top of the page and transition to a frosted-glass style when I scroll down, so that the hero section feels immersive while the navbar remains readable during scrolling.

#### Acceptance Criteria

1. WHEN `window.scrollY` exceeds 20px, THE Navbar SHALL apply `bg-white/90`, `backdrop-blur-lg`, `shadow-sm`, and `border-b border-amber-100/60` classes.
2. WHEN `window.scrollY` is 20px or less, THE Navbar SHALL apply a transparent background and remove the frosted-glass classes.
3. THE useScrollNavbar hook SHALL accept an optional `threshold` parameter defaulting to 20.
4. WHEN the component using useScrollNavbar unmounts, THE useScrollNavbar hook SHALL remove the scroll event listener.
5. THE useScrollNavbar hook SHALL register the scroll listener as a passive event listener to avoid blocking the main thread.

---

### Requirement 3: Navbar — Responsive Layout

**User Story:** As a user on a mobile device, I want a hamburger menu that opens a full-height drawer, so that I can navigate the app without the desktop nav links cluttering the small screen.

#### Acceptance Criteria

1. WHILE viewport width is less than 768px, THE Navbar SHALL hide the desktop navigation link row and display the hamburger button.
2. WHILE viewport width is 768px or greater, THE Navbar SHALL display the desktop navigation link row and hide the hamburger button.
3. WHEN the hamburger button is clicked and the MobileDrawer is closed, THE Navbar SHALL open the MobileDrawer.
4. WHEN the hamburger button is clicked and the MobileDrawer is open, THE Navbar SHALL close the MobileDrawer.
5. WHEN the MobileDrawer is open, THE useMobileDrawer hook SHALL set `document.body.style.overflow` to `'hidden'` to prevent background scrolling.
6. WHEN the MobileDrawer is closed, THE useMobileDrawer hook SHALL restore `document.body.style.overflow` to `''`.
7. WHEN the component using useMobileDrawer unmounts while the drawer is open, THE useMobileDrawer hook SHALL restore `document.body.style.overflow` to `''`.
8. THE useMobileDrawer hook SHALL expose a `close()` function that always sets `isOpen` to `false` and restores body scroll regardless of current state.

---

### Requirement 4: Navbar — Active Link Styling

**User Story:** As a user, I want the current page's nav link to be visually distinct from inactive links, so that I always know which section of the app I am on.

#### Acceptance Criteria

1. WHEN the current route matches a nav link's `href`, THE Navbar SHALL apply `text-amber-800 font-semibold` and a 2px amber underline to that link.
2. WHEN the current route does not match a nav link's `href`, THE Navbar SHALL render that link without active styles.
3. THE Navbar SHALL always display the Login CTA button regardless of the current route.

---

### Requirement 5: Hero Section

**User Story:** As a visitor, I want a visually compelling full-viewport hero section with trust indicators, so that I immediately understand AyurSutra's value and feel confident in the product.

#### Acceptance Criteria

1. THE HeroSection SHALL render at a minimum height of 88vh.
2. THE HeroSection SHALL display a layered background consisting of a background image, a multi-stop gradient overlay (`from-black/80 via-amber-950/60 to-transparent`), and a decorative amber blur orb.
3. IF the hero background image fails to load, THEN THE HeroSection SHALL display `background-color: #78350f` (amber-900) as a fallback so the section remains visually coherent.
4. THE HeroSection SHALL display a TrustStats row containing exactly four stat pills: "500+ Ayurvedic Centers", "94% Therapy Accuracy", "40% Less Admin Work", and "4.9★ Practitioner Rating".
5. THE TrustStats row SHALL be rendered on a `bg-white/10 backdrop-blur-sm` frosted bar below the CTA buttons.
6. THE HeroSection SHALL display a badge, an H1 headline, a subtext paragraph, and at minimum two CTA buttons.

---

### Requirement 6: FeatureCard Component

**User Story:** As a developer, I want a reusable FeatureCard component with multiple visual variants, so that I can consistently render feature, benefit, and service cards across the Home page without duplicating styles.

#### Acceptance Criteria

1. THE FeatureCard SHALL accept `icon`, `title`, `description`, `variant`, `accentColor`, `link`, and `badge` props as defined in the design interface.
2. WHEN `variant` is `'default'`, THE FeatureCard SHALL render with a white background and `shadow-card` class.
3. WHEN `variant` is `'gradient'`, THE FeatureCard SHALL render with a colored gradient background appropriate to the `accentColor`.
4. WHEN `variant` is `'dark'`, THE FeatureCard SHALL render with a dark amber background.
5. WHEN a FeatureCard is hovered, THE FeatureCard SHALL apply `translateY(-4px)` transform and `shadow-card-hover` with a `transition-all duration-300` transition.
6. THE FeatureCard SHALL render the icon inside a 48×48 rounded square container with a tinted background color matching the `accentColor`.
7. WHERE a `badge` prop is provided, THE FeatureCard SHALL display the badge string in the top-right corner of the card.
8. WHERE a `link` prop is provided, THE FeatureCard SHALL render a clickable link element using the `href` and `label` from the link prop.

---

### Requirement 7: FormField Component

**User Story:** As a developer, I want a unified FormField component that handles text, email, password, number, date, time, select, and textarea inputs, so that all form inputs across the app share consistent styling and behavior.

#### Acceptance Criteria

1. THE FormField SHALL accept `id`, `label`, `type`, `value`, `onChange`, `placeholder`, `required`, `options`, `rows`, `hint`, and `error` props as defined in the design interface.
2. THE FormField SHALL render a label with `text-sm font-medium text-neutral-700` styling and `mb-1.5` spacing above the input.
3. THE FormField SHALL apply `focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500` styles when the input receives focus.
4. IF an `error` prop is provided, THEN THE FormField SHALL apply `border-red-400 focus:ring-red-400/30` styles to the input element.
5. WHERE `type` is `'select'`, THE FormField SHALL render a `<select>` element containing one `<option>` for each entry in the `options` array.
6. WHERE `type` is `'textarea'`, THE FormField SHALL render a `<textarea>` element with the number of rows specified by the `rows` prop.
7. WHERE a `hint` prop is provided, THE FormField SHALL render hint text below the input with `text-xs text-neutral-500 mt-1` styling.
8. THE FormField SHALL apply `transition-colors duration-150` to all input elements.

---

### Requirement 8: Login Page

**User Story:** As a practitioner, I want a premium login experience with a split-panel layout on desktop, so that the authentication page reflects the professional quality of the AyurSutra brand.

#### Acceptance Criteria

1. WHILE viewport width is 768px or greater, THE LoginPage SHALL render a split-panel layout with a decorative left panel and a form right panel.
2. WHILE viewport width is less than 768px, THE LoginPage SHALL render a single centered card containing the login form.
3. THE LoginPage left panel SHALL display a serif quote about Ayurveda, a decorative leaf SVG, and trust badges.
4. THE LoginPage right panel SHALL display the AyurSutra logo mark, a "Welcome back" heading, the login form, a forgot password link, and a terms note.
5. THE LoginPage form SHALL include an email field and a password field, both implemented using the FormField component.
6. THE LoginPage password field SHALL include a show/hide toggle button that switches the input `type` between `'password'` and `'text'`.
7. THE LoginPage submit button SHALL be a full-width `btn-primary` button.
8. WHEN the login form is submitted, THE LoginPage SHALL navigate to the `/schedule` route.

---

### Requirement 9: Records Demo Page

**User Story:** As a practitioner, I want the health records table to have a polished amber-tinted design with improved search and empty states, so that the data is easy to scan and the page feels consistent with the rest of the redesigned app.

#### Acceptance Criteria

1. THE RecordsDemo table header row SHALL use `bg-amber-50` background with amber-tinted column label text.
2. WHEN a table row is hovered, THE RecordsDemo SHALL apply `hover:bg-amber-50/50` with a smooth transition.
3. THE RecordsDemo SHALL render each Record ID as a monospace pill badge with `bg-neutral-100 rounded-md px-2 py-0.5` styling.
4. THE RecordsDemo SHALL render a colored dot indicator next to each therapy name (amber for Shirodhara, green for Abhyanga, and appropriate colors for other therapies).
5. THE RecordsDemo search input SHALL be implemented using the FormField component with a search icon prefix.
6. WHEN a search query is entered, THE RecordsDemo SHALL display only records where the query string matches the record ID, patient name, therapy name, date, or notes fields (case-insensitive).
7. WHEN no records match the current search query, THE RecordsDemo SHALL display an illustrated empty state with an icon and descriptive text.
8. THE RecordsDemo "Add mock" button SHALL use `btn-outline-amber` styling (amber border, amber text, white background).
9. WHEN the "Add mock" button is clicked, THE RecordsDemo SHALL append one new record to the records list.

---

### Requirement 10: Schedule Demo Page

**User Story:** As a practitioner, I want the therapy scheduling page to have richer visual styling for dosha predictions and confidence scores, so that the ML recommendations are easier to interpret and the booking flow feels more professional.

#### Acceptance Criteria

1. THE ScheduleDemo panel headers SHALL display a 4px amber gradient top border (`border-t-4 border-amber-500`).
2. THE DoshaCard SHALL apply color coding to each dosha: blue for Vata, red for Pitta, and green for Kapha.
3. FOR ALL confidence values in the range [0, 1], THE ConfidenceBar width SHALL equal `Math.round(confidence × 100)` percent.
4. THE ConfidenceBar SHALL animate from 0% to its target width over 600ms using `ease-out` easing on mount.
5. THE "Book This Therapy" button SHALL use `btn-forest` styling (green background, white text).
6. WHEN a therapy session is booked, THE ScheduleDemo SHALL display a green success confirmation panel with a checkmark icon containing the booking reference, patient name, therapy, date, time, and ML confidence.

---

### Requirement 11: Diet Planner Demo Page

**User Story:** As a practitioner, I want the diet planner page to have the same visual enhancements as the schedule demo, so that both ML-powered pages feel cohesive and professional.

#### Acceptance Criteria

1. THE DietPlannerDemo panel headers SHALL display a 4px amber gradient top border (`border-t-4 border-amber-500`).
2. THE DoshaCard in DietPlannerDemo SHALL apply the same color coding as ScheduleDemo: blue for Vata, red for Pitta, and green for Kapha.
3. FOR ALL confidence values in the range [0, 1], THE ConfidenceBar in DietPlannerDemo SHALL display a width equal to `Math.round(confidence × 100)` percent.
4. THE ConfidenceBar in DietPlannerDemo SHALL animate from 0% to its target width over 600ms using `ease-out` easing on mount.
5. THE DietPlannerDemo form fields SHALL be implemented using the FormField component.

---

### Requirement 12: Footer

**User Story:** As a visitor, I want a structured multi-column footer with product, resource, company, and legal links, so that I can easily find important information and the page feels complete and professional.

#### Acceptance Criteria

1. THE Footer SHALL render on a dark amber background (`bg-amber-950`) with warm off-white text.
2. THE Footer SHALL display a thin amber gradient top border.
3. THE Footer top row SHALL display the AyurSutra brand logo and tagline on the left and a newsletter signup input on the right.
4. THE Footer middle row SHALL render four link columns with headings: "Product", "Resources", "Company", and "Legal", each containing the links defined in the design document.
5. THE Footer bottom row SHALL display the copyright notice and social icons for Twitter/X, LinkedIn, and GitHub.

---

### Requirement 13: cn() Utility Function

**User Story:** As a developer, I want a `cn()` className utility that merges class strings and filters falsy values, so that conditional class application in components is clean and predictable.

#### Acceptance Criteria

1. THE cn_Utility SHALL accept any number of arguments of type `string | undefined | false | null`.
2. THE cn_Utility SHALL return a single string containing only the truthy argument values joined by a single space.
3. THE cn_Utility SHALL filter out all falsy values including `false`, `null`, `undefined`, and empty string `''`.
4. THE cn_Utility SHALL return a trimmed string with no leading or trailing spaces.

---

### Requirement 14: Performance and Accessibility

**User Story:** As a user, I want the redesigned UI to load quickly and remain accessible, so that the app is usable across devices and network conditions without degraded experience.

#### Acceptance Criteria

1. THE System SHALL implement card hover animations using only CSS `transform` and `box-shadow` properties to avoid layout reflow.
2. THE System SHALL implement the MobileDrawer slide animation using CSS `translate` rather than `left` or `right` properties to avoid layout reflow.
3. THE System SHALL load hero background images using Unsplash URL parameters `?q=80&w=2000` for optimized file size.
4. THE System SHALL use passive scroll event listeners in useScrollNavbar to avoid blocking the main thread.
5. THE System SHALL not use `dangerouslySetInnerHTML` anywhere in the redesigned components.
6. THE System SHALL not persist any user data — all demo state SHALL remain in-memory React state only.
