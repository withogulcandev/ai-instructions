# Template Structure

This document outlines the recommended structure and organization for the Next.js template with Supabase integration.

## Directory Structure

```
├── app/                    # App directory (Next.js 15+ App Router)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── (routes)/         # Grouped routes
│       ├── dashboard/
│       │   ├── _components/  # Dashboard-specific components
│       │   │   ├── activity-chart.tsx
│       │   │   └── stats-cards.tsx
│       │   ├── layout.tsx
│       │   └── page.tsx
│       └── auth/
│           ├── _components/  # Auth-specific components
│           │   ├── auth-form.tsx
│           │   └── oauth-buttons.tsx
│           └── page.tsx
├── components/            # Shared React components
│   ├── ui/               # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   └── shared/           # Shared components
│       ├── header.tsx
│       └── sidebar.tsx
├── lib/                  # Utility functions and shared logic
│   ├── supabase/        # Supabase client and utilities
│   │   ├── client.ts    # Supabase client initialization
│   │   ├── auth.ts      # Auth helpers
│   │   ├── db.ts        # Database helpers
│   │   └── storage.ts   # Storage helpers
│   └── utils.ts         # General utilities
├── hooks/                # Custom React hooks
│   ├── use-auth.ts      # Supabase auth hooks
│   └── use-storage.ts   # Supabase storage hooks
├── styles/               # Global styles
│   └── globals.css      # Global Tailwind CSS styles
├── types/                # TypeScript type definitions
│   ├── supabase.ts      # Generated Supabase types
│   └── index.d.ts       # Global type declarations
├── public/              # Static assets
│   ├── images/
│   └── fonts/
├── config/              # Configuration files
│   └── site.ts         # Site configuration
└── supabase/           # Supabase configurations
    ├── migrations/     # Database migrations
    └── functions/      # Edge functions
```

## Key Directories and Files

### `app/`
- Uses Next.js 13+ App Router
- File-based routing system
- Page-specific components in `_components` folders
- Route groups with parentheses
- Loading and error states
- Server and Client Components

### `components/`
#### UI Components (`ui/`)
- shadcn/ui components
- Custom UI components
- Each component follows shadcn/ui conventions:
  - One file per component
  - Variants using class-variance-authority
  - Tailwind CSS for styling

Example structure for a custom component:
```tsx
// components/ui/button.tsx
import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

#### Page-Specific Components (`_components/`)
- Located within each page directory
- Components specific to that page/feature
- Not meant to be shared across pages
- Can use shared components from `components/`

Example structure for a page-specific component:
```tsx
// app/dashboard/_components/activity-chart.tsx
export function ActivityChart() {
  return (
    <div className="rounded-lg border p-4">
      {/* Chart implementation */}
    </div>
  )
}
```

### `lib/supabase/`
- Supabase client initialization
- Authentication utilities
- Database helpers
- Storage utilities
- Edge function helpers

### `hooks/`
- Custom React hooks
- Supabase-specific hooks
- State management hooks
- Feature-specific hooks

### `supabase/`
- Database migrations
- Edge functions
- Supabase type generation
- Supabase configuration

### `types/`
- TypeScript declarations
- Generated Supabase types
- Component prop types
- API response types

## Naming Conventions

1. **Files and Directories**
   - Use kebab-case for directories
   - Use kebab-case for component files (shadcn/ui convention)
   - Use camelCase for utility files
   - Prefix page-specific component directories with underscore (`_components`)

2. **Components**
   - Use PascalCase for component names
   - Use camelCase for props interfaces
   - Follow shadcn/ui naming conventions for UI components

3. **Functions and Variables**
   - Use camelCase
   - Use PascalCase for types and interfaces
   - Use UPPER_CASE for constants

## Best Practices

1. **Component Organization**
   - Keep shared components in `components/`
   - Place page-specific components in `_components/`
   - Follow shadcn/ui patterns for UI components
   - Use composition over inheritance

2. **File Structure**
   - Group related routes using route groups
   - Keep components organized by feature/purpose
   - Use barrel exports for clean imports
   - Follow Next.js 13+ conventions

3. **Code Organization**
   - Use TypeScript strictly
   - Implement proper error boundaries
   - Follow React Server Component patterns
   - Use appropriate data fetching methods

4. **Performance**
   - Implement proper image optimization
   - Use Next.js built-in performance features
   - Follow React best practices
   - Optimize bundle size

## Adding New Features

When adding new features:
1. Create appropriate routes in `app/`
2. Add page-specific components in `_components/`
3. Update shared components if needed
4. Add necessary Supabase configurations
5. Update types and documentation
6. Follow accessibility guidelines
7. Add proper error handling
``` 