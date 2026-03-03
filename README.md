# POLO STREAM

A modern React web application for streaming, renting, and buying movies.
Built with Vite, React (Functional Components & Hooks), and React Router v6.

## Features

- **No Backend Requirements**: Pure frontend application using local mocks.
- **State Persistence**: Rented and purchased movies are saved to `localStorage` via a custom hook.
- **BEM Methodology**: Styling is scoped and organized using CSS BEM standards.
- **Component Driven**: Over 10+ reusable UI components built from scratch.
- **Responsive Design**: Works perfectly on desktop and mobile.
- **Anonymous Usage**: No login required. Admin portal available at `/admin`.

## Structure

- `src/app`: Core app configurations (App.jsx, routes.jsx).
- `src/pages`: Distinct application views.
- `src/components`: Reusable UI categorized into layout, common, catalog, and movie.
- `src/hooks`: Custom React hooks (e.g., `useLocalStorageState`).
- `src/mocks`: Local mock data for movies and categories.
- `src/styles`: Global CSS reset and variables.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- `npm` (comes with Node.js).

### Installation

1. Clone or download the repository.
2. Navigate to the project directory:
   ```bash
   cd polo-stream
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

You can then preview the build:

```bash
npm run preview
```

## Built With

- React 18
- Vite
- React Router v6
- CSS3 (BEM)
