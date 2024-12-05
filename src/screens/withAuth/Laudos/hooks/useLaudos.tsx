import { useContext } from 'react';
import { GlobalContext } from '../../../../contexts/globalContext';
import { dadosEmpresa } from '../../../../utils/empresa';
import { IEntregaDeLaudo } from '../../../../types/types';
import api from '../../../../services/api';
import Toast from 'react-native-toast-message';

export function useLaudos() {
  const { setLaudos, userData } = useContext(GlobalContext);

  async function getLaudosEntrega() {
    const params = {
      bolLiberado: 'S',
      // clienteId: dadosPaciente.clienteId,
      cpf: userData?.strCPF || '',
      // cpf: '25819097300',
    };

    try {
      const result = await api().get(`laudosPDF/listar`, { params });
      if (Array.isArray(result.data)) {
        setLaudos(result.data);
      } else {
        Toast.show({
          type: 'error',
          text1: String(result),
          position: 'bottom'
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error),
        position: 'bottom'
      });
    }
  }

  async function getLaudos(laudo: IEntregaDeLaudo) {
    const params = {
      bd: '',
      laudoClienteId: laudo?.intLaudoClienteId,
      clienteId: laudo?.intClienteId,
      atendimentoId: laudo?.intAtendimentoId,
      faturaAtendimentoId: laudo?.intFaturaAtendimentoId,
      retornoConteudo: 'S',
    };

    try {
      const result = await api().get(`laudosPDF/listar`, { params });
      if (Array.isArray(result.data)) {
        return result.data[0];
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

  return { getLaudosEntrega, getLaudos };
}
