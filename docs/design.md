# Serenity — Design Document

## Structure & Skeleton with Annotations

### Information Architecture / Site Map

```
Serenity (/)
├── Home (/)
│   └── Daily mood check-in form
├── Mood (/mood)
│   └── Mood history chart + list
├── Journal (/journal)
│   ├── Entry list
│   ├── New entry (/journal/new)
│   ├── View entry (/journal/:id)
│   └── Edit entry (/journal/:id/edit)
├── Tools (/coping)
│   ├── Box Breathing (/coping/breathing)
│   ├── 5-4-3-2-1 Grounding (/coping/grounding)
│   ├── Journaling Prompts (/coping/prompts)
│   └── Positive Affirmations (/coping/affirmations)
├── Community (/community)
│   ├── Vent board with category filter
│   └── Thread view (/community/:id)
├── Resources (/resources)
│   ├── Crisis hotlines
│   ├── Self-help resources
│   └── Campus resources
└── [Crisis Modal] — accessible from every page
```

### Navigation Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│    Home      │────▶│   Mood       │────▶│  History     │
│  (check-in)  │     │  (tracking)  │     │  (chart)     │
└──────┬───────┘     └──────────────┘     └─────────────┘
       │
       ├──────────▶ Journal ──▶ New / View / Edit / Delete
       │
       ├──────────▶ Tools ──▶ Breathing / Grounding / Prompts / Affirmations
       │
       ├──────────▶ Community ──▶ Post / Thread / Reply / Support
       │
       └──────────▶ Resources (crisis lines, self-help, campus)

[Crisis Help button] ──▶ Crisis Modal (available on ALL pages)
```

### Page Layouts

#### Master Layout
```
┌──────────────────────────────────────────────────────┐
│ ┌──────────┐  ┌────────────────────────────────────┐ │
│ │          │  │  [Hamburger]          [Crisis Help] │ │
│ │ LOGO     │  ├────────────────────────────────────┤ │
│ │ Serenity │  │                                    │ │
│ │          │  │        PAGE CONTENT                │ │
│ │ ──────── │  │                                    │ │
│ │ Home     │  │   (varies by page — see below)     │ │
│ │ Mood     │  │                                    │ │
│ │ Journal  │  │                                    │ │
│ │ Tools    │  │                                    │ │
│ │ Community│  │                                    │ │
│ │          │  │                                    │ │
│ │ ──────── │  │                                    │ │
│ │ ● Anon   │  ├────────────────────────────────────┤ │
│ │ Stats    │  │  FOOTER (disclaimer)               │ │
│ └──────────┘  └────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
  SIDEBAR (260px)          MAIN CONTENT (flex)
