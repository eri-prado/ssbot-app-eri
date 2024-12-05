import { useContext } from 'react';
import { GlobalContext } from '../../../../contexts/globalContext';
import api from '../../../../services/api';
import Toast from 'react-native-toast-message';

export function useTiposAgendamento() {
  const { setTiposAgendamento } = useContext(GlobalContext);
  async function getTiposAgendamento(params: any) {
    const objParams = {
      ...params,
    };
    await api()
      .get('agendaPaciente/listarTiposagendamento', { params: objParams })
      .then((result) => {
        if (result.status === 200) {
          if (Array.isArray(result.data)) {
            const mappedOptions = result.data.map((option: any) => ({
              ...option,
              value: option.intTipoAgendamentoId,
              label: option.strTipoAgendamento,
            }));
            setTiposAgendamento(mappedOptions);
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
  }

  return { getTiposAgendamento };
}
