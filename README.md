# DCCEEW Design System

Custom UI component library built on [MUI v7](https://mui.com/) with React 19 and TypeScript.

## Quick Start

```bash
# Install dependencies
npm install

# Run Storybook (component playground + docs)
npm run storybook

# Run unit tests
npm test

# Build the library
npm run build
```

## Project Structure

```
src/
├── components/          # Custom components (AppButton, etc.)
│   └── AppButton/
│       ├── AppButton.tsx          # Component implementation
│       ├── AppButton.test.tsx     # Unit + interaction tests
│       ├── AppButton.stories.tsx  # Storybook stories
│       └── index.ts               # Barrel export
├── theme/
│   ├── tokens.ts        # Raw design tokens (colors, spacing, radii, motion)
│   ├── palette.ts       # MUI palette overrides (light + dark)
│   ├── typography.ts    # MUI typography overrides
│   ├── components.ts    # MUI component default prop/style overrides
│   └── index.ts         # createTheme() assembly + exports
├── hooks/               # Shared hooks (useControlled, etc.)
├── utils/               # Shared helpers (mergeSlotProps, etc.)
├── types.ts             # Shared types
└── index.ts             # Library barrel export
```

## Component Architecture

Components follow three tiers:

| Tier | Pattern | Example |
|------|---------|---------|
| **Thin Wrapper** | Forward props to MUI, enforce defaults | `AppButton` |
| **Composed** | Combine MUI primitives, simplified API | `ConfirmDialog` |
| **Behavioral** | Significant state/interaction logic | `StepperForm` |

### Adding a New Component

1. Create a folder under `src/components/YourComponent/`
2. Implement the component (forward ref, spread MUI props)
3. Write Storybook stories (`YourComponent.stories.tsx`)
4. Write unit tests (`YourComponent.test.tsx`)
5. Export from `src/index.ts`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm test` | Run unit tests (Vitest + RTL) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:storybook` | Run Storybook interaction tests |
| `npm run test:visual` | Run Playwright visual regression tests |
| `npm run test:visual:update` | Update visual regression snapshots |
| `npm run build` | Build the library (ESM + CJS + types) |
| `npm run build-storybook` | Build static Storybook site |
| `npm run lint` | Run ESLint |

## Theme

The library ships light and dark themes built from design tokens:

```tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from 'dcceew-design-system';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {/* your app */}
    </ThemeProvider>
  );
}
```

## Testing Strategy

- **Unit / Interaction**: Vitest + React Testing Library (jsdom) — covers rendering, keyboard, focus, disabled, loading, ARIA, and axe accessibility audits
- **Story Tests**: Storybook addon-vitest — runs interaction play functions in a real browser via Playwright
- **Visual Regression**: Playwright screenshot tests against built Storybook

## Tech Stack

- React 19 + TypeScript 5.9
- MUI v7 (Material UI) + Emotion
- Vite 7 (dev + library build)
- Storybook 10 (documentation + interaction testing)
- Vitest 4 + React Testing Library (unit tests)
- Playwright (visual regression)
- axe-core (accessibility auditing)
