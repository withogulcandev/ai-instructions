# Empty React Native (Expo) Project Template

A clean, modern React Native starter template using Expo, with essential configurations and best practices. This template is designed to be integrated into existing Expo projects or newly created ones via Expo CLI.

## Getting Started

### Using the Template

1. If you don't have a project yet, create one using Expo CLI:
   ```bash
   npx create-expo-app@latest my-app
   cd my-app
   ```

2. Install our template using:
   ```bash
   npx ai-instructions init --template "empty-reactnative-expo"
   ```

3. Read through the `/instructions` directory, starting with this README.md

### AI Agent Integration

When using this template with an AI Agent (like Claude in Cursor), start with the following prompt:

```
Target the /instructions directory and always follow these guidelines during development:
1. Read and understand the template structure from template-structure.md
2. Follow the coding standards from template-guidelines.md
3. Apply template integration steps from template-integration.md
4. Maintain consistency with the existing project structure
5. Implement new features according to the template standards
```

## Product Requirements Document (PRD)

### Overview
This template provides a minimal yet production-ready React Native setup using Expo for building cross-platform mobile applications.

### Target Audience
- Mobile app developers starting new React Native projects
- Teams looking for a standardized mobile development starting point
- Projects requiring cross-platform mobile development
- Developers preferring managed workflow with Expo

### Core Requirements

#### Must Have
- Expo SDK 50+
- TypeScript integration
- React Navigation setup
- Basic project structure
- Development and production configurations
- Cross-platform compatibility
- Responsive layout support
- Basic device feature access

#### Should Have
- Basic component examples
- Performance optimization setup
- Testing infrastructure
- Documentation templates
- Git configuration
- State management setup
- Basic offline support

#### Nice to Have
- CI/CD templates
- Custom hooks library
- Storybook setup
- Analytics integration
- Push notification setup
- Deep linking configuration

### Technical Requirements

#### Core Stack
- React Native (using Expo)
- TypeScript
- React Navigation 6+
- Expo SDK 50+
- AsyncStorage

#### Development Tools
- ESLint
- Prettier
- Jest
- React Native Testing Library
- Expo Development Client

#### UI/UX Requirements
- Native look and feel
- Responsive layouts
- Dark/Light theme support
- Gesture handling
- Smooth animations

#### Performance Requirements
- App launch time < 2s
- Smooth navigation (60 fps)
- Offline capability
- Minimal app size
- Battery efficient

## Success Metrics
1. Developer Experience
   - Clear project structure
   - Minimal setup time
   - Hot reload efficiency
   - Comprehensive documentation

2. Performance
   - Fast app launch time
   - Smooth animations
   - Efficient memory usage
   - Battery optimization

3. Code Quality
   - TypeScript strict mode compliance
   - No ESLint warnings
   - Test coverage > 80%
   - Cross-platform compatibility

## Implementation Guidelines
Please refer to the following instruction documents:
1. `template-integration.md` - Template integration and configuration
2. `template-structure.md` - Directory organization and conventions
3. `template-guidelines.md` - Coding standards and best practices
4. `deployment.md` - Deployment and production considerations 