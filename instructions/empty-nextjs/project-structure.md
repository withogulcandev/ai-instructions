# Project Structure

This document outlines the recommended project structure and organization for the Empty Next.js template.

## Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── error.tsx          # Error boundary
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── button/
│   │   ├── card/
│   │   └── input/
│   └── shared/           # Shared components
│       ├── header/
│       └── footer/
├── lib/                  # Utility functions and shared logic
│   ├── utils.ts         # Helper functions
│   └── constants.ts     # Global constants
├── styles/              # Global styles
│   └── globals.css      # Global CSS
└── types/               # TypeScript type definitions
    └── index.ts         # Shared types
```

## Key Directories and Files

### `src/app/`
- Contains all pages and layouts using the Next.js App Router
- Each route is represented by a directory containing a `page.tsx` file
- Shared layouts are defined in `layout.tsx` files
- Error handling with `error.tsx` and `not-found.tsx`

### `src/components/`
#### UI Components (`ui/`)
- Atomic, reusable UI components
- Each component in its own directory with:
  - Component file
  - Types file (if needed)
  - Tests
  - Stories (if using Storybook)

Example structure for a button component:
```
ui/
└── button/
    ├── button.tsx
    ├── button.test.tsx
    ├── button.types.ts
    └── index.ts
```

#### Shared Components (`shared/`)
- Larger, composed components used across multiple pages
- Follow same structure as UI components
- May import and use multiple UI components

### `src/lib/`
- Utility functions and shared business logic
- Constants and configuration
- Custom hooks
- API utilities

### `src/styles/`
- Global CSS styles
- Tailwind CSS configuration
- Theme definitions
- CSS variables

### `src/types/`
- TypeScript type definitions
- Shared interfaces
- Type utilities

## Naming Conventions

1. **Files and Directories**
   - Use kebab-case for directories: `user-profile/`
   - Use PascalCase for component files: `Button.tsx`
   - Use camelCase for utility files: `formatDate.ts`

2. **Components**
   - Use PascalCase for component names: `UserProfile`
   - Use camelCase for props interfaces: `interface ButtonProps`

3. **Functions and Variables**
   - Use camelCase: `getUserData()`
   - Use PascalCase for types and interfaces: `type UserData`

## Best Practices

1. **Component Organization**
   - Keep components small and focused
   - Use composition over inheritance
   - Maintain clear component boundaries

2. **File Structure**
   - Group related files together
   - Keep directory depth reasonable (max 3-4 levels)
   - Use index files for clean exports

3. **Code Organization**
   - Follow single responsibility principle
   - Keep related code close together
   - Use meaningful file names

4. **Type Safety**
   - Use TypeScript strictly
   - Define clear interfaces
   - Avoid `any` type

## Adding New Features

When adding new features:
1. Create appropriate directories under `src/app/`
2. Add necessary components to `src/components/`
3. Update types as needed
4. Follow existing patterns and conventions 