# Serenity — SCRUM Meeting Notes

## Sprint: April 7–14, 2026 (8-day sprint)

---

### Day 1 — Monday, April 7

**Yesterday:** Project kickoff — reviewed requirements, finalized tech stack, created project brief.

**Today:**
- Set up Node.js project scaffold with Express, EJS, MongoDB config
- Created Mongoose models (Mood, Journal, Vent)
- Implemented session middleware with anonymous UUID generation
- Built master layout with sidebar matching design mockup
- Implemented custom CSS (purple/teal gradient theme)
- Set up security middleware (Helmet, rate limiting, CSRF)

**Blockers:** None. MongoDB Atlas needs to be configured with connection string.

**Completed:** Project scaffold, all 3 models, 6 route files, layout + sidebar + footer + crisis modal, custom CSS, session + security middleware.

---

### Day 2 — Tuesday, April 8

**Yesterday:** Completed full project scaffold and layout.

**Today:**
- Build home page with daily mood check-in (emoji selector)
- Implement mood POST route with validation
- Build mood history page with Chart.js visualization
- Create API endpoint for chart data
- Test mood tracking end-to-end

**Blockers:** Need to verify Chart.js renders correctly with mood data.

**Completed:** Home page check-in, mood history with Chart.js, API endpoint.

---

### Day 3 — Wednesday, April 9

**Yesterday:** Mood tracking and history complete.

**Today:**
- Build full CRUD journal (create, read, update, delete)
- Implement crisis keyword detection middleware
- Add client-side crisis scanner with real-time detection
- Build crisis modal with real helpline numbers
- Test crisis detection on journal entries

**Blockers:** None.

**Completed:** Journal CRUD (5 routes), crisis detection (server + client), crisis modal.

---

### Day 4 — Thursday, April 10

**Yesterday:** Journal and crisis detection complete.

**Today:**
- Build coping tools page (tool cards grid)
- Implement box breathing exercise with animated circle
- Build 5-4-3-2-1 grounding exercise (step-through form)
- Add journaling prompts (random shuffle)
- Add positive affirmations (rotating cards)

**Blockers:** CSS animation timing for breathing circle needed adjustment.

**Completed:** All 4 coping tools fully interactive.

---

### Day 5 — Friday, April 11

**Yesterday:** All coping tools complete.

**Today:**
- Build community vent space (post board)
- Implement category filtering
- Build thread view with replies
- Add "I hear you" support button
- Crisis scan on community posts
- Test community features end-to-end

**Blockers:** None.

**Completed:** Community feature with posts, replies, categories, support.

---

### Day 6 — Saturday, April 12

**Yesterday:** Community feature complete.

**Today:**
- Build resources page (crisis lines, self-help, campus resources)
- Security audit (verify CSRF, Helmet headers, rate limiting)
- Accessibility audit (ARIA labels, keyboard nav, contrast, skip-nav)
- Add prefers-reduced-motion support
- Test all pages on mobile viewport
- Fix responsive issues

**Blockers:** None.

**Completed:** Resources page, security hardened, accessibility compliant, responsive.

---

### Day 7 — Sunday, April 13

**Yesterday:** Security and accessibility complete.

**Today:**
- Deploy to Render.com with MongoDB Atlas
- Write seed.js for sample data
- Create design document with wireframes
- Write SCRUM meeting notes
- Create task plan and bug tracking docs
- Test deployed version

**Blockers:** Initial Render deploy needed environment variable setup.

**Completed:** Deployed, seeded, all documentation drafted.

---

### Day 8 — Monday, April 14

**Yesterday:** Deployed and documentation drafted.

**Today:**
- Final testing pass on all features
- Create presentation slides
- Record video walkthrough
- Package final submission zip
- Verify all rubric criteria covered

**Blockers:** None.

**Completed:** Slides, video recorded, submission packaged.

---

## Sprint Retrospective

**What went well:**
- Starting with a solid scaffold saved time on later features
- EJS + Bootstrap was the right choice — fast to build, polished result
- Crisis detection feature adds meaningful social impact
- Anonymous session approach simplified the entire auth layer

**What could improve:**
- Could add real-time community updates (WebSocket) in future version
- AI chatbot integration would enhance coping tools
- Automated testing would catch regressions

**Velocity:** 8 features delivered in 8 days — steady pace with no major blockers.
