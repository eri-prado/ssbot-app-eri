import { useContext } from 'react';
import { GlobalContext } from '../../../../contexts/globalContext';
import api from '../../../../services/api';
import Toast from 'react-native-toast-message';

export function useDias() {
  const { setDias } = useContext(GlobalContext);
  async function getDias(params: any) {
    const objParams = {
      ...params,
    };
    await api()
      .get('agendaPaciente/listarAgendaDia', { params: objParams })
      .then((result) => {
        if (result.status === 200) {
          if (Array.isArray(result.data)) {
            const mappedOptions = result.data.map((option: any) => ({
              ...option,
              value: option.datAgendamento,
              label: option.datAgendamento,
            }));
            setDias(mappedOptions);
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

  return { getDias };
}
