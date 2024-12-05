import { BackHandler, Text, TouchableOpacity, View } from 'react-native';
import { RefObject, useEffect, useMemo, useState } from 'react';
import { styles } from './styles';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import CustomBackdrop from '../../../../../components/CustomBackdrop';
import { Container } from '../../../../../components/Container';

interface IBottomSheet {
  bottomSheetRef: RefObject<BottomSheetModalMethods> | null | undefined;
  especialidadesMedicas: any[] | null;
}

export default function BottomSheetEspecialidades({
  bottomSheetRef,
  especialidadesMedicas,
}: IBottomSheet) {
  const snapPoints = useMemo(() => ['40%', '80%'], []);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleSheetChanges = (index: number) => {
    setIsBottomSheetOpen(index >= 0);
  };

  useEffect(() => {
    const backAction = () => {
      if (isBottomSheetOpen && bottomSheetRef && bottomSheetRef.current) {
        bottomSheetRef.current.dismiss();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [isBottomSheetOpen, bottomSheetRef]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetScrollView>
        <Container>
          <Text style={styles.title}>Especialidades</Text>

          <View style={styles.container}>
            {Array.isArray(especialidadesMedicas) &&
              especialidadesMedicas &&
              especialidadesMedicas.map((especialidade) => (
                <View
                  key={especialidade.intEspecialidadeMedicaId}
                  style={styles.card}
                >
                  <TouchableOpacity>
                    <Text style={styles.teamTitle}>
                      {' '}
                      {especialidade.strEspecialidadeMedica}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </Container>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}
