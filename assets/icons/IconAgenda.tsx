import React from 'react';
import { G, Path, Svg } from 'react-native-svg';
import { primaryColor } from '../../src/styles/theme';

export default function IconAgenda({ type }: { type: 'filled' | 'outline' }) {
  return type === 'filled' ? (
    <Svg width="24" height="24" fill="none">
      <Path
        fillRule="evenodd"
        d="M16.411 2.769l.001.75c2.755.216 4.574 2.093 4.577 4.972L21 16.916c.004 3.138-1.968 5.069-5.128 5.074l-7.72.01c-3.141.004-5.137-1.973-5.141-5.12L3 8.553c-.004-2.898 1.752-4.77 4.506-5.022l-.001-.75c-.001-.44.325-.771.759-.771s.76.329.761.769l.001.7 5.865-.008-.001-.7c-.001-.44.325-.77.759-.771.425-.001.76.329.761.769zM4.521 8.862l14.948-.02v-.35c-.042-2.149-1.121-3.276-3.056-3.444l.001.77a.76.76 0 0 1-.759.771c-.434.001-.761-.339-.761-.769l-.001-.81-5.865.008.001.809c0 .431-.325.771-.759.771a.75.75 0 0 1-.761-.769l-.001-.77c-1.925.193-2.991 1.324-2.988 3.492l.001.311zm10.718 4.543v.011c.01.46.385.809.84.799.444-.011.799-.392.789-.852a.83.83 0 0 0-.82-.798c-.454.01-.81.38-.809.84zm.815 4.488c-.454-.01-.82-.389-.821-.848-.01-.46.354-.841.809-.852h.01c.464 0 .84.379.84.849s-.374.85-.837.851zm-4.883-4.472c.02.46.396.819.85.799.444-.021.799-.401.779-.861-.011-.45-.376-.8-.82-.799-.454.02-.81.401-.809.861zm.854 4.427c-.454.02-.829-.339-.85-.799 0-.46.354-.84.809-.861.444-.001.811.349.82.798.021.461-.335.841-.779.862zm-4.922-4.392c.02.46.396.82.85.799a.82.82 0 0 0 .778-.861c-.01-.45-.375-.8-.82-.799-.454.02-.809.401-.808.861zm.854 4.397c-.454.021-.829-.339-.85-.799-.001-.46.354-.841.809-.861.444-.001.811.349.82.799a.82.82 0 0 1-.779.861z"
        fill={primaryColor}
      />
    </Svg>
  ) : (
    <Svg width="24" height="24" fill="none" stroke="#878787" strokeWidth="1.5">
      <G strokeLinecap="round" strokeLinejoin="round">
        <Path d="M3.093 9.404h17.824m-4.475 3.906h.009m-4.446 0h.009m-4.456 0h.009m8.875 3.886h.009m-4.446 0h.009m-4.456 0h.009M16.044 2v3.291" />
        <Path d="M7.965 2v3.291" />
      </G>
      <Path
        d="M16.238 3.579H7.771C4.834 3.579 3 5.215 3 8.222v9.05C3 20.326 4.834 22 7.771 22h8.458C19.175 22 21 20.355 21 17.348V8.222c.009-3.007-1.816-4.643-4.762-4.643z"
        strokeLinejoin="round"
      />
    </Svg>
  );
}