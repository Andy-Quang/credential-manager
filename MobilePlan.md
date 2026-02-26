# Mobile App Implementation Plan

Plan to build a cross-platform mobile application (iOS/Android) using **React Native CLI** and **React Native Firebase**, based on the existing logic from the web application.

## User Review Required

> [!IMPORTANT]
> **Tech Stack Selection**: Switched from Expo to **React Native CLI** (`npx @react-native-community/cli@latest init MobileApp`). This provides full control over native modules and follows the preferred development workflow.

> [!IMPORTANT]
> **Firebase Integration**: We will use **React Native Firebase** ([rnfirebase.io](https://rnfirebase.io/)) instead of the web JS SDK. This ensures better performance and access to native features like background notifications and secure persistence.

> [!IMPORTANT]
> **Styling**: **Nativewind** must be configured following the [Frameworkless installation guideline](https://www.nativewind.dev/docs/getting-started/installation/frameworkless).

> [!NOTE]
> **Logic Adaptation**: The `useCredentials` hook and encryption logic will be ported but adapted to match the React Native Firebase API (e.g., `firestore()` instead of web-style imports).

## Proposed Changes

### 1. Project Initialization [NEW]
- Initialize the project: `npx @react-native-community/cli@latest init MobileApp`
- Setup environment variables using `react-native-dotenv` or similar compatible library.
- Configure Android and iOS projects with Firebase (`google-services.json` and `GoogleService-Info.plist`).

### 2. Dependency Management
- Install core native dependencies:
  - `@react-native-firebase/app`: Core Firebase.
  - `@react-native-firebase/auth`: Integrated Auth.
  - `@react-native-firebase/firestore`: Data management.
  - `crypto-js`: For credential encryption.
  - `lucide-react-native`: For iconography.
  - `nativewind` & `tailwindcss`: For styling.
  - `react-native-reanimated`: For animations.
  - `react-native-toast-message`: For notifications.

### 3. Porting & Adapting Core Logic
#### [NEW] [firebase.ts](file:///d:/AI%20Things/Credential%20Manager/MobileApp/src/lib/firebase.ts)
- Configure React Native Firebase.
#### [NEW] [encryption.ts](file:///d:/AI%20Things/Credential%20Manager/MobileApp/src/lib/encryption.ts)
- Port encryption logic using `crypto-js`.
#### [NEW] [useCredentials.ts](file:///d:/AI%20Things/Credential%20Manager/MobileApp/src/hooks/useCredentials.ts)
- Adapt the hook to use `@react-native-firebase/firestore` syntax.

### 4. UI Implementation
#### [NEW] [LoginScreen.tsx](file:///d:/AI%20Things/Credential%20Manager/MobileApp/src/screens/LoginScreen.tsx)
- Modern login interface using RN Firebase Auth.
#### [NEW] [DashboardScreen.tsx](file:///d:/AI%20Things/Credential%20Manager/MobileApp/src/screens/DashboardScreen.tsx)
- Optimized list view for mobile (FlatList) with search and sort.
#### [NEW] [CredentialModal.tsx](file:///d:/AI%20Things/Credential%20Manager/MobileApp/src/components/CredentialModal.tsx)
- Bottom-sheet or full-screen modal optimized for touch interactions.

## Verification Plan

### Automated Tests
- **Jest**: Use the default Jest setup provided by RN CLI.
- **Testing Library**: Integrate `@testing-library/react-native` for component testing.

### Manual Verification
- **Build**: Run `npx react-native run-android` and `npx react-native run-ios`.
- **Firebase Auth**: Verify login works with native Firebase SDK.
- **Firestore CRUD**: Ensure data syncs correctly with the existing web app database.
- **Encryption**: Verify that passwords encrypted on mobile can be decrypted on web and vice versa.
