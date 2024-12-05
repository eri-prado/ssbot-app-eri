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
import { IASO } from './types';
import Toast from 'react-native-toast-message';
import moment from 'moment';

type ASOProps = StackScreenProps<RootStackParamList, 'ASO'>;

export default function ASO({ navigation }: ASOProps) {
  const { setCheckboxesEpi } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10]);
  const [itemsPerPage] = useState(numberOfItemsPerPageList[0]);

  const asoFetch = useCustomQuery({
    key: 'asoFetchKey',
    endpoint: '/usuarios/asos',
    params: {
      // parametro: JSON.stringify({ "empresa": "636781", "codigo": "193007", "chave": "7161b94a86dde344a83f", "tipoSaida": "json", "funcionario": "169", "tipoASO": "1,2,3,4,5,6", "paramFiltroData": "0", "dataInicio": "", "dataFim": "" })
    },
  });

  const sortByDateDescending = (array: any[]): any[] => {
    return array.sort((a, b) => {
      const dateA = moment(a.DTASO, 'DD/MM/YYYY');
      const dateB = moment(b.DTASO, 'DD/MM/YYYY');
      return dateB.diff(dateA);
    });
  };
  
  const epiDados: IASO[] | [] = Array.isArray(asoFetch?.data)
    ? sortByDateDescending(asoFetch.data)
    : [];

  if (!asoFetch.isFetching && !asoFetch.isSuccess) {
    Toast.show({
      type: 'error',
      text1: String(asoFetch?.error?.message),
      position: 'bottom',
    });
  }

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, epiDados.length);

  return (
    <Container>
      <Surface style={styles.surface} elevation={4}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={asoFetch.isFetching}
              onRefresh={() => {
                queryClient.invalidateQueries({ queryKey: ['asoFetchKey'] });
              }}
            />
          }
        >
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>
                <Text
                  style={{ color: '#8A8F9A', fontWeight: '600', fontSize: 16 }}
                >
                  Exames
                </Text>
              </DataTable.Title>
            </DataTable.Header>

            {epiDados.length > 0 ? (
              epiDados.slice(from, to).map((item: IASO, index) => (
                <DataTable.Row
                  key={`${index}${item.DESCRICAOEXAME}${item.CODIGOEXAME}`}
                  style={{
                    backgroundColor: index % 2 == 0 ? '#fff' : '#f2f2fa',
                  }}
                >
                  <DataTable.Cell
                    style={{ flex: 2, paddingVertical: 4, paddingRight: 4 }}
                  >
                    <Text
                      style={{
                        color: '#303746',
                        fontWeight: '600',
                        fontSize: 12,
                      }}
                    >
                      {item.DESCRICAOEXAME}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 2, paddingVertical: 4 }}>
                    <View>
                      <Text
                        style={{
                          color: '#6B7280',
                          fontWeight: '500',
                          fontSize: 12,
                        }}
                      >
                        Tipo: {item.CODIGOEXAME}
                      </Text>
                      <Text
                        style={{
                          color: '#6B7280',
                          fontWeight: '500',
                          fontSize: 12,
                        }}
                      >
                        Data: {item.DTASO}
                      </Text>
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                  minHeight: '50%',
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
