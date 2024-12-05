import { useContext } from 'react';
import { GlobalContext } from '../../../../contexts/globalContext';
import api from '../../../../services/api';
import Toast from 'react-native-toast-message';

export function useProfissional() {
  const { setProfissionais } = useContext(GlobalContext);
  async function getProfissionais(params: any) {
    const objParams = {
      ...params,
    };
    await api()
      .get('agendaPaciente/listarProfissionais', { params: objParams })
      .then((result) => {
        if (result.status === 200) {
          if (Array.isArray(result.data)) {
            const mappedOptions = result.data.map((option: any) => ({
              ...option,
              value: option.intProfissionalId,
              label: option.strProfissional,
              message: option.strHorarioAtendimento,
            }));
            setProfissionais(mappedOptions);
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

  return { getProfissionais };
}
