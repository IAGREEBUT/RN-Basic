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
import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{}}>투자NOW</Text>
      </View>
      <View style={{flex: 1, backgroundColor: 'red'}} />
      <View style={{flex: 1, backgroundColor: 'orange'}} />
      <View style={{flex: 1, backgroundColor: 'green'}} />
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
