import React from 'react';
import { ClipPath, Defs, G, Path, Svg } from 'react-native-svg';

export default function IconMenu() {
  return (
    <Svg width="24" height="24" fill="none">
      <G clip-path="url(#A)">
        <Path
          d="M20 18a1 1 0 0 1 .997.941 1 1 0 0 1-.88 1.052L20 20H4a1 1 0 0 1-.997-.941 1 1 0 0 1 .88-1.052L4 18h16zm0-7a1 1 0 0 1 1 1 1 1 0 0 1-1 1H4a1 1 0 0 1-1-1 1 1 0 0 1 1-1h16zm0-7a1 1 0 0 1 1 1 1 1 0 0 1-1 1H4a1 1 0 0 1-1-1 1 1 0 0 1 1-1h16z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="A">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
