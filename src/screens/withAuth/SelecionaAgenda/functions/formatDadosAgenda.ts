import moment from 'moment';

export const formatDadosAgenda = (dadosAgenda: any[]) => {
  return dadosAgenda.reduce((acc, curr) => {
    const formattedDate = moment(
      `${curr.intAno}-${curr.intMes}-${curr.intDia}`,
      'YYYY-MM-DD'
    ).format('YYYY-MM-DD');
    acc[formattedDate] = acc[formattedDate] || [];
    acc[formattedDate].push(curr);
    return acc;
  }, {});
};
