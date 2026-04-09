# Serenity — Video Walkthrough Script

Use this as a guide when recording your demo video (5-10 minutes).

## Part 1: App Demo (3-4 minutes)

### Home Page
- Show the daily mood check-in
- Select a mood (e.g., "Good"), type a note, click "Save Check-in"
- Show the success message and "Today's Check-in" card

### Mood History
- Navigate to Mood page
- Show the Chart.js visualization of mood over time
- Show the list of recent check-ins

### Journal
- Click "New Entry" — create a journal entry with title, content, and mood
- Go back to journal list — show the entry appears
- Click into it, click "Edit", change something, save
- Show "Delete" button (mention it has confirmation)

### Coping Tools
- Show the 4 tools: Breathing, Grounding, Prompts, Affirmations
- Demo the Box Breathing exercise (start/stop the animation)
- Demo the 5-4-3-2-1 Grounding exercise (fill in a couple steps)

### Community
- Show the vent board with seeded posts
- Create a new post
- Click into a thread, add a reply
- Click "I hear you" support button

### Crisis Detection
- Type a crisis keyword in the journal or check-in note field
- Show the crisis modal appearing with real helpline numbers
- Mention it detects on both client-side (real-time) and server-side

### Resources
- Show the resources page with crisis hotlines, self-help, campus resources

## Part 2: Code Walkthrough (3-4 minutes)

### Tech Stack
- "Built with Next.js, React, MongoDB/Mongoose, and Bootstrap 5"
- "Deployed on Vercel with MongoDB Atlas"

### Project Structure
- Show `src/app/` — App Router with file-based routing
- Show `src/models/` — 3 Mongoose schemas (Mood, Journal, Vent)
- Show `src/components/` — reusable React components
- Show `src/lib/` — MongoDB connection, crisis detection, session helpers

### Database (Full CRUD)
- Show Journal routes: Create, Read, Update, Delete
- Show Mongoose schemas with validation (enum, maxlength, required)
- "All data is keyed to an anonymous session ID — no personal info stored"

### Security
- "Middleware assigns a session cookie on first visit"
- "Input validation on all forms — max lengths, enum checks"
- "Crisis keyword detection scans all user input"
- "No personal data collected — fully anonymous by design"

### Accessibility
- "Semantic HTML5 — nav, main, footer, article elements"
- "ARIA labels on all interactive elements"
- "Skip navigation link for screen readers"
- "Keyboard navigable — all features work without a mouse"
- "prefers-reduced-motion support for animations"
- "WCAG AA color contrast throughout"

### Testing & CI
- Show `__tests__/` folder — crisis detection tests, model validation tests, component tests
- Show `.github/workflows/ci.yml` — automated CI pipeline
- Run `npm test` to show tests passing

### Future Enhancements
- Real-time community updates with WebSocket
- AI-powered coping chatbot
- Data export (CSV/PDF)
- Native mobile app
- Therapist matching feature

## Part 3: Team & Closing (30 seconds)
- Team member bios
- "Serenity — Your safe space for mental wellness"
- Show the live URL: https://serenity-orcin.vercel.app
