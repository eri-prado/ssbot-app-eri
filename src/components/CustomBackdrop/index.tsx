import React, { useCallback } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

const CustomBackdrop = (props: BottomSheetBackdropProps) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        opacity={0.5}
        // onPress={() => navigation.popToTop()}
        {...props}
      />
    ),
    []
  );

  return renderBackdrop(props);
};

export default CustomBackdrop;
