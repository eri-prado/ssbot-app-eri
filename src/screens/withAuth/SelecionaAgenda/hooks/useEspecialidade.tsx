import { useContext } from 'react';
import { GlobalContext } from '../../../../contexts/globalContext';
import api from '../../../../services/api';
import Toast from 'react-native-toast-message';

export function useEspecialidade() {
  const { setEspecialidades } = useContext(GlobalContext);
  async function getEspecialidades(params: any) {
    const objParams = {
      ...params,
    };
    await api()
      .get('agendaPaciente/listarEspecialidadesMedicas', { params: objParams })
      .then((result) => {
        if (result.status === 200) {
          if (Array.isArray(result.data)) {
            const mappedOptions = result.data.map((option: any) => ({
              ...option,
              value: option.intEspecialidadeMedicaId,
              label: option.strEspecialidadeMedica,
            }));
            setEspecialidades(mappedOptions);
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

  return { getEspecialidades };
}
