import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import {
  IConvenio,
  IDia,
  IEntregaDeLaudo,
  IEspecialidadeMedica,
  IHora,
  IProfissional,
  ITiposAgendamento,
  IUserAuth,
} from '../types/types';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DateData } from 'react-native-calendars';

interface IDadosSelectsSelecionados {
  convenioId: number | null;
  tipoAgendamentoId: number | null;
  especialidadeId: number | null;
  profissionalId: number | null;
}

const mockDadosSelect = {
  convenioId: null,
  tipoAgendamentoId: null,
  especialidadeId: null,
  profissionalId: null,
};

interface ICheckboxesEpi {
  id: number;
  nome: string;
  checked: boolean;
}

interface IAgendaSelecionada extends DateData {
  dataAgenda: string;
  intAno: number;
  intDia: number;
  intMes: number;
  intTag: number;
  horaAgenda: string;
  strProfissional: string;
}
interface IContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isNewRegister: boolean;
  setIsNewRegister: Dispatch<SetStateAction<boolean>>;
  userData: IUserAuth | null;
  setUserData: Dispatch<SetStateAction<IUserAuth | null>>;
  laudos: IEntregaDeLaudo[];
  setLaudos: Dispatch<SetStateAction<IEntregaDeLaudo[]>>;
  convenios: IConvenio[] | [];
  setConvenios: Dispatch<SetStateAction<IConvenio[] | []>>;
  tiposAgendamento: ITiposAgendamento[] | [];
  setTiposAgendamento: Dispatch<SetStateAction<ITiposAgendamento[] | []>>;
  especialidades: IEspecialidadeMedica[] | [];
  setEspecialidades: Dispatch<SetStateAction<IEspecialidadeMedica[] | []>>;
  profissionais: IProfissional[] | [];
  setProfissionais: Dispatch<SetStateAction<IProfissional[] | []>>;
  dias: IDia[] | [];
  setDias: Dispatch<SetStateAction<IDia[] | []>>;
  horas: IHora[] | [];
  setHoras: Dispatch<SetStateAction<IHora[] | []>>;
  checkboxesEpi: ICheckboxesEpi[];
  setCheckboxesEpi: Dispatch<SetStateAction<ICheckboxesEpi[]>>;
  agendaSelecionada: IAgendaSelecionada | null | {[key: string]: any};
  setAgendaSelecionada: Dispatch<SetStateAction<IAgendaSelecionada | {[key: string]: any}>>;
  dadosSelectsSelecionados: IDadosSelectsSelecionados;
  setDadosSelectsSelecionados: Dispatch<SetStateAction<IDadosSelectsSelecionados>>;
}

export const GlobalContext = createContext({} as IContextProps);

interface IGlobalContextProvider {
  children: ReactNode;
}

export function GlobalContextProvider({ children }: IGlobalContextProvider) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNewRegister, setIsNewRegister] = useState(false);
  const [userData, setUserData] = useState<IUserAuth | null>(null);

  const [agendaSelecionada, setAgendaSelecionada] = useState<
    IAgendaSelecionada | { [key: string]: any }
  >({});

  const [laudos, setLaudos] = useState<IEntregaDeLaudo[] | []>([]);
  const [convenios, setConvenios] = useState<IConvenio[] | []>([]);
  const [tiposAgendamento, setTiposAgendamento] = useState<
    ITiposAgendamento[] | []
  >([]);
  const [especialidades, setEspecialidades] = useState<
    IEspecialidadeMedica[] | []
  >([]);
  const [profissionais, setProfissionais] = useState<IProfissional[] | []>([]);
  const [dias, setDias] = useState<IDia[] | []>([]);
  const [horas, setHoras] = useState<IHora[] | []>([]);

  const [dadosSelectsSelecionados, setDadosSelectsSelecionados] =
    useState<IDadosSelectsSelecionados>(mockDadosSelect);

  const epis = [
    {
      id: 1,
      nome: 'Bota',
      checked: true,
    },
    {
      id: 2,
      nome: 'Capacete',
      checked: true,
    },
    {
      id: 3,
      nome: 'Colete',
      checked: true,
    },
    {
      id: 4,
      nome: 'Luva',
      checked: true,
    },
    {
      id: 5,
      nome: 'Óculos',
      checked: true,
    },
  ];
  const [checkboxesEpi, setCheckboxesEpi] = useState(epis);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isAuthenticated,
        setIsAuthenticated,
        isNewRegister,
        setIsNewRegister,
        userData,
        setUserData,
        laudos,
        setLaudos,
        convenios,
        setConvenios,
        tiposAgendamento,
        setTiposAgendamento,
        especialidades,
        setEspecialidades,
        profissionais,
        setProfissionais,
        dias,
        setDias,
        horas,
        setHoras,
        checkboxesEpi,
        setCheckboxesEpi,
        agendaSelecionada,
        setAgendaSelecionada,
        dadosSelectsSelecionados,
        setDadosSelectsSelecionados
      }}
    >
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </GlobalContext.Provider>
  );
}
