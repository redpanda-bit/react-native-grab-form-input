import * as React from 'react';
import {StyleSheet, TextInput} from 'react-native';

import {GrabFormInput} from 'react-native-grab-form-input';

export default function App() {
  const [inputHello, setInputHello] = React.useState('hello');
  const [inputWorld, setInputWorld] = React.useState('world');
  const [inputs, setInput] = React.useState([inputHello, inputWorld]);
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

const Colors = {
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
});
