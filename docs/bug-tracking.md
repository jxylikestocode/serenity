# Serenity — Bug Tracking Log

## Bug Tracking

| # | Date | Description | Severity | Status | Resolution |
|---|------|-------------|----------|--------|------------|
| 1 | Apr 7 | MongoDB connection crashes server if unavailable | High | ✅ Fixed | Changed to graceful error logging instead of process.exit(1) |
| 2 | Apr 7 | CSRF token not passed to EJS templates | High | ✅ Fixed | Added res.locals.csrfToken middleware in server.js |
| 3 | Apr 8 | Mood selector doesn't visually indicate selection | Medium | ✅ Fixed | Added .selected class with purple border and JS toggle |
| 4 | Apr 8 | Chart.js Y-axis showed decimal values | Low | ✅ Fixed | Set stepSize: 1 and custom tick labels with emojis |
| 5 | Apr 9 | Journal delete route returning 404 | High | ✅ Fixed | Changed from DELETE method to POST with method-override query string |
| 6 | Apr 9 | Crisis scanner triggering on partial word matches | Medium | ✅ Fixed | Keywords use full phrase matching, not single word |
| 7 | Apr 10 | Breathing animation continues after navigating away | Low | ✅ Fixed | Added stop function and clearTimeout on page unload |
| 8 | Apr 10 | Grounding exercise inputs not clearing between steps | Low | ✅ Fixed | Each step has its own set of inputs, no clearing needed |
| 9 | Apr 11 | Community "I hear you" button allowing multiple clicks | Low | ✅ Accepted | Accepted as feature — users can show extra support |
| 10 | Apr 12 | Helmet CSP blocking Bootstrap CDN | High | ✅ Fixed | Added cdn.jsdelivr.net to script-src and style-src directives |
| 11 | Apr 12 | Skip navigation link not visible on focus | Medium | ✅ Fixed | Added :focus styles with top:0 positioning |
| 12 | Apr 12 | Sidebar overlapping content on tablet viewport | Medium | ✅ Fixed | Added responsive breakpoint at 991px to hide sidebar |
| 13 | Apr 13 | Session cookie not persisting on Render deploy | High | ✅ Fixed | Set secure:true only in production, trust proxy in Express |
| 14 | Apr 13 | Seed script failing on duplicate data | Low | ✅ Fixed | Added deleteMany() for demo session before inserting |

## Known Limitations

| # | Description | Impact | Planned Fix |
|---|-------------|--------|-------------|
| 1 | No real-time updates in community (requires refresh) | Low | Future: add WebSocket with Socket.io |
| 2 | Support button doesn't prevent same-user multi-clicks | Low | Future: track supported posts in session |
| 3 | No image/file upload in journal | Low | Future: add multer middleware |
| 4 | No data export feature | Low | Future: add CSV/PDF export endpoint |