```

#### Home Page — Daily Check-in
```
┌────────────────────────────────┐
│  Welcome back 💜               │
│  How are you feeling today?    │
│                                │
│  ┌──────────────────────────┐  │
│  │ 💜 Daily Check-in        │  │
│  │                          │  │
│  │  ┌────┐ ┌────┐ ┌────┐   │  │
│  │  │ 😊 │ │ 🙂 │ │ 😐 │   │  │
│  │  │Great│ │Good│ │Okay│   │  │
│  │  └────┘ └────┘ └────┘   │  │
│  │  ┌────┐ ┌────┐          │  │
│  │  │ 😟 │ │ 😢 │          │  │
│  │  │Bad │ │Terr│          │  │
│  │  └────┘ └────┘          │  │
│  │                          │  │
│  │  [Anything on your mind?]│  │
│  │  [____________________]  │  │
│  │                          │  │
│  │  [ Save Check-in ]       │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
```
**Annotations:**
- Mood emoji grid: 5 options in pastel-colored cards, selecting one highlights it with purple border
- Note field: optional text input with crisis keyword scanning (client-side)
- Save button: submits mood + note to MongoDB via POST
- If crisis keywords detected → crisis modal appears

#### Mood History Page
```
┌────────────────────────────────┐
│  📊 Mood History               │
│                                │
│  ┌──────────────────────────┐  │
│  │     Chart.js Line Graph  │  │
│  │  5 ─ 😊                  │  │
│  │  4 ─ 🙂     *    *       │  │
│  │  3 ─ 😐  *     *         │  │
│  │  2 ─ 😟                  │  │
│  │  1 ─ 😢                  │  │
│  │     Apr1  Apr2  Apr3     │  │
│  └──────────────────────────┘  │
│                                │
│  Recent Check-ins              │
│  ┌──────────────────────────┐  │
│  │ 😊 Great — "Good day"   │  │
│  │ 🙂 Good — Apr 5         │  │
│  │ 😐 Okay — Apr 4         │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
```
**Annotations:**
- Chart loads data via `/api/mood/data` JSON endpoint
- Color-coded points match mood (green=great, blue=good, etc.)
- List view shows all entries with timestamp

#### Journal Page
```
┌────────────────────────────────┐
│  📓 Journal      [+ New Entry] │
│                                │
│  ┌──────────────────────────┐  │
│  │ First day using Serenity │  │
│  │ I decided to try...      │  │
│  │ 😐 okay · Apr 2, 2026   │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │ The breathing exercise   │  │
│  │ I tried the box...       │  │
│  │ 🙂 good · Apr 4, 2026   │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
```
**Annotations:**
- Full CRUD: create, view, edit, delete entries
- Each card links to full entry view
- Entry view has Edit and Delete buttons
- Delete requires confirmation dialog

#### Coping Tools Page
```
┌────────────────────────────────┐
│  🧰 Coping Tools              │
│                                │
│  ┌────────────┐ ┌────────────┐ │
│  │  🫁        │ │  ✋        │ │
│  │  Box       │ │  5-4-3-2-1 │ │
│  │  Breathing │ │  Grounding │ │
│  │  4 min     │ │  5 min     │ │
│  └────────────┘ └────────────┘ │
│  ┌────────────┐ ┌────────────┐ │
│  │  ✍️        │ │  💜        │ │
│  │  Journaling│ │  Positive  │ │
│  │  Prompts   │ │ Affirmation│ │
│  │  10+ min   │ │  2 min     │ │
│  └────────────┘ └────────────┘ │
└────────────────────────────────┘
```
**Annotations:**
- Grid of tool cards with icon, name, description, duration badge
- Clicking opens interactive exercise page
- Breathing: animated expanding/contracting circle with countdown
- Grounding: step-by-step form walkthrough
- Prompts: random CBT-informed prompts with shuffle button
- Affirmations: rotating card display

#### Community Page
```
┌────────────────────────────────┐
│  👥 Community                  │
│                                │
│  ┌──────────────────────────┐  │
│  │ [Share what's on your    │  │
│  │  mind... ]               │  │
│  │ [Category ▼] [Share btn] │  │
│  └──────────────────────────┘  │
│                                │
│  [All] [School] [Family] ...   │
│                                │
│  ┌──────────────────────────┐  │
│  │ (A) Anonymous · school   │  │
│  │ Does anyone else feel... │  │
│  │ ♡ I hear you (12)  💬 2  │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
```
**Annotations:**
- New post form with content + category selector
- Category filter pills
- Vent cards show avatar initial, display name, category badge
- "I hear you" support button (increments counter)
- Reply count links to thread view

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Purple Dark | #6c3fa0 | Sidebar gradient start |
| Purple | #8b5cf6 | Primary accent, active states |
| Purple Light | #a78bfa | Hover states, borders |
| Teal | #14b8a6 | Secondary accent, buttons |
| Teal Light | #5eead4 | Stat highlights |
| Coral | #f87171 | Crisis button, danger |
| BG Light | #f3f0ff | Subtle backgrounds |
| BG Main | #faf8ff | Page background |

### Typography

- **Font:** Inter (Google Fonts)
- **Headings:** 700 weight, #1e1b4b
- **Body:** 400 weight, #374151
- **Small/Meta:** 400 weight, #6b7280
- **Base size:** 16px (1rem)

### Design Principles

1. **Calming aesthetic** — soft gradients, rounded corners, pastel mood colors
2. **Low friction** — no login, no setup, immediate access
3. **Safety first** — crisis resources always one click away
4. **Privacy by design** — anonymous sessions, no PII
5. **Accessibility** — WCAG AA contrast, keyboard nav, screen reader support, reduced motion
