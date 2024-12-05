import moment from 'moment';
import { IAgenda } from '../types';

export function formatarAgendas(dados: IAgenda[]) {
  const agendasPaciente: any = {};

  dados.forEach((item) => {
    const dataFormatada = moment(item.datAgendamento).format('DD/MM/YYYY');

    if (!agendasPaciente[dataFormatada]) {
      agendasPaciente[dataFormatada] = [];
    }
    agendasPaciente[dataFormatada].push(item);
  });

  return agendasPaciente;
}
