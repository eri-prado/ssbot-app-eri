import { MaterialCommunityIcons } from '@expo/vector-icons';

import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  useAnimatedStyle,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';

import { styles, SHEET_HEIGHT, SHEET_OVER_DRAG } from './styles';
import { ReactNode } from 'react';
import { Container } from '../Container';

type Props = {
  onClose: () => void;
  children: ReactNode;
};

export function Sheet({ onClose, children }: Props) {
  const offset = useSharedValue(0);

  function close() {
    offset.value = 0;
    onClose();
  }

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;
      const clamp = Math.max(-SHEET_OVER_DRAG, offsetDelta);

      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < SHEET_HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(SHEET_HEIGHT, {}, () => {
          runOnJS(close)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[styles.container, translateY]}
        entering={SlideInDown.springify().damping(15)}
        exiting={SlideOutDown}
      >
        <MaterialCommunityIcons
          name='drag-horizontal'
          color='#999'
          size={24}
          style={styles.dragIcon}
        />
        <Container>{children}</Container>
      </Animated.View>
    </GestureDetector>
  );
}
