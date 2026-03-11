import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store, persistor } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { Colors } from './src/theme/colors';
import ErrorBoundary from './src/components/ErrorBoundary/ErrorBoundary';

const App: React.FC = () => (
  <ErrorBoundary>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
              <RootNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  </ErrorBoundary>
);

export default App;
