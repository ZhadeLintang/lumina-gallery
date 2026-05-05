# Lumina Gallery - Digital Art Experience

A premium digital gallery built with React, TypeScript, and Framer Motion. Featuring a futuristic dark theme, glassmorphism effects, and a robust gallery management system.

## Features

- **Authentication System**: Secure login and registration with data persistence in `localStorage`.
- **Masonry Gallery**: Responsive grid layout with smooth hover animations and zoom effects.
- **Image Discovery**: Search by title and filter by category.
- **Creator Dashboard**: Manage your uploads, view stats, and delete items.
- **Upload System**: Multi-step upload process with real-time image preview.
- **Premium UI**: Dark mode with purple accents, glassmorphism components, and smooth transitions.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Styling**: Vanilla CSS (Custom Design System)

## Getting Started

Since the environment has restrictions on running `npm` commands directly, please follow these steps on your local machine:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Design System

The app uses a custom CSS design system defined in `src/index.css`. Key tokens:
- Primary: `#a855f7` (Purple)
- Accent: `#d946ef` (Pink/Magenta)
- Background: `#0a0a0a` (Black)
- Glass: Translucent white with backdrop blur

## Project Structure

```
/src
  /components     # Reusable UI components
  /context        # Auth & Global state
  /hooks          # Gallery & Logic hooks
  /pages          # Page components
  App.tsx         # Main routing
  index.css       # Global styles
  main.tsx        # Entry point
```
