import {
  BackHandler,
  Linking,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RefObject, useEffect, useMemo, useState } from 'react';
import { styles } from './styles';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import CustomBackdrop from '../../../../../components/CustomBackdrop';
import { Container } from '../../../../../components/Container';
import { Surface } from 'react-native-paper';
import { primaryColor, secondaryColor } from '../../../../../styles/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import useCustomQuery from '../../../../../hooks/useCustomQuery';
import { IUnidade } from '../../../../../types/types';

interface IBottomSheet {
  bottomSheetRef: RefObject<BottomSheetModalMethods> | null | undefined;
}

export default function BottomSheetFaleConosco({
  bottomSheetRef,
}: IBottomSheet) {
  const snapPoints = useMemo(() => ['30%', '60%'], []);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleSheetChanges = (index: number) => {
    setIsBottomSheetOpen(index >= 0);
  };

  const empresaFetch = useCustomQuery({
    key: 'empresaFetchKey',
    endpoint: '/unidades',
    params: {},
  });

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

  const dadosEmpresa: IUnidade | null = Array.isArray(empresaFetch?.data)
    ? empresaFetch?.data[0]
    : null;

  const teste = {
    intEmpresaId: 1,
    strEmpresa: 'Unidade SESI de Segurança e Saúde no Trabalho - SESI Clínica',
    strCNPJ: '03770020000130',
    strRazaoSocial:
      'SESI - Serviço Social da Industria - Departamento Regional do Maranhão',
    strEndereco: 'SESI CLINICA - Av. Guaxenduba',
    strComplemento: '',
    strBairro: 'Coreia de Baixo - Centro',
    strNumero: ' S/N',
    strCEP: '65015560',
    intCidadeId: 1313,
    strCidade: 'Sao Luís',
    strEstado: 'MA',
    strTelefone: '983222 4412',
    strEmail: dadosEmpresa?.strEmail || '',
    strHorarioFuncionamento:
      'Segunda a Sexta: 06:30-17:30; Sábado: 07:30-11:30',
    strLatitude: '-2.5374278282307374',
    strLongitude: '-44.29125889370303',
    strSite: dadosEmpresa?.strSite || '#',
    strWhatsapp: dadosEmpresa?.strWhatsapp
      ? `https://wa.me/55${dadosEmpresa?.strWhatsapp}?text=Ol%C3%A1!%20acessei%20o%20aplicativo%20e%20gostaria%20de%20saber...`
      : '',
    strFacebook: 'https://www.facebook.com/sesimaranhao',
    strInstagram: '@sesimaranhaooficial',
  };

  function gerarLinkMapa(
    cep: string,
    endereco: string,
    cidade: string,
    nomeEmpresa: string
  ) {
    const query = encodeURIComponent(
      `${endereco}, ${cidade}, ${cep}, ${nomeEmpresa}`
    );

    const linkMapa = `https://www.google.com/maps/search/?api=1&query=${query}`;

    return linkMapa;
  }

  const linkMapaEmpresa = gerarLinkMapa(
    dadosEmpresa?.strCEP || '',
    dadosEmpresa?.strEndereco || '',
    dadosEmpresa?.strCidade || '',
    dadosEmpresa?.strEndereco || ''
  );

  const items = [
    {
      id: 1,
      icon: <Ionicons name='logo-whatsapp' size={24} color={primaryColor} />,
      text: 'Atendimento Whatsapp',
      link: dadosEmpresa?.strWhatsapp
        ? `https://wa.me/55${dadosEmpresa.strWhatsapp.trim()}?text=Ol%C3%A1!%20acessei%20o%20aplicativo%20e%20gostaria%20de%20saber...`
        : '#',
    },
    {
      id: 2,
      icon: <AntDesign name='phone' size={24} color={primaryColor} />,
      text: 'Atendimento Telefone',
      link: `tel:+55${dadosEmpresa?.strTelefone?.trim() || ''}`,
    },
    {
      id: 3,
      icon: <Ionicons name='mail-outline' size={24} color={primaryColor} />,
      text: 'Nosso E-mail',
      link: `mailto:${dadosEmpresa?.strEmail || ''}`,
    },
    {
      id: 4,
      icon: <Fontisto name='world-o' size={24} color={primaryColor} />,
      text: 'Nosso Site',
      link: dadosEmpresa?.strSite || '#',
    },
    {
      id: 5,
      icon: <Ionicons name='logo-instagram' size={24} color={primaryColor} />,
      text: 'Nosso Instagram',
      link: dadosEmpresa?.strInstagram
        ? `https://www.instagram.com/${dadosEmpresa.strInstagram.split('@')[1]}`
        : '#',
    },
    {
      id: 6,
      icon: <Ionicons name='map-outline' size={24} color={primaryColor} />,
      text: 'Nossa Localização',
      link: linkMapaEmpresa,
    },
  ];

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetScrollView>
        <Container style={{ background: 'red' }}>
          <Text style={styles.title}>Fale Conosco</Text>

          <View style={styles.container}>
            {items.map((item, index) => {
              if (index % 2 === 0) {
                return (
                  <View style={{ flexDirection: 'row', gap: 16, marginBottom: 8 }} key={index}>
                    <TouchableWithoutFeedback
                      onPress={() => Linking.openURL(items[index].link)}
                    >
                      <Surface
                        elevation={1}
                        style={{
                          borderRadius: 12,
                          padding: 16,
                          flexDirection: 'column',
                          gap: 8,
                          flexGrow: 1,
                          width: '40%',
                          backgroundColor: '#f9f9f9',
                        }}
                      >
                        {items[index].icon}
                        <Text
                          style={{
                            color: '#666',
                            fontWeight: '600',
                            fontSize: 14,
                          }}
                        >
                          {items[index].text}
                        </Text>
                      </Surface>
                    </TouchableWithoutFeedback>

                    {items[index + 1] && (
                      <TouchableWithoutFeedback
                        onPress={() => Linking.openURL(items[index + 1].link)}
                      >
                        <Surface
                          elevation={1}
                          style={{
                            borderRadius: 12,
                            padding: 16,
                            flexDirection: 'column',
                            gap: 8,
                            flexGrow: 1,
                            width: '40%',
                            backgroundColor: '#f9f9f9',
                          }}
                        >
                          {items[index + 1].icon}
                          <Text
                            style={{
                              color: '#666',
                              fontWeight: '600',
                              fontSize: 14,
                            }}
                          >
                            {items[index + 1].text}
                          </Text>
                        </Surface>
                      </TouchableWithoutFeedback>
                    )}
                  </View>
                );
              }
            })}
          </View>
        </Container>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}
