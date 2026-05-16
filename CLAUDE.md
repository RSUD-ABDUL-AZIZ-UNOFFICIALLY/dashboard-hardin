# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
- Install dependencies: `npm install`
- Run development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm run start`
- Lint code: `npm run lint`

## Architecture & Structure
- **Framework**: Next.js 14 (App Router) with TypeScript.
- **Styling**: Tailwind CSS and SCSS (`app/globals.css`, `app/globals.scss`).
- **UI Components**: Built using NextUI (`@nextui-org/react`) and Framer Motion for animations.
- **Core Logic**:
  - `app/`: Contains all application routes and layouts.
  - `app/Component/`: Shared reusable UI components.
  - `app/auth/` & `app/login/`: Authentication and authorization flow.
  - `app/middleware/`: Middleware for request handling and authentication checks.
  - `public/`: Static assets and images.
- **Libraries**: 
  - Data Visualization: `chart.js` and `react-chartjs-2`.
  - API Requests: `axios`.
  - Date Handling: `date-fns` and `moment`.
  - Authentication: `jsonwebtoken` and `aws-jwt-verify`.
