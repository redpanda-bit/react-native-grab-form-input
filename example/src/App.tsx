import * as React from 'react';

import {StyleSheet, View, Text} from 'react-native';
import {GrabFormInput} from 'react-native-grab-form-input';

export default function App() {
  const [inputHello, setInputHello] = React.useState('hello');
  const [inputWorld, setInputWorld] = React.useState('world');

  const onInputValueChange = (value: string, index: number) => {
    switch (index) {
      case 0:
        setInputHello(value);
        break;
      case 1:
        setInputWorld(value);
        break;
      default:
        return;
    }
  };

  return (
    <GrabFormInput
      inputValues={[inputHello, inputWorld]}
      onInputValueChange={onInputValueChange}
      inputStyles={[{}, {}]}
      containerStyle={styles.container}
    />
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
