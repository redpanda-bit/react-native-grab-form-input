import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import type {GrabTextInputProps} from '../../../types';
import {INPUT_HEIGHT} from '../../index';

export const GrabTextInput = React.forwardRef(function (
  props: GrabTextInputProps,
  ref: React.Ref<TextInput>
): JSX.Element {
  return (
    <TextInput
      ref={ref}
      key={`text_input_${props.inputIdx + 1}`}
      testID={`text_input_${props.inputIdx + 1}`}
      style={styles.textInput}
      value={props.value}
      onChangeText={props.onChangeText}
      onLayout={props.onLayout}
      onSelectionChange={({nativeEvent: {selection}}) => {
        console.log(
          '**LOG** selection:',
          props.value?.substring(selection.start, selection.end)
        );
        props.onSelectionChange(
          props.value?.substring(selection.start, selection.end) || ''
        );
      }}
    />
  );
});

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  floatingText: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'pink',
    position: 'absolute',
    borderRadius: 5,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    height: INPUT_HEIGHT,
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    borderRadius: 5,
  },
});
