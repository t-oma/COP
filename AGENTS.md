# Agent Guidelines for Word Search App

## Commands

- **Build**: `react-router build`
- **Dev server**: `react-router dev`
- **Type check**: `react-router typegen && tsc`
- **Lint**: `pnpm lint`
- **Test**: No test framework configured

## Code Style

- **Language**: TypeScript with strict mode enabled
- **Framework**: React Router v7 with SSR
- **Styling**: Tailwind CSS
- **Imports**: Group external imports first, then internal with `~/` alias
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Types**: Define interfaces/types in separate `.d.ts` files under `src/shared/types/`
- **File structure**: `src/app/` (routes), `src/pages/`, `src/shared/`, `src/widgets/`
- **Error handling**: Use React Router error boundaries for route errors
- **Linting**: ESLint with React/TypeScript recommended rules

