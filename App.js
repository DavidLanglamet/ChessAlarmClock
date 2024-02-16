import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import { StatusBar } from 'expo-status-bar';
import Settings from './screens/Settings';
import Profile from './screens/Profile';
import ChessScreen from './screens/ChessScreen';
import LogInScreen from './screens/LogInScreen';
import MemeScreen from './screens/MemeScreen';
import { SoundProvider } from "./components/SoundContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SoundProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                headerShown: false,
                gestureDirection: 'horizontal-inverted',
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                headerShown: false,
                gestureDirection: 'horizontal-inverted',
              }}
            />
            <Stack.Screen
              name="ChessScreen"
              component={ChessScreen}
              options={{
                headerShown: false,
                gestureDirection: 'horizontal-inverted',
              }}
            />
            <Stack.Screen
              name="LogInScreen"
              component={LogInScreen}
              options={{
                headerShown: false,
                gestureDirection: 'horizontal-inverted',
              }}
            />
            <Stack.Screen
              name="MemeScreen"
              component={MemeScreen}
              options={{
                headerShown: false,
                gestureDirection: 'horizontal-inverted',
              }}
            />
          </Stack.Navigator>
          <StatusBar style="light" />
        </NavigationContainer>
      </SoundProvider>
    </GestureHandlerRootView>
  );
}

export default App;