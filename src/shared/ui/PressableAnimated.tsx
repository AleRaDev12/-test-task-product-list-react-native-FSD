import React, {FC, useRef} from 'react';
import {
  Animated,
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

const pressInAnimationConfig: Animated.TimingAnimationConfig = {
  toValue: 0.96,
  duration: 100,
  useNativeDriver: true,
};

const pressOutAnimationConfig: Animated.TimingAnimationConfig = {
  toValue: 1,
  duration: 80,
  useNativeDriver: true,
};

type Props = TouchableOpacityProps & {
  containerStyle?: StyleProp<ViewStyle>;
};

export const PressableAnimated: FC<Props> = props => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = (event: GestureResponderEvent) => {
    Animated.timing(scale, pressInAnimationConfig).start();
    if (props?.onPressIn) {
      props.onPressIn(event);
    }
  };

  const onPressOut = (event: GestureResponderEvent) => {
    Animated.timing(scale, pressOutAnimationConfig).start();
    if (props?.onPressOut) {
      props.onPressOut(event);
    }
  };

  const buttonConfig: TouchableOpacityProps = {
    ...props,
    onPressIn,
    onPressOut,
  };

  return (
    <Animated.View style={[{transform: [{scale}]}, props.containerStyle]}>
      <TouchableOpacity {...buttonConfig} activeOpacity={1} />
    </Animated.View>
  );
};
