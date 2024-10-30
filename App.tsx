/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import WelcomePage from './src/screens/users';
import FloatingTitleTxtInput from './src/components/floatingTextInput';
import LoginPage from './src/screens/users/login';
import SignUpPage from './src/screens/users/signup';
import OnBoardPage from './src/screens/users/onboard';
import MainPage from './src/screens/main';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator<RootStackParamList>();

// const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  LogIn: undefined;
  SignUp: undefined;
  OnBoard: {phoneNumber:string};
  Main : undefined;
};


function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={WelcomePage} options={{ headerShown: false }}/>
        <Stack.Screen name="LogIn" component={LoginPage} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: false }}/>
        <Stack.Screen name="OnBoard" component={OnBoardPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <SafeAreaView style={styles.container}>
    //   <SignUpPage />
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default App;
