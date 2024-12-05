import { StackScreenProps } from '@react-navigation/stack';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import { styles } from './styles';
import { primaryColor } from '../../../styles/theme';

type Props = StackScreenProps<any, 'initialScreen'>;

export default function InitialScreen({ navigation }: Props) {
  const imageWoman = require('../../../../assets/images/woman.png');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.nomeEmpresa}>SSBot</Text>
      <Image style={styles.image} source={imageWoman} />
      <View style={styles.containerBottom}>
        <Swiper
          autoplay
          loop
          autoplayTimeout={4}
          dotColor='#DFE0F3'
          activeDotColor={primaryColor}
          activeDotStyle={{ width: 24 }}
        >
          <View style={styles.slide}>
            <Text style={styles.title}>Bem-vindo(a)</Text>
            <Text style={styles.text}>
              Agora você poderá agendar suas consultas/exames e acessar seu
              histórico na palma da mão.
            </Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.title}>Fale conosco</Text>
            <Text style={styles.text}>
              Disponibilizamos diversos canais para melhor servi-lo. Tire
              dúvidas, faça sugestões ou elogios para nossa equipe.
            </Text>
          </View>
        </Swiper>
        <Button
          mode='contained'
          onPress={() => navigation.navigate('login')}
          style={{
            paddingTop: 6,
            paddingBottom: 6,
            borderRadius: 50,
            width: '100%',
          }}
        >
          Vamos Começar?
        </Button>
      </View>
    </SafeAreaView>
  );
}
