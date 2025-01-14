# Template Integration Guide

This document provides instructions for integrating the Next.js with Supabase template into new or existing projects.

## Prerequisites

1. Project Requirements:
   - Node.js 18.17 or later
   - Git installed
   - Code editor (VS Code recommended)
   - Supabase account

2. Development Environment:
   - TypeScript setup
   - ESLint and Prettier
   - Tailwind CSS
   - shadcn/ui CLI

## Integration Process

1. Project Preparation
   - Create or backup existing project
   - Review current structure
   - Identify potential conflicts
   - Clean up default files

2. Dependencies Installation
   ```bash
   # Core dependencies
   npm install next@latest react@latest react-dom@latest
   
   # Supabase
   npm install @supabase/ssr @supabase/supabase-js
   
   # UI and styling
   npm install tailwindcss postcss autoprefixer
   npx shadcn-ui@latest init
   
   # Development tools
   npm install -D typescript @types/react @types/node
   ```

3. Structure Implementation
   - Create template directory structure
   - Set up app router layout
   - Implement component organization
   - Configure Supabase integration

4. Configuration Updates
   ```typescript
   // next.config.js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     images: {
       domains: ['your-supabase-project.supabase.co'],
     },
   }
   
   module.exports = nextConfig
   ```

5. Environment Setup
   ```env
   # .env.local
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## Common Integration Scenarios

1. New Project Setup
   ```bash
   # Create new project
   npx create-next-app@latest my-app --typescript --tailwind --eslint
   cd my-app
   
   # Follow template structure
   mkdir -p app/(routes)/{dashboard,auth}/_components
   mkdir -p components/{ui,shared}
   mkdir -p lib/supabase
   ```

2. Existing Project Migration
   - Back up your project
   - Merge configurations
   - Update directory structure
   - Migrate components

3. Database Setup
   ```sql
   -- Create tables
   create table public.profiles (
     id uuid references auth.users on delete cascade,
     username text unique,
     avatar_url text,
     updated_at timestamp with time zone
   );
   
   -- Enable RLS
   alter table public.profiles enable row level security;
   
   -- Create policies
   create policy "Public profiles are viewable by everyone"
     on profiles for select
     using ( true );
   ```

## Verification Steps

1. Build Verification
   ```bash
   # Type checking
   npm run typecheck
   
   # Lint
   npm run lint
   
   # Build
   npm run build
   ```

2. Runtime Verification
   - Application starts successfully
   - Authentication works
   - Database queries function
   - File uploads work
   - Real-time updates function

## Troubleshooting

1. Common Issues
   - Authentication errors
   - Database connection issues
   - Type generation problems
   - Build configuration errors

2. Resolution Steps
   ```bash
   # Clear next.js cache
   rm -rf .next
   
   # Regenerate types
   npx supabase gen types typescript --project-id your-project-id > types/supabase.ts
   
   # Check Supabase status
   npx supabase status
   ```

## Security Setup

1. Authentication Configuration
   ```typescript
   // middleware.ts
   import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
   import { NextResponse } from 'next/server'
   import type { NextRequest } from 'next/server'
   
   export async function middleware(req: NextRequest) {
     const res = NextResponse.next()
     const supabase = createMiddlewareClient({ req, res })
     await supabase.auth.getSession()
     return res
   }
   ```

2. Database Policies
   ```sql
   -- Secure profile updates
   create policy "Users can update own profile"
     on profiles for update
     using ( auth.uid() = id );
   
   -- Secure file uploads
   create policy "Avatar uploads require authentication"
     on storage.objects for insert
     with check ( auth.role() = 'authenticated' );
   ```

## Performance Optimization

1. Caching Setup
   ```typescript
   // Route segment config
   export const revalidate = 3600 // Revalidate every hour
   
   // Dynamic data fetching
   const { data } = await supabase
     .from('posts')
     .select()
     .order('created_at', { ascending: false })
     .limit(10)
   ```

2. Image Optimization
   ```typescript
   // next.config.js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     images: {
       domains: ['your-supabase-project.supabase.co'],
       formats: ['image/avif', 'image/webp'],
     },
   }
   ```
``` 