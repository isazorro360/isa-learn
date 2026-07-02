# TODO - ISA Learn homepage redesign

## 1) Implement homepage UI redesign
- [x] Replace `src/pages/LandingPage.tsx` with new modern premium startup-quality homepage layout.


- [ ] Add sections: Hero, Trusted By, Why Choose, Featured Courses, Past Questions Preview (search + filter), Testimonials, Statistics (animated counters), Call to Action, Footer.
- [ ] Ensure mobile-first responsiveness, dark mode, smooth animations, gradients, rounded cards, soft shadows, glassmorphism.
- [ ] Ensure CTAs route to correct app pages.

## 2) Align top navigation
- [ ] Update `src/components/Navbar.tsx` links to: Home, Courses, Past Questions, AI Tutor, About, Contact.
- [ ] Ensure right side has Login + Sign Up buttons.
- [ ] Keep dark mode toggle and notifications behavior working.

## 3) Align footer
- [ ] Update `src/components/Footer.tsx` to include columns/links: About, Contact, Privacy Policy, Terms, Help Center, Social Media links.

## 4) Add supporting data/components if needed
- [ ] Add any missing small components/hooks (e.g., count-up animation, premium-looking course cards, icon wrappers).
- [ ] Update or extend `src/data.ts` as needed to power Featured Courses and grouped Past Questions previews.

## 5) Validate
- [ ] Run `npm run lint` (if available) and `npm run build`.
- [ ] Run dev server and verify: layout, hover states, dark mode, animations, accessibility (contrast + focus rings), and responsiveness.

