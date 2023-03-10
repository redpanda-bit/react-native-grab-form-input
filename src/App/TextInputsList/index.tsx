import React from 'react';
import type {TextInputsListProps} from '../../types';
import type {LayoutChangeEvent} from 'react-native';
import {GrabTextInput} from './GrabTextInput';

export function TextInputsList(props: TextInputsListProps): JSX.Element {
  const onChangeText = (i: number) => (text: string) => {
    props.onValueChange(text, i);
  };

  const onInputLayout =
    (i: number) =>
    ({
      nativeEvent: {
        layout: {x, y, width, height},
      },
    }: LayoutChangeEvent) => {
      props.onInputLayout(x, y, width, height, i);
    };

  const onSelectionChange = (value: string) => {
    props.onSelectionChange(value);
  };

  return (
    <>
      {props.inputValues.map((value: string, i: number) => (
        <GrabTextInput
          key={`text_input_${i + 1}`}
          inputIdx={i}
          value={value}
          onChangeText={onChangeText(i)}
          onLayout={onInputLayout(i)}
          onSelectionChange={onSelectionChange}
          ref={props.inputRefs[i]}
        />
      ))}
    </>
  );
}
