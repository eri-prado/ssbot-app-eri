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
import { IEntregaEPI } from './types';
import Toast from 'react-native-toast-message';
import moment from 'moment';

type EPIProps = StackScreenProps<RootStackParamList, 'EPI'>;

export default function EPI({ navigation }: EPIProps) {
  const { setCheckboxesEpi } =
    useContext(GlobalContext);
  const queryClient = useQueryClient();

  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10]);
  const [itemsPerPage] = useState(
    numberOfItemsPerPageList[0]
  );

  const epiFetch = useCustomQuery({
    key: 'epiFetchKey',
    endpoint: '/usuarios/epis/entrega',
    params: {
      // parametro: JSON.stringify({ "empresa": "521339", "codigo": "97593", "chave": "288989db11eba472b79f", "tipoSaida": "json", "empresaTrabalho": "637107", "dtEntregaInicial": "01/10/2019", "dtEntregaFinal": "12/09/2024" })
    },
  }
  );

  const sortByDateDescending = (array: any[]): any[] => {
    return array.sort((a, b) => {
      const dateA = moment(a.datUltimaEntrega, 'DD/MM/YYYY');
      const dateB = moment(b.datUltimaEntrega, 'DD/MM/YYYY');
      return dateB.diff(dateA);
    });
  };

  const epiDados: IEntregaEPI[] | [] = Array.isArray(epiFetch?.data) ? sortByDateDescending(epiFetch.data) : [];

  if (!epiFetch.isFetching && !epiFetch.isSuccess) {
    Toast.show({
      type: 'error',
      text1: String(epiFetch?.error?.message),
      position: 'bottom',
    });
  }

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, epiDados.length);

  return (
    <Container>
      <Surface style={styles.surface} elevation={4}>
        <ScrollView refreshControl={
          <RefreshControl refreshing={epiFetch.isFetching} onRefresh={() => {
            queryClient.invalidateQueries({ queryKey: ['epiFetchKey'] });
          }} />
        }>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>
                <Text
                  style={{ color: '#8A8F9A', fontWeight: '600', fontSize: 16 }}
                >
                  ENTREGA DE EPI
                </Text>
              </DataTable.Title>
              <DataTable.Title>{' '}</DataTable.Title>
            </DataTable.Header>

            {epiDados.length > 0 ? epiDados.slice(from, to).map((item: IEntregaEPI, index) => (
              <DataTable.Row key={`${index}${item.strEPI}${item.strCodEPI}`} style={{ backgroundColor: index % 2 == 0 ? '#fff' : '#f2f2fa' }}>
                <DataTable.Cell style={{ flex: 2, paddingVertical: 4, paddingRight: 4 }}>
                  <View>
                    <Text style={{ color: '#303746', fontWeight: '600', fontSize: 12 }}>
                      EPI: {item.strEPI}
                    </Text>

                  </View>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2, paddingVertical: 4 }}>
                  <View>
                    <Text style={{ color: '#6B7280', fontWeight: '500', fontSize: 12 }}>
                      Últ. Entrega: {item.datUltimaEntrega}
                    </Text>
                    <Text style={{ color: '#6B7280', fontWeight: '500', fontSize: 12 }}>
                      Reposição: {item.datReposicao}
                    </Text>
                    <Text style={{ color: '#6B7280', fontWeight: '500', fontSize: 12 }}>
                      Validade: {item.datValidade}
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
