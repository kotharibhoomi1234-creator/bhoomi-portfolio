# Deploy Bhoomi’s Desk

This is a complete static website. Every HTML page, script, stylesheet, photograph, font and decorative asset is included under `dist/`, with the original subfolders preserved. There is no backend, database, API key or paid framework dependency.

## Fastest option: static upload

Upload **the contents of `dist/`** to your static host. `index.html` must be at the published root. Keep all other pages and folders alongside it. On Netlify's manual deploy screen, drag in the `dist` folder. Do not upload the outer source folder as your site's web root.

## Deploy from a Git repository

Commit this folder to your own repository, then import it into Netlify or Vercel. Configuration for both is included. Use:

- Framework preset: Other / None
- Build command: `npm run build`
- Publish / output directory: `dist`
- Node: 20 or newer
- Environment variables: none

For GitHub Pages, publish the contents of `dist` as the Pages root. All local page and asset paths are relative, so a repository subpath is supported.

## Run and edit locally

Install Node.js 20 or newer. Open a terminal in this source folder:

```sh
npm run dev
```

Open `http://localhost:5173`. Stop with Ctrl+C. No dependency installation is necessary. `PORT=8080 npm run dev` uses another port on macOS/Linux.

```sh
npm run build
npm test
```

The build command validates the ready-to-upload files; it does not generate a second output folder. The tests check preview playback controls and timing.

## Where to make changes

| File | Contents |
| --- | --- |
| `dist/index.html` | Homepage copy, sections, contact and desk objects |
| `dist/content.js` | Projects and skills |
| `dist/collage.css`, `dist/refinements.css` | Main design and responsive layout |
| `dist/desk-interactions.css` | Compact People layout and hinged notebook |
| `dist/collage.js` | Project filters, toolkit, portrait flip and notebook actions |
| `dist/welcome.css`, `dist/welcome.js` | Intro layout, mirror balls, entry and replay |
| `dist/music-previews.js`, `dist/vinyl.js` | Playlist track samples and 15-second player |
| `dist/poems-data.js` | All 37 poems |
| `dist/poems.html`, `dist/music.html`, `dist/cafes.html` | Full collections |
| `dist/assets/` | All photographs, decorative images and fonts |

## Music and external links

The vinyl cycles through 12 official Apple audio previews: two tracks verified in each of the six linked playlists on 18 October 2026. Audio is streamed from Apple only after a tap and is stopped after 15 seconds, on a second tap, or when the tab is hidden. Each play shows its title, artist and source playlist, with a link to the full song. The previews need an internet connection and remain subject to Apple's regional availability. If one is unavailable, visitors can try the next or open Apple Music. This is a fixed selection of playlist tracks; changes to your Apple playlists do not automatically update this file. Audio files are not redistributed in this package.

All visual assets and fonts are local. The original supplied decorative assets and photographs remain yours to use according to their original permissions. Legacy files are retained for completeness; the live pages explicitly reference the active scripts and styles.

## Included / excluded

The ZIP contains the complete current website source, all assets, local server, validation and playback tests, plus deployment configurations. Private deployment credentials, repository history, platform-specific site identity and temporary working files are excluded. None are needed to deploy elsewhere.

## Verification limits

Static asset/link checks and JavaScript playback tests pass. Official preview URLs responded successfully when checked. Browser layout, device audio output and hosting on third-party platforms were not tested in this environment.
