import React, {useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  PanResponder,
  Animated,
  LayoutChangeEvent,
  GestureResponderEvent,
  PanResponderGestureState,
  PanResponderInstance,
  findNodeHandle,
} from 'react-native';
import type {GrabFormInputProps} from './types';
import {throttle} from 'lodash';

const INPUT_HEIGHT = 80;

function GrabFormInput(props: GrabFormInputProps): JSX.Element {
  const [textInput1, onChangeText1] = useState<string>('text1');
  const [textInput2, onChangeText2] = useState<string>('text2');
  const [textEditable, setTextEditable] = useState<boolean>(true);
  const floatTextVal = useRef<string>('');
  const input1Y = useRef<number>(0);
  const input2Y = useRef<number>(0);
  const textInput1Ref = useRef<TextInput>(null);
  const textInput2Ref = useRef<TextInput>(null);
  const grabbedInput = useRef<boolean>(false);
  const top = useRef<Animated.AnimatedValue>(new Animated.Value(0));
  const left = useRef<Animated.AnimatedValue>(new Animated.Value(0));
  const opacity = useRef<Animated.AnimatedValue>(new Animated.Value(0));
  const _animate = (toOpacity: number, toTop: number, toLeft: number) => {
    const opacityAnim: Animated.CompositeAnimation = Animated.timing(
      opacity.current,
      {
        toValue: toOpacity,
        duration: 10,
        useNativeDriver: true,
      }
    );
    if (toTop && toLeft) {
      Animated.parallel([
        Animated.timing(top.current, {
          toValue: toTop,
          duration: 10,
          useNativeDriver: true,
        }),
        Animated.timing(left.current, {
          toValue: toLeft,
          duration: 10,
          useNativeDriver: true,
        }),
        opacityAnim,
      ]).start();
    } else {
      opacityAnim.start();
    }
  };
  const animate = throttle(_animate, 10, {leading: false, trailing: true});
  const panResponder = React.useRef<PanResponderInstance>(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (
        evt: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        const input1 = findNodeHandle(textInput1Ref.current);
        const input2 = findNodeHandle(textInput2Ref.current);
        const eventTarget = findNodeHandle(evt.target);
        const {y0, x0} = gestureState;
        if (eventTarget === input1) {
          floatTextVal.current = textInput1;
          grabbedInput.current = true;
        }
        if (eventTarget === input2) {
          floatTextVal.current = textInput2;
          grabbedInput.current = true;
        }
        if (grabbedInput.current) {
          animate(1, y0, x0);
        }
      },
      onPanResponderMove: Animated.event([
        null,
        {
          moveX: left.current,
          moveY: top.current,
        },
      ]),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: useCallback(
        (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          const {moveY} = gestureState;
          setTextEditable(true);
          grabbedInput.current = false;

          if (
            moveY > input1Y.current &&
            moveY < input1Y.current + INPUT_HEIGHT
          ) {
            onChangeText1(floatTextVal.current);
          } else if (
            moveY > input2Y.current &&
            moveY < input2Y.current + INPUT_HEIGHT
          ) {
            onChangeText2(floatTextVal.current);
          }
          animate(0);
        },
        [grabbedInput, onChangeText1, onChangeText2, floatTextVal]
      ),
      onShouldBlockNativeResponder: () => true,
    })
  ).current;

  const onInput1Layout = ({
    nativeEvent: {
      layout: {y},
    },
  }: LayoutChangeEvent) => {
    input1Y.current = y;
  };

  const onInput2Layout = ({
    nativeEvent: {
      layout: {y},
    },
  }: LayoutChangeEvent) => {
    input2Y.current = y;
  };

  return (
    <View {...panResponder.panHandlers} style={props.containerStyle}>
      {/* INPUT 1 */}
      <TextInput
        editable={textEditable}
        ref={textInput1Ref}
        style={styles.textInput}
        value={textInput1}
        onChangeText={onChangeText1}
        onLayout={onInput1Layout}
      />
      {/* INPUT 2 */}
      <TextInput
        editable={textEditable}
        ref={textInput2Ref}
        style={styles.textInput}
        value={textInput2}
        onChangeText={onChangeText2}
        onLayout={onInput2Layout}
      />
      {/* FLOATIN TEXT */}
      <Animated.View
        style={[
          styles.floatingText,
          {transform: [{translateX: left.current}, {translateY: top.current}]},
          {opacity: opacity.current},
        ]}
      >
        <Text style={styles.text}>{floatTextVal.current}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  floatingText: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'yellow',
    position: 'absolute',
    borderRadius: 5,
  },
  textInput: {
    backgroundColor: 'red',
    marginTop: 0,
    height: INPUT_HEIGHT,
  },
});

export default GrabFormInput;
