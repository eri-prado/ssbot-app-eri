import { BackHandler, Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { RefObject, useEffect, useMemo, useState } from 'react';
import { styles } from './styles';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import CustomBackdrop from '../../../../../components/CustomBackdrop';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Container } from '../../../../../components/Container';

interface IBottomSheet {
  bottomSheetRef: RefObject<BottomSheetModalMethods> | null | undefined;
}

export default function BottomSheetProfissionais({
  bottomSheetRef,
}: IBottomSheet) {
  const snapPoints = useMemo(() => ['40%', '80%'], []);

  const profissionais = [
    {
      name: 'Drª. Gláucia Cordeiro',
      especialidade: 'Mastologista',
      imageUrl:
        'https://preciore.com/wp-content/uploads/2022/10/Dra.-Glaucia.jpg',
      instagramUrl: 'https://www.instagram.com/gmcordeiro/',
    },
    {
      name: 'Drª. Raquel Viega',
      especialidade: 'Mastologista',
      imageUrl:
        'https://preciore.com/wp-content/uploads/2022/10/dra-raquel-1.jpg',
      instagramUrl: 'https://www.instagram.com/quel_viegas/',
    },
    {
      name: 'Drª. Raissa Cruz',
      especialidade: 'Mastologista',
      imageUrl:
        'https://preciore.com/wp-content/uploads/2022/10/dra_raiisa.jpg',
      instagramUrl: 'https://www.instagram.com/raissacruz/',
    },
    {
      name: 'Drª. Jéssica Mendes',
      especialidade: 'Mastologista',
      imageUrl:
        'https://preciore.com/wp-content/uploads/2022/10/dra-jessica.jpg',
      instagramUrl: 'https://www.instagram.com/jessicamasto/',
    },
    {
      name: 'Drª. Yara Sena',
      especialidade: 'Mastologista',
      imageUrl:
        'https://preciore.com/wp-content/uploads/2022/10/dra-Yara-e1664783382659.jpg',
      instagramUrl: 'https://www.instagram.com/yarasenamasto/',
    },
    {
      name: 'Drª. Katrine Cançado',
      especialidade: 'Mastologista',
      imageUrl:
        'https://preciore.com/wp-content/uploads/2022/10/dra-katrine.jpg',
      instagramUrl: 'https://www.instagram.com/dra.katrinecancado/',
    },
    {
      name: 'Dr. José Guará',
      especialidade: 'Mastologista',
      imageUrl: 'https://preciore.com/wp-content/uploads/2022/10/dr-jose.jpg',
      instagramUrl: 'https://www.instagram.com/dr.joseguara/',
    },
    {
      name: 'Drª. Juliana Goulart',
      especialidade: 'Radiologista',
      imageUrl:
        'https://preciore.com/wp-content/uploads/2022/10/dra-Juliana.jpg',
      instagramUrl: 'https://www.instagram.com/julianacgreis/',
    },
    {
      name: 'Drª. Laís Pessanha',
      especialidade: 'Radiologista',
      imageUrl: 'https://preciore.com/wp-content/uploads/2022/10/lais-1.jpg',
      instagramUrl: 'https://www.instagram.com/dralaispessanha/',
    },
    {
      name: 'Drª. Lorena Testi',
      especialidade: 'Radiologista',
      imageUrl:
        'https://preciore.com/wp-content/uploads/2022/10/dra-lorena.jpg',
      instagramUrl: 'https://www.instagram.com/lorenarosatesti/',
    },
    {
      name: 'Drª. Noele Gomes',
      especialidade: 'Oncologista',
      imageUrl: 'https://preciore.com/wp-content/uploads/2022/10/noele-g.jpg',
      instagramUrl: 'https://www.instagram.com/dranoelegomesoncologista/',
    },
    {
      name: 'Drª. Rachel Cossetti',
      especialidade: 'Oncologista',
      imageUrl:
        'https://preciore.com/wp-content/uploads/2022/10/dra_rachel.jpg',
      instagramUrl: 'https://www.instagram.com/drarachelcossettioncologista/',
    },
    {
      name: 'Drª. Maria Juliana',
      especialidade: 'Médica Geneticista',
      imageUrl:
        'https://preciore.com/wp-content/uploads/2022/10/Dra-Juli-Ma.jpg',
      instagramUrl: 'https://www.instagram.com/mjulianarodovalhodoriqui/',
    },
    {
      name: 'Drª. Larissa Nápoli',
      especialidade: 'Radiologista',
      imageUrl: 'https://preciore.com/wp-content/uploads/2022/11/Lari-02-1.jpg',
      instagramUrl: 'https://www.instagram.com/dralarissapinheironapoli/',
    },
  ];

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

  useEffect(() => {
    const backAction = () => {
      
      if (bottomSheetRef && bottomSheetRef.current) {
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
  }, [bottomSheetRef]);

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
          <Text style={styles.title}>Profissionais</Text>

          <View style={styles.container}>
            {profissionais.map((professional, index) => (
              <View key={index} style={styles.card}>
                <Image
                  style={styles.image}
                  source={{
                    uri: professional.imageUrl,
                  }}
                  alt='team'
                />
                <View>
                  <TouchableOpacity>
                    <Text style={styles.teamTitle}>{professional.name}</Text>
                  </TouchableOpacity>
                  <Text style={styles.teamSubtitle}>
                    {professional.especialidade}
                  </Text>
                  <TouchableOpacity
                    style={{ marginTop: 8 }}
                    onPress={() => Linking.openURL(professional.instagramUrl)}
                  >
                    <Ionicons name='logo-instagram' size={28} color={'#fff'} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </Container>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}
