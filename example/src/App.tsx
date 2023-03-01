import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import GrabFormInput from 'react-native-grab-form-input';

const result = multiply(3, 7);

export default function App() {
  return (
    <View style={styles.container}>
      <GrabFormInput
        inputValues=["hello","world"]
        onInputValueChange={(value, index) => {}}
        inputStyles={[{}, {}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
