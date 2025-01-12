# Project Setup Instructions

This document outlines the step-by-step process for setting up the Empty React Native project template using Expo.

## Prerequisites
- Node.js 18 or later
- Git
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Studio (for Android development)
- Expo Go app on physical devices (optional)

## Initial Setup

### 1. Project Creation
```bash
# Create new Expo project
npx create-expo-app@latest my-app -t expo-template-blank-typescript

# Navigate to project directory
cd my-app

# Install Expo development client
npx expo install expo-dev-client
```

### 2. Additional Dependencies

```bash
# Navigation
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context

# State Management and Storage
npm install @react-native-async-storage/async-storage zustand

# Development Dependencies
npm install -D jest-expo @testing-library/react-native @testing-library/jest-native
npm install -D prettier eslint-config-prettier eslint-plugin-prettier

# UI and Utilities
npx expo install expo-constants expo-linking expo-status-bar
npm install react-native-reanimated react-native-gesture-handler
```

### 3. Configuration Files

#### TypeScript Configuration (`tsconfig.json`)
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

#### ESLint Configuration (`.eslintrc.js`)
```javascript
module.exports = {
  root: true,
  extends: [
    '@react-native',
    'prettier',
  ],
  rules: {
    'react-native/no-inline-styles': 'warn',
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
```

#### Prettier Configuration (`.prettierrc`)
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

#### Babel Configuration (`babel.config.js`)
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
```

### 4. Git Setup

```bash
# Initialize Git repository (if not already done)
git init

# Create .gitignore
cat > .gitignore << EOL
node_modules/
.expo/
dist/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
.DS_Store
*.pem
.env*

# IDE
.idea
.vscode
EOL
```

### 5. Update app.json
```json
{
  "expo": {
    "name": "MyApp",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "plugins": [
      "expo-dev-client"
    ]
  }
}
```

## Post-Setup Verification

1. Start the development server:
```bash
npx expo start
```

2. Verify the following:
   - Application builds successfully
   - TypeScript compilation succeeds
   - ESLint shows no errors
   - Prettier formatting works
   - Hot reload is working
   - Navigation works (if implemented)

## Next Steps

After completing the setup:
1. Review the project structure documentation
2. Set up your development environment
3. Configure your IDE settings
4. Review the development guidelines
5. Set up simulators/emulators
6. Test on physical devices 