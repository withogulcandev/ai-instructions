# Template Development Guidelines

This document outlines the development guidelines and best practices for the Next.js with Supabase template.

## Code Style and Standards

### TypeScript
- Enable strict mode
- Use explicit type annotations
- Avoid using `any` type
- Use interfaces for object shapes
- Leverage union types and type guards

```typescript
// Good
interface User {
  id: string
  email: string
  profile: {
    username: string
    avatar_url: string
  }
}

async function getUser(id: string): Promise<User> {
  // Implementation
}

// Bad
function getUser(id): any {
  // Implementation
}
```

### React Components
1. **Server Components (Default)**
   - Use Server Components by default
   - Move client-side logic to Client Components
   - Handle data fetching appropriately
   - Implement proper error boundaries

```typescript
// Good - Server Component
async function UserProfile({ userId }: { userId: string }) {
  const user = await getUser(userId)
  
  return (
    <div>
      <h1>{user.profile.username}</h1>
      <ClientAvatar url={user.profile.avatar_url} />
    </div>
  )
}

// Good - Client Component
'use client'
const ClientAvatar = ({ url }: { url: string }) => {
  const [isLoading, setIsLoading] = useState(true)
  
  return (
    <Image
      src={url}
      alt="User avatar"
      onLoadingComplete={() => setIsLoading(false)}
    />
  )
}
```

2. **Hooks Usage**
   - Follow hooks rules
   - Use custom hooks for reusable logic
   - Handle cleanup properly
   - Consider server/client boundaries

```typescript
// Good
const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return user
}
```

### Styling
1. **Tailwind CSS Usage**
   - Use utility classes
   - Follow component-based styling
   - Implement responsive design
   - Use proper dark mode support

```typescript
// Good
const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md">
      {children}
    </div>
  )
}

// Bad
const Card = ({ children }) => {
  return (
    <div style={{ padding: '24px', backgroundColor: 'white' }}>
      {children}
    </div>
  )
}
```

2. **shadcn/ui Integration**
   - Follow component conventions
   - Use proper variants
   - Implement consistent styling
   - Extend components properly

```typescript
// Good
import { Button } from "@/components/ui/button"

const SubmitButton = () => {
  return (
    <Button
      variant="default"
      size="lg"
      className="w-full"
    >
      Submit
    </Button>
  )
}
```

## Performance Optimization

1. **Data Fetching**
   - Use proper caching strategies
   - Implement incremental static regeneration
   - Handle loading states
   - Use suspense boundaries

```typescript
// Good
async function BlogPosts() {
  const posts = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <Suspense fallback={<PostsSkeleton />}>
      <PostsList posts={posts} />
    </Suspense>
  )
}
```

2. **Image Optimization**
   - Use Next.js Image component
   - Implement proper sizing
   - Handle loading states
   - Use appropriate formats

```typescript
// Good
import Image from 'next/image'

const Avatar = ({ url }: { url: string }) => {
  return (
    <Image
      src={url}
      alt="User avatar"
      width={40}
      height={40}
      className="rounded-full"
      priority={false}
    />
  )
}
```

## Testing Guidelines

1. **Unit Tests**
   - Test component behavior
   - Mock Supabase calls
   - Test server/client components
   - Use proper assertions

```typescript
// Good
describe('AuthForm', () => {
  it('handles sign in', async () => {
    const onSubmit = jest.fn()
    const { getByLabelText, getByText } = render(
      <AuthForm onSubmit={onSubmit} />
    )
    
    await userEvent.type(getByLabelText('Email'), 'test@example.com')
    await userEvent.type(getByLabelText('Password'), 'password')
    await userEvent.click(getByText('Sign In'))
    
    expect(onSubmit).toHaveBeenCalled()
  })
})
```

2. **Integration Tests**
   - Test data flow
   - Test authentication flows
   - Test navigation
   - Test error states

## Error Handling

1. **Client-Side Errors**
   - Use proper error boundaries
   - Handle form validation
   - Show user-friendly messages
   - Log errors appropriately

```typescript
// Good
'use client'
export function ErrorBoundary({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <h2 className="text-red-800">Something went wrong!</h2>
      <button
        onClick={reset}
        className="mt-4 rounded-md bg-red-100 px-4 py-2"
      >
        Try again
      </button>
    </div>
  )
}
```

2. **Server-Side Errors**
   - Handle database errors
   - Implement proper status codes
   - Use error pages
   - Log server errors

## Security Guidelines

1. **Authentication**
   - Use proper session management
   - Implement proper redirects
   - Handle token refresh
   - Use middleware protection

2. **Database Security**
   - Use Row Level Security
   - Implement proper policies
   - Validate user permissions
   - Handle data access

## Accessibility

1. **ARIA Labels**
   - Use semantic HTML
   - Implement proper focus management
   - Add descriptive labels
   - Handle keyboard navigation

2. **Color Contrast**
   - Follow WCAG guidelines
   - Test with screen readers
   - Provide alternative text
   - Support reduced motion
``` 