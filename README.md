# FitLog — Workout Library & Daily Fitness Planner

FitLog is a responsive Next.js application for discovering workouts, building a focused daily plan, and tracking completed exercises with persistent browser state.

[**Live Website**](https://fitlog-eosin-six.vercel.app/) | [**GitHub Repository**](https://github.com/rownak2385/ph-b14-assignment6)

## Overview

FitLog provides twelve exercises from a live REST API, detailed training guidance, a five-workout daily plan, saved exercises, and completion tracking. Plan data persists across browser sessions.

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

## Production Build

```bash
npm run lint
npm run build
```

## Deployment

FitLog is deployed on Vercel: [https://fitlog-eosin-six.vercel.app/](https://fitlog-eosin-six.vercel.app/)

## GitHub Repository

[github.com/rownak2385/ph-b14-assignment6](https://github.com/rownak2385/ph-b14-assignment6)
