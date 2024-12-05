import { useContext } from 'react';
import { GlobalContext } from '../../../../contexts/globalContext';
import api from '../../../../services/api';
import Toast from 'react-native-toast-message';

export function useHoras() {
  const { setHoras } = useContext(GlobalContext);
  async function getHoras(params: any) {
    const objParams = {
      ...params,
    };
    await api()
      .get('agendaPaciente/listarAgendaHora', { params: objParams })
      .then((result) => {
        if (result.status === 200) {
          if (Array.isArray(result.data)) {
            const mappedOptions: any = result.data.map((option: any) => ({
              ...option,
              value: option.strHora,
              label: option.strHora,
              agendaId: option.intAgendaId,
            }));
            setHoras(mappedOptions);
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

  return { getHoras };
}
