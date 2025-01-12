# Development Guidelines

This document outlines the development standards and best practices for the Empty Next.js template.

## Code Style and Standards

### TypeScript
- Enable strict mode
- Use explicit type annotations for function parameters and returns
- Avoid using `any` type
- Use interfaces for object shapes
- Leverage union types and type guards

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  // Implementation
}

// Bad
function getUser(id): any {
  // Implementation
}
```

### React Components
1. **Functional Components**
   - Use function components with hooks
   - Implement proper type definitions
   - Use proper prop naming

```typescript
// Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  onClick,
  children
}) => {
  return (
    <button
      className={`btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Bad
const Button = (props) => {
  return <button onClick={props.onClick}>{props.children}</button>;
};
```

2. **Hooks Usage**
   - Follow hooks rules
   - Use custom hooks for reusable logic
   - Proper dependency arrays in useEffect

```typescript
// Good
const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};
```

### Tailwind CSS
1. **Class Organization**
   - Group related classes
   - Use consistent ordering
   - Extract common patterns to components

```tsx
// Good
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">

// Bad
<div className="rounded-lg p-4 shadow-sm items-center bg-white justify-between flex">
```

2. **Custom Classes**
   - Define reusable classes in `globals.css`
   - Use `@apply` for complex patterns
   - Maintain consistent naming

```css
/* globals.css */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors;
  }
}
```

## Performance Optimization

1. **Image Optimization**
   - Use Next.js Image component
   - Proper sizing and formats
   - Lazy loading when appropriate

```typescript
// Good
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority={true}
/>;
```

2. **Code Splitting**
   - Use dynamic imports
   - Implement proper loading states
   - Route-based code splitting

```typescript
// Good
const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />
});
```

## Testing Guidelines

1. **Unit Tests**
   - Test component behavior
   - Mock external dependencies
   - Focus on user interactions

```typescript
// Good
describe('Button', () => {
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

2. **Integration Tests**
   - Test component interactions
   - Test routing behavior
   - Test data flow

## Error Handling

1. **Client-Side Errors**
   - Use error boundaries
   - Implement fallback UI
   - Log errors appropriately

```typescript
// Good
const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );
};
```

2. **API Errors**
   - Consistent error responses
   - Proper status codes
   - Error message handling

## Security Best Practices

1. **Input Validation**
   - Validate all user inputs
   - Sanitize data
   - Prevent XSS attacks

2. **Authentication**
   - Implement proper auth flows
   - Secure session handling
   - Protected routes

## Git Workflow

1. **Commits**
   - Clear, descriptive messages
   - Atomic commits
   - Follow conventional commits

```bash
# Good
git commit -m "feat: add user authentication"
git commit -m "fix: resolve mobile navigation issues"

# Bad
git commit -m "updates"
```

2. **Branches**
   - Feature branches
   - Clean merge history
   - Regular rebasing

## Documentation

1. **Code Comments**
   - Document complex logic
   - JSDoc for public APIs
   - Keep comments up to date

2. **README Updates**
   - Document new features
   - Update setup instructions
   - Keep dependencies current

## Deployment

1. **Environment Variables**
   - Proper configuration
   - Secure handling
   - Documentation

2. **Build Process**
   - Optimize builds
   - Monitor performance
   - Version control 