# GiphyImages

A React Native mobile application.

## Prerequisites

- Node.js (>= 18)
- React Native development environment setup for iOS and Android

## Setup

1. Install project dependencies:
   ```bash
   npm install
   ```

2. For iOS development, install CocoaPods dependencies:
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the Application

### Start the Metro bundler
First, you will need to start **Metro**, the JavaScript bundler that ships with React Native.
```bash
npm start
```

### iOS
To start the application on an iOS simulator or device:
```bash
npm run ios
```

### Android
To start the application on an Android emulator or device:
```bash
npm run android
```

## Tech Stack

- **Framework:** React Native 0.81.0 & React 19.1.0
- **Navigation:** React Navigation (Native Stack & Bottom Tabs)
- **State Management:** Redux Toolkit & React-Redux
- **Local Storage:** React Native MMKV & Redux Persist
- **Networking:** Axios
- **Animations:** React Native Reanimated (configured with Shared Element Transitions)
- **Icons:** React Native Vector Icons

