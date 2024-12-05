import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { primaryColor } from '../../src/styles/theme';

export default function IconPerfil({ type }: { type: 'filled' | 'outline' }) {
  return type === 'filled' ? (
    <Svg width="24" height="24" fill="none">
      <Path
        fill-rule="evenodd"
        d="M17.294 7.291c0 2.937-2.355 5.292-5.294 5.292s-5.294-2.355-5.294-5.292S9.062 2 12 2s5.294 2.354 5.294 5.291zM12 22c-4.338 0-8-.705-8-3.425s3.685-3.401 8-3.401c4.339 0 8 .705 8 3.425S16.315 22 12 22z"
        fill={primaryColor}
      />
    </Svg>
  ) : (
    <Svg width="24" height="24" fill="none" stroke="#878787" strokeLinejoin="round">
      <Path
        d="M11.985 15.346c-3.868 0-7.17.585-7.17 2.927s3.282 2.948 7.17 2.948c3.868 0 7.169-.586 7.169-2.927s-3.281-2.948-7.169-2.948z"
        strokeWidth="1.5"
      />
      <Path
        d="M11.985 12.006c2.538 0 4.595-2.058 4.595-4.596s-2.057-4.595-4.595-4.595S7.388 4.872 7.388 7.41a4.58 4.58 0 0 0 4.564 4.596h.032z"
        strokeWidth="1.429"
      />
    </Svg>
  );
}
