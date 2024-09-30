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

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      {/* <WelcomePage /> */}
      <FloatingTitleTxtInput title='휴대폰 번호' keyboardType='phone-pad' isPassword={false}/>
      <FloatingTitleTxtInput title='비밀번호' keyboardType='default' isPassword={true}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default App;
