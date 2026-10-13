# Nestor the Investor · START Hack 2026

A front-end prototype of a banking app with an investing assistant mode called Nestor. It was built for START Hack 2026 (N26 challenge) as a clickable demo of how a banking app could guide first-time investors.

What it does

The app is a set of connected screens, with a global toggle that switches the experience into Nestor mode:

Route	Screen
/	Finance overview
/home	Home
/explore	Explore assets
/asset	Asset detail
/invest	Invest preview (before confirming an investment)
/cards	Cards
/portfolio-future	Projected portfolio
/portfolio-future/:assetId	Projected detail for a single asset

Insights for Nestor mode are served by a Supabase Edge Function (nestor-insights), and the app uses Recharts for portfolio and asset charts.

Tech stack
React 18 + TypeScript, built with Vite
Tailwind CSS and shadcn/ui (Radix UI components)
React Router for navigation, TanStack Query for data fetching
Recharts for charts, react-markdown for rendered text
Supabase (JS client and an Edge Function) as the backend
Vitest and Testing Library for tests

Bootstrapped with Lovable and then developed further by the team.

Getting started
bash
git clone https://github.com/IgorBCUB/STARTHACK2026.git
cd STARTHACK2026
npm install
npm run dev

Then open the local URL printed in the terminal.

The app expects the credentials of a Supabase project in a local .env file, which is not committed to the repository. Without it, the screens that depend on Nestor's insights will not load data.

Other scripts: npm run build, npm run lint, npm test.

Project structure
src/pages/        Application screens (Finance, Home, Explore, Asset, Invest, Cards, Portfolio future)
src/components/   UI components, including the Nestor mode toggle
src/contexts/     Nestor mode context
supabase/         Edge Function configuration
Team

Built by a team during START Hack 2026.

# Instructions
To compile the project:
- Unzip the n26-nestorTheInvestorFolder
- Enter in and make: "npm i" in the linux terminal
- When it finishes without errors then put: "npm run dev"
- Copy the local link and put it in the browser.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
