import React from 'react';
import {Animated, Text, StyleSheet} from 'react-native';
import type {FloatingTextProps} from '../../types';

export function FloatingText(props: FloatingTextProps) {
  return (
    <Animated.View
      style={[
        styles.floatingText,
        {
          transform: [{translateX: props.x}, {translateY: props.y}],
        },
        {opacity: props.opacity},
      ]}
    >
      <Text style={styles.text}>{props.text}</Text>
      <Animated.Text
        style={[{opacity: props.plusOpacity}, styles.text, styles.plus]}
      >
        {` + `}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  plus: {
    color: 'green',
    fontWeight: 'bold',
  },
  floatingText: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'pink',
    position: 'absolute',
    borderRadius: 5,
    flexDirection: 'row',
  },
});
