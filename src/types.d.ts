import type { ViewStyle, Animated } from "react-native";

type InputRefs = Array<React.RefObject<TextInput>>;

export interface GrabFormInputProps {
  inputValues: string[];
  onInputValueChange: (value: string, index: number) => void;
  inputStyles: object[];
  containerStyle: ViewStyle
}

export interface TextInputsListProps {
  inputValues: string[];
  onInputLayout: (x: number, y: number, width: number, height: number, i: number) => void;
  onValueChange: (value: string, index: number) => void;
  onSelectionChange: (s: string) => void;
  inputRefs: InputRefs;
}

export interface GrabTextInputProps {
  ref: React.Ref;
  value: string;
  onLayout: (e: LayoutChangeEvent) => void;
  onSelectionChange: (s: string) => void;
  inputIdx: number;
  onChangeText: (value: string) => void;
}

export interface FloatingTextProps {
  text: string;
  x: Animated.AnimatedValue;
  y: Animated.AnimatedValue;
  opacity: Animated.AnimatedValue;
  plusOpacity: Animated.AnimatedValue;
}

type InputDimension = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type InputDimensionsState = {
  [key: number]: InputDimension;
};