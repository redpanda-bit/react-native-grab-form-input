import React, {useState, useRef} from 'react';
import {
  View,
  Animated,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponder,
} from 'react-native';
import type {
  GrabFormInputProps,
  InputRefs,
  InputDimensionsState,
  InputDimension,
} from '../types';
import {throttle} from 'lodash';
import {Easing} from 'react-native';
import {TextInputsList} from './TextInputsList';
import {FloatingText} from './FloatingText';

export const INPUT_HEIGHT = 80;

export function GrabFormInput(props: GrabFormInputProps): JSX.Element {
  const [floatTextVal, setFloatTextVal] = useState<string>('');
  const [inputsDimesions, setInputsDimesions] = useState<InputDimensionsState>(
    props.inputValues.map(() => ({x: 0, y: 0, width: 0, height: 0}))
  );
  const inputRefs: InputRefs = props.inputValues.map(() => React.createRef());
  const sourceInput = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const showPlus = useRef<boolean>(false);

  // ANIMATED VALUES
  const top = useRef<Animated.AnimatedValue>(new Animated.Value(0));
  const left = useRef<Animated.AnimatedValue>(new Animated.Value(0));
  const opacity = useRef<Animated.AnimatedValue>(new Animated.Value(0));
  const plusOpacity = useRef<Animated.AnimatedValue>(new Animated.Value(0));

  const _animate = (
    toOpacity: number,
    toLeft?: number,
    toTop?: number,
    cb?: () => void,
    duration = 400
  ) => {
    console.log('**LOG** animating to :', toOpacity, toLeft, toTop);
    const opacityAnim: Animated.CompositeAnimation = Animated.timing(
      opacity.current,
      {
        toValue: toOpacity,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }
    );
    if (toTop && toLeft) {
      Animated.parallel([
        Animated.timing(left.current, {
          toValue: toLeft,
          duration: 10,
          useNativeDriver: true,
        }),
        Animated.timing(top.current, {
          toValue: toTop,
          duration: 10,
          useNativeDriver: true,
        }),
        opacityAnim,
      ]).start();
    } else {
      opacityAnim.start(cb);
    }
  };
  const animate = throttle(_animate, 10, {leading: false, trailing: true}); // 10 is an arbitrary number
  const panResponder = React.useMemo<PanResponderInstance>(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponderCapture: () => {
          // if one input is focused, we want to capture the pan responder
          return !!floatTextVal;
        },
        onMoveShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => true,

        onPanResponderGrant: (evt: GestureResponderEvent) => {
          const {pageX, pageY, locationX, locationY} = evt.nativeEvent;
          const tappedInputIdx = Object.values(inputsDimesions).findIndex(
            (inputDimension: InputDimension): boolean | void => {
              const {x, y, width, height} = inputDimension;
              if (
                pageY >= y &&
                pageY <= y + height &&
                pageX <= x + width &&
                pageX >= x
              ) {
                return true;
              }
            }
          );
          sourceInput.current = tappedInputIdx;
          setTimeout(() => {
            if (floatTextVal) {
              animate(1, locationX, locationY, () => {
                isDragging.current = true;
              });
              // tappedInputIdx >= 0 && inputRefs[tappedInputIdx]?.current?.blur();
            }
          }, 800); // 800 is an arbitrary number
        },
        onPanResponderMove: Animated.event(
          [null, {moveX: left.current, moveY: top.current}],
          {
            useNativeDriver: false,
            listener: (e: GestureResponderEvent) => {
              const {pageY, pageX} = e.nativeEvent;
              console.log('**LOG** pageY:', pageY, inputsDimesions[0]);
              const hoverInputIdx = Object.values(inputsDimesions).findIndex(
                (inputDimension: InputDimension): boolean | void => {
                  const {x, y, width, height} = inputDimension;
                  if (
                    pageY >= y &&
                    pageY <= y + height &&
                    pageX <= x + width &&
                    pageX >= x
                  ) {
                    return true;
                  }
                }
              );
              // hide floating text if selection changes to none
              if (!floatTextVal) {
                animate(0);
              }
              // the next two conditionals are for showing/hiding the plus sign
              if (
                !showPlus.current &&
                hoverInputIdx >= 0 &&
                hoverInputIdx !== sourceInput.current
              ) {
                Animated.timing(plusOpacity.current, {
                  toValue: 1,
                  duration: 100,
                  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                  useNativeDriver: true,
                }).start(() => (showPlus.current = true));
              } else if (showPlus.current && hoverInputIdx === -1) {
                Animated.timing(plusOpacity.current, {
                  toValue: 0,
                  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                  duration: 100,
                  useNativeDriver: true,
                }).start(() => (showPlus.current = false));
              }
            },
          }
        ),
        onPanResponderRelease: (e: GestureResponderEvent) => {
          const {pageY, pageX} = e.nativeEvent;
          const releasedInputIdx = Object.values(inputsDimesions).findIndex(
            (inputDimension: InputDimension): boolean | void => {
              const {x, y, width, height} = inputDimension;
              if (
                pageY >= y &&
                pageY <= y + height &&
                pageX <= x + width &&
                pageX >= x
              ) {
                return true;
              }
            }
          );
          const destinationCoords = inputsDimesions[releasedInputIdx];
          console.log('**LOG** destinationcoords: ', destinationCoords);
          if (
            releasedInputIdx >= 0 &&
            releasedInputIdx !== sourceInput.current
          ) {
            props.onInputValueChange(
              props.inputValues[releasedInputIdx] + floatTextVal,
              releasedInputIdx
            );
            if (sourceInput.current) {
              inputRefs[sourceInput.current]?.current?.blur();
            }
          }
          destinationCoords &&
            animate(
              0,
              destinationCoords.x,
              destinationCoords.y + destinationCoords.height / 4,
              () => {
                setFloatTextVal('');
              }
            );
        },
      }),
    [floatTextVal, inputsDimesions, sourceInput.current]
  );

  const onInputLayout = (
    x: number,
    y: number,
    width: number,
    height: number,
    i: number
  ) => {
    console.log('**LOG** onlayout: ', x, y, width, height);
    setInputsDimesions((prev: InputDimensionsState) => {
      return {...prev, [i]: {x, y, width, height}};
    });
  };

  React.useEffect(() => {
    inputRefs.forEach((inputRef: React.RefObject<TextInput>, idx: number) => {
      inputRef.current?.measureInWindow(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          console.log('**LOG** measure :', x, y, width, height, pageX, pageY);
          setInputsDimesions((prev: InputDimensionsState) => {
            return {...prev, [idx]: {x, pageX, y, pageY, width, height}};
          });
        }
      );
    });
  }, []);

  const onChangeText = (text: string, i: number) => {
    props.onInputValueChange(text, i);
  };

  return (
    <View {...panResponder.panHandlers} style={props.containerStyle}>
      <TextInputsList
        inputValues={props.inputValues}
        onValueChange={onChangeText}
        onInputLayout={onInputLayout}
        onSelectionChange={setFloatTextVal}
        inputRefs={inputRefs}
      />
      <FloatingText
        x={left.current}
        y={top.current}
        opacity={opacity.current}
        plusOpacity={plusOpacity.current}
        text={floatTextVal}
      />
    </View>
  );
}
