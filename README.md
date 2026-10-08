# FitLog — Workout Library & Daily Fitness Planner

## Overview

FitLog is a responsive fitness library and daily workout planner. It lets users explore twelve exercises from a live REST API, review detailed instructions and training specs, build a focused plan of up to five workouts, save exercises for later, and track completed lifts. Plan and saved data persist in the browser so the experience survives refreshes.

## Key Features

- Browse a responsive library of twelve API-powered workouts with images, muscle-group tags, equipment, duration, calories, and ratings.
- Sort the workout library by duration, calories, or rating.
- Open a dedicated details page for every workout with key specs and step-by-step instructions.
- Add up to five exercises to today's plan or save any workout for later, with live navbar counters and toast feedback.
- Review live plan metrics for exercise count, total minutes, and total calories.
- Mark planned workouts as complete and remove items independently from the plan or saved list.
- Keep plan, saved, and completion state synchronized across routes and browser refreshes with React Context and `localStorage`.
- Handle loading, empty, API error, missing-workout, and unknown-route states with responsive, accessible UI.

## Technologies

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React
- Sonner
- React Context
- Browser `localStorage`
- REST API integration

## Installation

Prerequisites: Node.js 20.9 or newer and npm.

```bash
git clone https://github.com/rownak2385/ph-b14-assignment6.git
cd ph-b14-assignment6
npm install
```

## Environment and API

FitLog does not require environment variables. Workout data is requested from the primary endpoint and automatically falls back to the alternate endpoint if the primary service is unavailable.

- Primary collection: `https://api.abcz.workers.dev/api/fitlog`
- Primary workout: `https://api.abcz.workers.dev/api/fitlog/:id`
- Alternate collection: `https://api.api-store.workers.dev/api/fitlog`
- Alternate workout: `https://api.api-store.workers.dev/api/fitlog/:id`

The app validates API responses before rendering them. Personal plan data remains local to the browser under the `fitlog:v1` storage key.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Workout library, hero, and sorting controls |
| `/workouts/[id]` | Dynamic workout details and plan/save actions |
| `/my-plan` | Today's plan, saved workouts, metrics, completion, and removal |
| Any unknown route | Custom FitLog 404 page |

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The development server supports direct navigation and refreshes on all application routes.

## Production Build

```bash
npm run lint
npm run build
npm run start
```

The production server runs at [http://localhost:3000](http://localhost:3000) by default.

## Deployment

The project is configured for deployment on Vercel. Import the GitHub repository, keep the detected Next.js settings, and deploy without adding environment variables. Vercel runs the production build automatically and supports direct refreshes on App Router routes.

## GitHub Repository

[github.com/rownak2385/ph-b14-assignment6](https://github.com/rownak2385/ph-b14-assignment6)
