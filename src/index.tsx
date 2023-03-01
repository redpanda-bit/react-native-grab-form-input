import React from 'react';
import {View} from "react-native";

interface Props {
  inputValues: string[];
  onInputValueChange: (value: string, index: number) => void;
  inputStyles: object[];
};

export function GrabFormInput(props: Props): JSX.Element {
  return (<View />);
};
