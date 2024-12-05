import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, ImageBackground, Animated } from 'react-native';
import LogoWhiteSVG from '../../../../assets/logoWhiteSVG';
import { primaryColor } from '../../../styles/theme';

export default function Splash() {
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const imageWave = require('../../../../assets/images/wave-bg.png');

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageWave}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.5 }} // Define a opacidade da imagem
      >
        <Animated.View
          style={[styles.imageContainer, { opacity: fadeAnimation }]}
        >
          <LogoWhiteSVG />
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryColor, // Mantém o background color
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});
