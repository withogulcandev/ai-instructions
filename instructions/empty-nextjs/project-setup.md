# Project Setup Instructions

Simple setup guide for the Empty Next.js project template.

## Prerequisites
- Node.js 18.17 or later
- Git
- Package manager (npm, yarn, or pnpm)

## Setup Steps

### 1. Project Creation
```bash
# Using create-next-app
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"

# Add Shadcn UI
npx shadcn@latest init

# Add Shadcn UI Button
npx shadcn@latest add button
```

### 2. Essential Configuration Files

#### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3. Initial Page Setup
The template includes a basic hero section in `src/app/page.tsx`:

```tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black">
      <div className="container px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Empty Next.js Template
        </h1>
        <p className="mb-8 text-lg text-zinc-300">
          Get started by running:
        </p>
        <div className="flex justify-center">
          <code className="relative rounded bg-zinc-800 px-[0.5rem] py-[0.3rem] font-mono text-sm text-zinc-100">
            npx ai-instructions init --template "empty-nextjs"
          </code>
        </div>
        <div className="mt-8">
          <a href="https://github.com/withogulcandev/ai-instructions" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="text-white">
              GitHub
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
```

### 4. Basic Git Setup

```bash
# Initialize Git repository (if not already done)
git init

# Create .gitignore
cat > .gitignore << EOL
/node_modules
/.pnp
.pnp.js
/coverage
/.next/
/out/
/build
.DS_Store
*.pem
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env*.local
.vercel
*.tsbuildinfo
next-env.d.ts
EOL
```

## Verification

1. Start the development server:
```bash
npm run dev
```

2. Check that:
   - Application runs without errors
   - TypeScript compilation works
   - Shadcn UI components are working
   - Hero section displays correctly
``` 