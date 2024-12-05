import { useContext } from 'react';
import { GlobalContext } from '../../../../contexts/globalContext';
import api from '../../../../services/api';
import Toast from 'react-native-toast-message';

export function useConvenios() {
  const { setConvenios } = useContext(GlobalContext);
  async function getConvenios() {
    const params = {
      inativo: 'N',
      solicitacao: 'N',
      retornaConfiguracao: 'S',
      naoListarWeb: 'S',
    };
    const result = await api()
      .get('agendaPaciente/listarConvenios', { params })
      .then((result) => {
        if (result.status === 200) {
          if (Array.isArray(result.data)) {
            const mappedOptions = result.data.map((option: any) => ({
              ...option,
              value: option.intConvenioId,
              label: option.strConvenio,
            }));
            setConvenios(mappedOptions);
          } else {
            Toast.show({
        type: 'error',
        text1: String(result),
        position: 'bottom'
      });
          }
        } else {
          Toast.show({
        type: 'error',
        text1: String(result),
        position: 'bottom'
      });
        }
      });

    return result;
  }

  return { getConvenios };
}
