# Project Setup Instructions

This document outlines the step-by-step process for setting up the Empty Next.js project template.

## Prerequisites
- Node.js 18.17 or later
- Git
- Package manager (npm, yarn, or pnpm)

## Initial Setup

### 1. Project Creation
```bash
# Using create-next-app
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navigate to project directory
cd my-app
```

### 2. Additional Dependencies

```bash
# Development dependencies
npm install -D prettier prettier-plugin-tailwindcss @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom husky lint-staged

# UI and functionality
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
```

### 3. Configuration Files

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

#### ESLint Configuration (`.eslintrc.json`)
```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "warn"
  }
}
```

#### Prettier Configuration (`.prettierrc`)
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 4. Git Setup

```bash
# Initialize Git repository (if not already done)
git init

# Create .gitignore
cat > .gitignore << EOL
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
EOL
```

### 5. Husky Setup

```bash
# Initialize Husky
npx husky-init && npm install

# Add lint-staged configuration to package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

## Post-Setup Verification

1. Start the development server:
```bash
npm run dev
```

2. Verify the following:
   - Application runs without errors
   - TypeScript compilation succeeds
   - ESLint shows no errors
   - Prettier formatting works
   - Git hooks are working

## Next Steps

After completing the setup:
1. Review the project structure documentation
2. Set up your development environment
3. Configure your IDE settings
4. Review the development guidelines 