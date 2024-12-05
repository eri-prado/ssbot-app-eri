import React from 'react';
import { G, Path, Svg } from 'react-native-svg';
import { primaryColor } from '../../src/styles/theme';

export default function IconAgenda({ type }: { type: 'filled' | 'outline' }) {
  return type === 'filled' ? (
    <Svg width='25' height='24' fill='none'>
      <Path
        fillRule='evenodd'
        d='M2.375 12a10 10 0 0 1 10-10c5.52 0 10 4.48 10 10s-4.48 10-10 10a10 10 0 0 1-10-10zm5.52 1.2c-.66 0-1.2-.54-1.2-1.2s.54-1.199 1.2-1.199 1.19.539 1.19 1.199-.53 1.2-1.19 1.2zm3.28-1.2c0 .66.54 1.2 1.2 1.2s1.19-.54 1.19-1.2-.53-1.199-1.19-1.199-1.2.539-1.2 1.199zm4.48 0c0 .66.53 1.2 1.2 1.2.66 0 1.19-.54 1.19-1.2s-.53-1.199-1.19-1.199c-.67 0-1.2.539-1.2 1.199z'
        fill={primaryColor}
      />
    </Svg>
  ) : (
    <Svg
      width='24'
      height='24'
      fill='none'
      stroke='#878787'
      strokeLinejoin='round'
    >
      <Path
        d='M12 2.75c5.108 0 9.25 4.141 9.25 9.25s-4.142 9.25-9.25 9.25S2.75 17.108 2.75 12 6.892 2.75 12 2.75z'
        strokeWidth='1.5'
      />
      <Path
        d='M15.939 12.013h.009m-4.017 0h.009m-4.018 0h.009'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </Svg>
  );
}
