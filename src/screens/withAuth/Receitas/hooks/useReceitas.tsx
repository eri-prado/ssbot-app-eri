import api from '../../../../services/api';
import { useContext } from 'react';
import { GlobalContext } from '../../../../contexts/globalContext';
import Toast from 'react-native-toast-message';

export function useReceitas() {
  const { userData } = useContext(GlobalContext);
  async function getReceitas() {
    const params = {
      cpf: userData?.strCPF || '',
      // cpf: '02730544305',
    };

    try {
      const result = await api().get(`receituarios/listar`, { params });
      if (Array.isArray(result.data)) {
        return result.data;
      } else {
        Toast.show({
          type: 'error',
          text1: 'Nenhum resultado encontrado.',
          position: 'bottom'
        });
        return null;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error),
        position: 'bottom'
      });
      return null;
    }
  }

  return { getReceitas };
}
