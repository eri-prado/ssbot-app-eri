import { ScrollView, Text, View, RefreshControl } from 'react-native';
import { Container } from '../../../components/Container';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../../contexts/globalContext';
import { DataTable, Surface } from 'react-native-paper';
import useCustomQuery from '../../../hooks/useCustomQuery';
import { styles } from './styles';
import { useQueryClient } from '@tanstack/react-query';
import { RootStackParamList } from '../../../routes';
import { StackScreenProps } from '@react-navigation/stack';
import { ITreinamentos } from './types';
import Toast from 'react-native-toast-message';
import moment from 'moment';

type TreinamentosProps = StackScreenProps<RootStackParamList, 'treinamentos'>;

export default function Treinamentos({ navigation }: TreinamentosProps) {
  const { setCheckboxesEpi } =
    useContext(GlobalContext);
  const queryClient = useQueryClient();

  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10]);
  const [itemsPerPage] = useState(
    numberOfItemsPerPageList[0]
  );

  const treinamentosFetch = useCustomQuery({
    key: 'treinamentosFetchKey',
    endpoint: '/usuarios/treinamentos',
    params: {},
  }
  );

  const sortByDateDescending = (array: any[]): any[] => {
    return array.sort((a, b) => {
      const dateA = moment(a.datFim, 'DD/MM/YYYY');
      const dateB = moment(b.datFim, 'DD/MM/YYYY');
      return dateB.diff(dateA);
    });
  };

  const epiDados: any[] | [] = Array.isArray(treinamentosFetch?.data) ? treinamentosFetch.data : [];

  if (!treinamentosFetch.isFetching && !treinamentosFetch.isSuccess) {
    Toast.show({
      type: 'error',
      text1: String(treinamentosFetch?.error?.message),
      position: 'bottom',
    });
  }

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, epiDados.length);

  return (
    <Container>
      <Surface style={styles.surface} elevation={4}>
        <ScrollView refreshControl={
          <RefreshControl refreshing={treinamentosFetch.isFetching} onRefresh={() => {
            queryClient.invalidateQueries({ queryKey: ['treinamentosFetchKey'] });
          }} />
        }>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>
                <Text
                  style={{ color: '#8A8F9A', fontWeight: '600', fontSize: 16 }}
                >
                  Treinamentos
                </Text>
              </DataTable.Title>

            </DataTable.Header>

            {epiDados.length > 0 ? epiDados.slice(from, to).map((item: ITreinamentos, index) => (
              <DataTable.Row key={`${index}${item.strCurso}`} style={{ backgroundColor: index % 2 == 0 ? '#fff' : '#f2f2fa' }}>
                <DataTable.Cell style={{ flex: 2, paddingVertical: 4, paddingRight: 4 }}>
                  <Text style={{ color: '#303746', fontWeight: '600', fontSize: 12 }}>
                    {item.strCurso}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2, paddingVertical: 4 }}>
                  <View>
                    <Text style={{ color: '#6B7280', fontWeight: '500', fontSize: 12 }}>
                      Turma: {item.strTurma}
                    </Text>
                    <Text style={{ color: '#6B7280', fontWeight: '500', fontSize: 12 }}>
                      CH: {item.strCargaHoraria}
                    </Text>
                  </View>
                </DataTable.Cell>

              </DataTable.Row>
            )) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                  minHeight: '50%'
                }}
              >
                <Text>Nenhum item encontrado.</Text>
              </View>
            )}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(epiDados.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} de ${epiDados.length}`}
              numberOfItemsPerPageList={[10]}
              numberOfItemsPerPage={itemsPerPage}
              showFastPaginationControls
            />
          </DataTable>
        </ScrollView>
      </Surface>
    </Container>
  );
}
