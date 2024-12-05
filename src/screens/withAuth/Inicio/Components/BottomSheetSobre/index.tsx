import { BackHandler, Image, ScrollView, Text, View } from 'react-native';
import { RefObject, useEffect, useMemo, useState } from 'react';
import { styles } from './styles';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import CustomBackdrop from '../../../../../components/CustomBackdrop';
import Ionicons from '@expo/vector-icons/Ionicons';

interface IBottomSheet {
  bottomSheetRef: RefObject<BottomSheetModalMethods> | null | undefined;
}

export default function BottomSheetSobre({ bottomSheetRef }: IBottomSheet) {
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
      <BottomSheetView>
        <ScrollView style={styles.container}>
          <View style={{ gap: 16 }}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://preciore.com/wp-content/uploads/2022/10/equipe-preciore-corrente-ajuda-1-500x550.jpg',
              }}
              alt='team'
            />
            <Text style={styles.title}>Nossa Missão</Text>
            <Text style={styles.text}>
              Clínica especializada em mama com objetivo de levar atendimento,
              diagnóstico e tratamento de qualidade com agilidade. Somos muito
              mais que uma clínica de mastologia. Temos uma solução completa
              para ajudar você.
            </Text>
            <View style={styles.options}>
              <Ionicons name='checkmark-circle' size={24} color='#bcbccc' />
              <Text style={styles.textOption}>Mastologia</Text>
            </View>
            <View style={styles.options}>
              <Ionicons name='checkmark-circle' size={24} color='#bcbccc' />
              <Text style={styles.textOption}>Diagnóstico por Imagem</Text>
            </View>
            <View style={styles.options}>
              <Ionicons name='checkmark-circle' size={24} color='#bcbccc' />
              <Text style={styles.textOption}>Multiespecialistas</Text>
            </View>
          </View>
        </ScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
