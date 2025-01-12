# Next.js SaaS Starter - Project Structure

This is a minimalist SaaS starter template focusing on essential features for launching a SaaS product.

## Core Features

### Authentication (Supabase)
- Email/Password authentication
- Social logins (Google, GitHub)
- Protected routes
- User profile management

### Payment Integration (Stripe)
- Subscription management
- One-time payments
- Basic pricing plans

## Page Structure

### Public Pages
1. **Landing Page** (`/`)
   - Hero section
   - Feature highlights
   - Call-to-action sections
   - Simple footer

2. **Pricing Page** (`/pricing`)
   - Pricing plans
   - Feature comparison
   - FAQ section

3. **Authentication Pages**
   - Login (`/login`)
   - Register (`/register`)
   - Forgot Password (`/forgot-password`)

### Protected Pages
1. **Dashboard** (`/dashboard`)
   - User welcome section
   - Basic stats/metrics
   - Quick actions menu

## Technical Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI Components

### Backend & Services
- Supabase (Auth & Database)
- Stripe (Payments)
- Vercel (Deployment)

## Database Schema

### Users (Supabase Auth)
```sql
-- Extended user profiles
profiles (
  id uuid references auth.users,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)

-- Subscriptions
subscriptions (
  id uuid primary key,
  user_id uuid references auth.users,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan_id text,
  status text,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone
)
```

## Project Structure
```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (dashboard)/       # Protected dashboard pages
│   └── (marketing)/       # Public pages (landing, pricing)
├── components/            # React components
│   ├── auth/             # Auth-related components
│   ├── dashboard/        # Dashboard components
│   ├── marketing/        # Landing page components
│   └── ui/               # Shared UI components
├── lib/                  # Utility functions
│   ├── supabase/        # Supabase client & helpers
│   └── stripe/          # Stripe integration helpers
└── styles/              # Global styles
```

## Getting Started

1. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Set up Supabase project
   - Configure Stripe account

2. **Database Setup**
   - Run Supabase migrations
   - Set up initial data

3. **Development**
   - Install dependencies
   - Run development server
   - Test auth flow
   - Test payment integration

## Development Guidelines

1. **Code Organization**
   - Use TypeScript for type safety
   - Follow Next.js App Router best practices
   - Keep components modular and reusable

2. **Styling**
   - Use Tailwind CSS for styling
   - Follow consistent design patterns
   - Maintain responsive design

3. **Authentication**
   - Implement proper auth middleware
   - Handle auth state properly
   - Secure protected routes

4. **Payment Integration**
   - Handle webhook events
   - Implement proper error handling
   - Test payment flows thoroughly 