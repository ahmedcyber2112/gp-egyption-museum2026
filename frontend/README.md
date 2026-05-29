# Grand Egyptian Museum Frontend

<p align="center">
	<img src="public/assets/images/eh.png" alt="Grand Egyptian Museum Logo" width="320" />
</p>

A modern Next.js frontend for the Grand Egyptian Museum virtual experience. The project includes public museum pages, authentication flows, artifact browsing, 3D model viewing, AI assistant interactions, community features, favorites, tours, and an admin area and do it any .

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Three Fiber / Drei / Three.js
- Chart.js and Recharts
- AI SDK and EmailJS

## Features

- Museum-style landing page with animated sections
- Sign in and sign up pages with responsive layouts
- Artifact detail pages with 3D model viewing
- Categories and featured artifacts browsing
- Favorites and loved items collections
- Community page with reactions and comments
- Tour booking experience
- AI assistant and chatbot pages
- Admin dashboard sections for content management
- Shared public chrome with navbar, footer, and floating buttons

## Project Structure

- `src/app/(page)` - public site pages and layout
- `src/app/(auth)` - authentication pages and layout
- `src/app/(admin)` - admin panels and tools
- `src/app/artifacts/[id]` - artifact detail route
- `src/components` - reusable UI and page sections
- `src/Data` - JSON data for artifacts and categories
- `public/assets/images` - logos, backgrounds, and media assets

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The app calls the backend API at `https://muesum-a252b23f7b32.herokuapp.com` by default. Override with `NEXT_PUBLIC_API_BASE_URL` (see `.env.example`).

### Netlify

Repo: **https://github.com/TUSK56/GP-Egyption-Museum2026** — see [`../NETLIFY.md`](../NETLIFY.md) if deploy fails with "Unable to access repository".

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint

## Notes

- The app uses the Next.js App Router.
- Most artwork and model assets are stored under `public/assets`.
- The project is designed to be responsive across mobile, tablet, and desktop screens.

## Contributing

If you add a new page or component, keep the existing visual language consistent with the museum theme and test the layout on smaller screens before merging.
