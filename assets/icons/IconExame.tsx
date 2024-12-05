import React from 'react';
import { G, Path, Svg } from 'react-native-svg';
import { primaryColor } from '../../src/styles/theme';

export default function IconExame({ type }: { type: 'filled' | 'outline' }) {
  return type === 'filled' ? (
    <Svg width="24" height="24" fill="none">
      <G fill={primaryColor}>
        <Path
          d="M12 7.194c-1.73-3.92-5.76-4.23-7.64-2.56-1.53 1.33-2.26 4.66-.87 7.69 2.41 5.21 8.51 8 8.51 8s6.1-2.74 8.51-7.95c1.39-3 .66-6.32-.87-7.69-1.88-1.72-5.91-1.41-7.64 2.51z"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <Path d="M3.34 11.964H8l3 3 3-6 2 3h4.66" />
      </G>
      <Path
        d="M3.34 11.964H8l3 3 3-6 2 3h4.66"
        stroke="#f5f5f5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ) : (
    <Svg
      width="24"
      height="24"
      fill="none"
      stroke="#878787"
      strokeWidth="1.5"
      strokeLinejoin="round">
      <Path d="M12 7.194c-1.73-3.92-5.76-4.23-7.64-2.56-1.53 1.33-2.26 4.66-.87 7.69 2.41 5.21 8.51 8 8.51 8s6.1-2.74 8.51-7.95c1.39-3 .66-6.32-.87-7.69-1.88-1.72-5.91-1.41-7.64 2.51z" />
      <Path d="M3.34 11.964H8l3 3 3-6 2 3h4.66" strokeLinecap="round" />
    </Svg>
  );
}
