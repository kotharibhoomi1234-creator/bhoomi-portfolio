# Bhoomi’s Desk

Bhoomi Kothari’s portfolio, rebuilt around her supplied Canva design and the editorial structure and interaction patterns of Hitarth Vasa’s portfolio. Semantic HTML, CSS and JavaScript; no production dependencies. The existing Sites identity and audience are preserved.

## Run

All production files are in `dist/`. Use `npm run dev` to serve locally, and `npm run build` to validate asset references, content inventories, JavaScript syntax and navigation. Static hosting should publish the contents of `dist/`.

## Edit

- `dist/index.html`: biography, section structure, experience and contact.
- `dist/content.js`: project descriptions, skills and leadership data.
- `dist/collage.css`: cobalt collage design and responsive layouts.
- `dist/collage.js`: project selection/filtering, photo album, portrait flip, poetry previews, navigation and scroll effects.
- `dist/collection-theme.css`: consistent styling of poetry, café and music pages.
- `dist/poems-data.js`: all 37 original poems; their wording is preserved.
- `dist/poems.html`, `dist/music.html`, `dist/cafes.html`: complete original collections.

## Design sources

- User-supplied Canva design: `https://canva.link/4amcoc22eh4wayd`, titled “Blue and White Vintage Scrapbook Creative Portfolio Presentation”. Its exported decorative elements are hosted under `dist/assets/collage/`, optimised as transparent WebP images. The background colour is the design’s original `#1c53a3`. Use of these assets remains subject to the user’s Canva entitlements.
- Content and all 11 personal photographs: the existing Bhoomi’s Desk source repository. The About photos fill the Polaroid frame using cover fitting and focal positions, without stretching. The separate photo album and home-page photo prompt have been removed.
- Fonts: locally hosted DM Sans for readable body text and Great Vibes for script accents, from Google Fonts. Open Sans remains as an older fallback asset. Great Vibes provides the flowing script accent; the Canva design itself uses Sloop Script Pro.
- Reference structure and motion: `https://hitarthvasaportfolio.netlify.app/`. No friend’s personal content or photographs are used. Both sites use lightweight HTML, CSS and JavaScript; this build uses native smooth scrolling, IntersectionObserver and requestAnimationFrame.

## Interaction and accessibility

Project filters and selectable cards expose their state to assistive technology and support arrow/Home/End keys. The toolkit is a keyboard-operable tab interface. Journey tickets are native expandable details with role bubbles. The About photo advances with each flip and wraps through all 11 photographs. The notebook cover opens and closes on tap; opening it reveals a poem. The takeaway coffee lid lifts and closes. The vinyl plays a 15-second official preview while spinning, with 12 tracks from the six playlists. Playback stops on another tap, when the page is hidden, or after 15 seconds. The mobile menu has expanded state and Escape support. Reduced-motion settings disable decorative animations. No audio plays automatically.

A new full-screen welcome uses the same cobalt blue with five descending, tiled SVG mirror balls. Visitors can enter or skip immediately. It appears once per tab session on the homepage; direct section links bypass it. A footer control replays it. The native dialog supports Escape and manages focus. Reduced motion shows the welcome without animation.

The TS playlist was removed, leaving six playlists. Bars, rooftops and Saturday evenings are merged into one nightlife group, with all 90 places retained. The supplied screenshot informed checkerboard tape, a conversation ticket and star details. The small About trait labels and school leadership list are no longer displayed.

## Verification

`node verify.mjs` checks all four pages, local links, JavaScript syntax, unique IDs, section anchors, CSS references and collection inventories. Images and styles are checked separately for valid encoding and balanced CSS delimiters. Static JavaScript target references and the mirror-ball SVG are also validated. Browser rendering and interaction QA were unavailable in this environment; no browser visual verification is claimed.

Earlier styles/assets are retained as source history but the main page loads only the new collage design. The standalone collections load their base layout plus the matching collection theme.


## Latest styling files
- `dist/refinements.css` and `dist/readable-fonts.css`: readable DM Sans type, fitted Polaroids, toolkit and journey tickets.
- `dist/welcome.css` and `dist/welcome.js`: animated mirror-ball welcome and accessible entry controls.
- `dist/assets/welcome/mirror-ball.svg`: original vector mirror-ball artwork.

## Complete source package

See `DEPLOY.md` for local setup and Netlify, Vercel or static-host deployment. `dist/desk-interactions.css` contains the compact People introduction and animated notebook; `dist/music-previews.js` and `dist/vinyl.js` provide click-to-play samples. The intro label has a reserved gap above the script heading.
