# Project Structure

This document outlines the recommended project structure and organization for the Empty React Native (Expo) template.

## Directory Structure

```
src/
├── app/                    # App entry points and navigation
│   ├── _layout.tsx        # Root layout (for Expo Router)
│   ├── index.tsx          # Home screen
│   └── [...]             # Other screens
├── components/            # React Native components
│   ├── ui/               # Reusable UI components
│   │   ├── button/
│   │   ├── card/
│   │   └── input/
│   └── shared/           # Shared components
│       ├── header/
│       └── screen-wrapper/
├── hooks/                # Custom hooks
│   ├── useAppState.ts
│   └── useTheme.ts
├── services/            # API and external services
│   ├── api/
│   └── storage/
├── store/              # State management
│   ├── slices/
│   └── index.ts
├── styles/             # Global styles and themes
│   ├── theme.ts
│   └── typography.ts
├── utils/             # Utility functions
│   ├── format.ts
│   └── validation.ts
└── types/             # TypeScript type definitions
    └── index.ts
```

## Key Directories and Files

### `src/app/`
- Uses Expo Router for file-based routing
- Each file represents a screen/route
- Shared layouts with `_layout.tsx`
- Dynamic routes with `[param].tsx`
- Modal screens with `+modal.tsx`

### `src/components/`
#### UI Components (`ui/`)
- Atomic, reusable UI components
- Platform-specific implementations when needed
- Each component in its own directory with:
  - Component file
  - Types file
  - Tests
  - Styles (if needed)

Example structure for a button component:
```
ui/
└── button/
    ├── button.tsx
    ├── button.test.tsx
    ├── button.types.ts
    ├── button.styles.ts
    └── index.ts
```

#### Shared Components (`shared/`)
- Larger, composed components
- Screen-level components
- Navigation-related components
- Layout components

### `src/hooks/`
- Custom React hooks
- Platform-specific hooks
- Reusable logic
- Feature-specific hooks

### `src/services/`
- API integration
- External service connections
- Local storage operations
- Device features access

### `src/store/`
- State management setup
- Store configuration
- Feature-specific slices
- Action creators

### `src/styles/`
- Theme definitions
- Typography settings
- Color palettes
- Common styles

### `src/utils/`
- Helper functions
- Formatters
- Validators
- Constants

## Naming Conventions

1. **Files and Directories**
   - Use kebab-case for directories: `screen-wrapper/`
   - Use PascalCase for component files: `Button.tsx`
   - Use camelCase for utility files: `formatDate.ts`

2. **Components**
   - Use PascalCase for component names: `ScreenWrapper`
   - Use camelCase for props interfaces: `interface ButtonProps`
   - Use `.ios.tsx` and `.android.tsx` for platform-specific files

3. **Functions and Variables**
   - Use camelCase: `getStorageItem()`
   - Use PascalCase for types and interfaces: `type UserData`

## Best Practices

1. **Component Organization**
   - Keep components focused and reusable
   - Use composition over inheritance
   - Implement platform-specific code properly
   - Handle responsive layouts

2. **File Structure**
   - Group related files together
   - Keep directory depth reasonable
   - Use index files for clean exports
   - Separate platform-specific code

3. **Code Organization**
   - Follow single responsibility principle
   - Keep related code close together
   - Use meaningful file names
   - Implement proper error boundaries

4. **Type Safety**
   - Use TypeScript strictly
   - Define clear interfaces
   - Avoid `any` type
   - Use proper React Native types

## Adding New Features

When adding new features:
1. Create appropriate screens in `src/app/`
2. Add necessary components
3. Implement required services
4. Update state management
5. Add types and tests
6. Follow platform-specific guidelines 