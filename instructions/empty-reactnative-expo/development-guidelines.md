# Development Guidelines

This document outlines the development standards and best practices for the Empty React Native (Expo) template.

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
  id: string;
  name: string;
  email: string;
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark';
  };
}

function getUser(id: string): Promise<User> {
  // Implementation
}

// Bad
function getUser(id): any {
  // Implementation
}
```

### React Native Components
1. **Functional Components**
   - Use function components with hooks
   - Implement proper type definitions
   - Use proper prop naming
   - Handle platform differences appropriately

```typescript
// Good
interface CardProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  onPress,
  variant = 'primary',
  children,
}) => {
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      borderRadius: 8,
      backgroundColor: variant === 'primary' ? '#fff' : '#f5f5f5',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 4,
        },
      }),
    },
  });

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
    >
      <Text>{title}</Text>
      {children}
    </Pressable>
  );
};
```

2. **Hooks Usage**
   - Follow hooks rules
   - Use custom hooks for reusable logic
   - Handle cleanup properly
   - Consider platform-specific behavior

```typescript
// Good
const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return appState;
};
```

### Styling
1. **StyleSheet Organization**
   - Use StyleSheet.create
   - Group related styles
   - Use consistent naming
   - Handle responsive layouts

```typescript
// Good
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

// Bad
const component = {
  style: {
    flex: 1,
    padding: 16,
  },
};
```

2. **Theme Integration**
   - Use theme constants
   - Support dark/light modes
   - Handle dynamic styles
   - Use color tokens

```typescript
// theme.ts
export const theme = {
  colors: {
    primary: '#007AFF',
    background: {
      light: '#FFFFFF',
      dark: '#000000',
    },
    text: {
      light: '#000000',
      dark: '#FFFFFF',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};
```

## Performance Optimization

1. **List Rendering**
   - Use FlatList/SectionList
   - Implement proper key extraction
   - Optimize render items
   - Use list headers/footers properly

```typescript
// Good
<FlatList
  data={items}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <ItemComponent item={item} />}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

2. **Image Handling**
   - Use proper image sizing
   - Implement lazy loading
   - Handle image caching
   - Use appropriate image formats

```typescript
// Good
<Image
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
  resizeMode="cover"
  onLoadStart={() => setLoading(true)}
  onLoadEnd={() => setLoading(false)}
/>
```

## Testing Guidelines

1. **Unit Tests**
   - Test component behavior
   - Mock native modules
   - Test platform-specific code
   - Use proper assertions

```typescript
// Good
describe('Button', () => {
  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button onPress={onPress}>Press Me</Button>
    );
    
    fireEvent.press(getByText('Press Me'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

2. **Integration Tests**
   - Test navigation flows
   - Test data persistence
   - Test app state changes
   - Test device features

## Error Handling

1. **Error Boundaries**
   - Implement error boundaries
   - Handle API errors
   - Show user-friendly messages
   - Log errors appropriately

```typescript
// Good
const ErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({
  error,
  resetError,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{error.message}</Text>
      <Button onPress={resetError} title="Try again" />
    </View>
  );
};
```

## Security Best Practices

1. **Data Storage**
   - Use secure storage for sensitive data
   - Implement proper encryption
   - Handle permissions properly
   - Validate user input

2. **API Security**
   - Use HTTPS
   - Implement proper authentication
   - Handle tokens securely
   - Validate responses

## Deployment

1. **Environment Configuration**
   - Use proper environment variables
   - Configure app signing
   - Handle versioning
   - Manage assets properly

2. **Build Process**
   - Optimize bundle size
   - Configure proper permissions
   - Handle app icons and splash screens
   - Test production builds

## Development Workflow

1. **Version Control**
   - Follow Git best practices
   - Use meaningful commit messages
   - Review code properly
   - Handle conflicts appropriately

2. **Code Review**
   - Check for platform-specific issues
   - Verify performance implications
   - Ensure accessibility
   - Test on multiple devices

3. **Documentation**
   - Document complex logic
   - Update README
   - Document API integration
   - Maintain change log 