# Project Structure

Basic directory organization for the Empty Next.js template.

## Directory Structure

```
src/
├── app/                   # Next.js App Router
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/              # Shadcn UI components
│   └── shared/          # Shared components
├── lib/                 # Utility functions
│   └── utils.ts         # Helper functions
├── styles/              # Global styles
│   └── globals.css      # Global CSS
└── types/               # TypeScript types
    └── index.ts         # Shared types
```

## Directory Purposes

### `src/app/`
- Contains pages and layouts using Next.js App Router
- Each route is a directory with a `page.tsx` file
- Layouts defined in `layout.tsx` files

### `src/components/`
- `ui/`: Shadcn UI components and customizations
- `shared/`: Reusable components used across pages

### `src/lib/`
- Utility functions and shared logic
- Constants and configuration

### `src/styles/`
- Global CSS styles
- Tailwind CSS configuration

### `src/types/`
- TypeScript type definitions
- Shared interfaces 