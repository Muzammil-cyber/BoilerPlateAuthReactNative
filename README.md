# React Native Authentication Boilerplate

A secure authentication boilerplate for React Native applications using React Context API and react-native-keychain for secure storage.

## Features

- 🔐 Secure token storage using react-native-keychain
- 🧭 Type-safe navigation with @react-navigation/native-stack
- 🌍 Global state management using Context API
- 🔄 API service layer with proper error handling
- ✅ Form validation utilities
- 🛡️ Protected routes
- ⏳ Loading states
- 🔒 Token validation and auto-logout

## Integration Guide

### Step 1: Install Dependencies

Add the following dependencies to your project:

```sh
npm install @react-navigation/native @react-navigation/native-stack react-native-keychain react-native-safe-area-context react-native-screens
```

For iOS, install the CocoaPods:

```sh
cd ios && pod install && cd ..

### Step 2: Copy the Source Files

Copy the following folders from the boilerplate's `/src` directory to your project:

```

src/
├── context/
│   └── AuthContext.tsx
├── navigation/
│   └── Navigation.tsx
├── screens/
│   ├── LoadingScreen.tsx
│   ├── app/
│   │   ├── HomeScreen.tsx
│   │   └── ProfileScreen.tsx
│   └── auth/
│       ├── LoginScreen.tsx
│       └── RegisterScreen.tsx
├── services/
│   ├── api.service.ts
│   └── auth.service.ts
├── types/
│   └── auth.ts
└── utils/
    └── validation.ts

```

### Step 3: Configure Your API

Update the API base URL in `src/services/api.service.ts`:

```typescript
export const api = new ApiService({
  baseURL: 'YOUR_API_URL_HERE',
});
```

### Step 4: Update Your App Entry Point

Modify your `App.tsx` to use the authentication provider:

```typescript
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { Navigation } from './src/navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
```

## Usage

### Authentication Context

Access authentication functions and state anywhere in your app:

```typescript
import { useAuth } from '../context/AuthContext';

const YourComponent = () => {
  const { user, login, logout, register } = useAuth();
  
  // Use authentication functions
  const handleLogin = async () => {
    try {
      await login({ email, password });
    } catch (error) {
      // Handle error
    }
  };
};
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

### Protected Routes

The navigation stack automatically handles protected routes based on authentication state:

```typescript
{isAuthenticated ? (
  // Protected Routes
  <>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </>
) : (
  // Public Routes
  <>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </>
)}
```

### Secure Storage

The boilerplate uses react-native-keychain to securely store authentication tokens and user data:

```typescript
// Storing data
await Keychain.setGenericPassword(TOKEN_KEY, token);
await Keychain.setInternetCredentials(USER_KEY, 'user', JSON.stringify(userData));

// Retrieving data
const tokenCredentials = await Keychain.getGenericPassword();
const userCredentials = await Keychain.getInternetCredentials(USER_KEY);
```

## API Integration

### Custom Endpoints

Update the auth service methods in `src/services/auth.service.ts` to match your API endpoints:

```typescript
static async login(credentials: LoginCredentials) {
  const response = await api.post('/auth/login', credentials);
  // Handle response
}

static async register(credentials: RegisterCredentials) {
  const response = await api.post('/auth/register', credentials);
  // Handle response
}
```

### Error Handling

The API service includes built-in error handling:

```typescript
try {
  await api.post('/your-endpoint', data);
} catch (error) {
  // Error is already formatted
  console.error(formatError(error));
}
```

## Security Best Practices

1. Never store sensitive data in AsyncStorage - use react-native-keychain
2. Validate tokens on app launch
3. Implement proper error handling
4. Use TypeScript for type safety
5. Follow the principle of least privilege
6. Implement token refresh mechanism
7. Handle token expiration properly

## Learn More

For more information about the technologies used:

- [React Native Keychain](https://github.com/oblador/react-native-keychain)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Context API](https://react.dev/reference/react/useContext)

## Environment Variables

This boilerplate uses environment variables for configuration. Create a `.env` file in your project root:

```env
# API Configuration
API_URL=https://api.example.com
API_TIMEOUT=30000

# Authentication
AUTH_STORAGE_KEY=auth_token
USER_STORAGE_KEY=user_data

# Feature Flags
ENABLE_BIOMETRIC=true
```

### Environment Setup

1. Copy `.env.example` to create your `.env` file:

```sh
cp .env.example .env
```

2. Update the variables in `.env` with your configuration

3. The environment variables are typed in `src/types/env.d.ts`:

```typescript
declare module '@env' {
  export const API_URL: string;
  export const API_TIMEOUT: string;
  export const AUTH_STORAGE_KEY: string;
  export const USER_STORAGE_KEY: string;
  export const ENABLE_BIOMETRIC: string;
}
```

4. Access environment variables through the config:

```typescript
import { config } from '../config';

// Type-safe environment variable access
const apiUrl = config.api.baseURL;
const isBiometricEnabled = config.features.biometric;
```

### Security Note

Never commit your `.env` file. It is already added to `.gitignore`. Always use `.env.example` as a template.
