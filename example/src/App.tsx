import * as React from 'react';

import {SafeAreaView, StyleSheet, View} from 'react-native';
import GrabFormInput from 'react-native-grab-form-input';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GrabFormInput
        inputValues={['hello', 'world']}
        onInputValueChange={() => {}}
        inputStyles={[{}, {}]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});
