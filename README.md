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

---

## 📋 Assignment Completion Checklist

This project was built to fulfill the Giphy Images App assignment requirements.

### Core Requirements MVP
- [x] **Sign In Screen**: Functional Sign-In page with Email and Password inputs.
- [x] **Homepage**: Displays a list of Giphy items fetched from the Giphy API.
  - [x] Displays **Title, Image, and Description** for each item.
  - [x] Includes an action to add items to **Favorites**.
  - [x] Implements correct **Pagination** (20 items per page).
- [x] **Favorites Screen**: Dedicated screen to manage saved items.
  - [x] Add/Remove items from favorites.
  - [x] "Remove All" button to clear the list.
  - [x] Displays all favorite items and the **total count** of favorites.
- [x] **Item Details Screen**: Detailed view for individual GIFs.
  - [x] Displays: Title, Image, Description, Type, Slug, URL.
  - [x] Actions to Add/Remove from favorites.
- [x] **Architecture Experience**: Implemented **top and bottom tab navigation** to mimic Instagram's navigation experience.
- [x] **Required Techologies**: Built with **React Native CLI** and **Redux Toolkit/React-Redux** for state management.

### ⭐ Plus Points (Achieved)
- [x] **GitHub Upload**: The project is uploaded and available on GitHub.
- [x] **Search Screen**: Dedicated search interface utilizing the Giphy **Search API**.
- [x] **Shared Element Transition**: Configured beautiful shared element transitions using `react-native-reanimated` when opening and closing the item details screen.
