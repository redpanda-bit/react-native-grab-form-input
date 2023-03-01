import React, {useState, useRef, useCallback} from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    PanResponder,
    Animated,
    LayoutChangeEvent,
  } from 'react-native';
  import {throttle} from 'lodash';
  
const INPUT_HEIGHT = 80;

  export const App: JSX.Element = {
    return (<View {...panResponder.panHandlers} style={styles.inputContainer}>
        <TextInput
          editable={textEditable}
          ref={textInput1Ref}
          style={styles.textInput}
          value={textInput1}
          onChangeText={onChangeText1}
          onLayout={onInput1Layout}
        />
        <TextInput
          editable={textEditable}
          ref={textInput2Ref}
          style={styles.textInput}
          value={textInput2}
          onChangeText={onChangeText2}
          onLayout={onInput2Layout}
        />
        <Animated.View
          ref={floatingText}
          style={[
            styles.floatingText,
            {transform: [{translateX: left}, {translateY: top}]},
            {opacity},
          ]}>
          <Text style={styles.text} ref={floatingText}>
            {floatTextVal.current}
          </Text>
        </Animated.View>
      </View>);
}

const styles = StyleSheet.create({
    backgroundStyle: {
      flex: 1,
      backgroundColor: 'teal'
    },
    text: {
      backgroundColor: 'teal',
      fontSize: 24,
    },
    floatingText: {
      paddingVertical: 10,
      paddingHorizontal: 5,
      backgroundColor: 'yellow',
      position: 'absolute',
      borderRadius: 5,
    },
    inputContainer: {
      backgroundColor: 'blue',
      paddingVertical: 0,
      flex: 1,
    },
    textInput: {
      backgroundColor: 'red',
      marginTop: 0,
      height: INPUT_HEIGHT,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });
  
  export default App;