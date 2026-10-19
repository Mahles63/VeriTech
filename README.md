# Discoveries

Discoveries is a responsive editorial archive for four image collections: series, movies, performance cars, and seasonal photography. A single Discoveries menu opens each collection, with a “Surprise me” shortcut for an unexpected pick. Cards include image-specific notes and context; opening an entry brings up an accessible image viewer with previous/next navigation. Visitors can search each collection and keep a cross-collection favorites list in local storage.

The site is owned by [Mahles63](https://github.com/Mahles63), with the project source at [github.com/Mahles63/VeriTech](https://github.com/Mahles63/VeriTech).

Built with React, Vite, and Tailwind CSS 4. Artwork is imported from the original `Task 1`, `Task 2`, and `Task 4` folders and remains credited to its respective owners. Some original filenames do not accurately identify the image; page captions and image notes describe the visible artwork. Exact vehicle model years and trims are left unspecified where the image cannot verify them.

## Run locally

Requires Node.js 20.19 or newer.

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Deploy to Vercel

Import the repository and use the default Vite configuration:

- Build command: `npm run build`
- Output directory: `dist`

`vercel.json` includes a rewrite for direct visits and page refreshes.

Discoveries is a showcase, not a streaming or commerce service. It does not stream films, sell vehicles, or collect account information; favorites are stored only in the visitor’s browser.
