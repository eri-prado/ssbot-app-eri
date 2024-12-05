export interface IUserAuth {
  intAppUsuarioId: number;
  strAppUsuario: string;
  strCPF: string;
  strCelular: string;
  strEmail: string;
  datNascimento: string;
  strSexo: string;
  strCEP: string;
  strEndereco: string;
  strNumero: string;
  strComplemento: string;
  strBairro: string;
  strCidade: string;
  strEstado: string;
  bolAutorizado: string;
  strCodUnidade: string;
  strCodEmpresa: string;
  intAppFuncionarioId: number;
  strMatricula: string;
  strToken: string;
}

export type TypesKeysStorage = 'accessData';

export interface IConvenio {
  label: string;
  value: string;
  intConvenioId: number;
  strConvenio: string;
  strTipo: null;
  strRazaoSocial: string;
  strSigla: null;
  strCNPJ: string;
  strInscricaoEstadual: string;
  strInscricaoMunicipal: string;
  strTelefone: string;
  strRepresentante: string;
  strSite: string;
  strEmail: string;
  strObservacao: string;
  intAtividadeId: null;
  strAtividade: null;
  strEndereco: string;
  strNumero: string;
  strBairro: string;
  strComplemento: string;
  strCep: string;
  strModalidade: string;
  intCidadeId: number;
  strCidade: null;
  strEstado: null;
  strCodPrestOperadora: null;
  strRegistroANS: string;
  strVersaoPadrao: string;
  strCredenciado: string;
  intTabelaProcedimentoId: number;
  strTabelaProced: string;
  strAlerta: string;
  strConfSabadoHoraInicio: string;
  strConfSabadoHoraFim: string;
  bolAtendimentoExpresso: string;
  bolNaoListarWeb: string;
  bolNaoEntregaLaudoWeb: string;
  intTabelaMedicamentoId: number;
  strTabelaMed: string;
  intTabelaMaterialId: number;
  strTabelaMat: string;
  intPlanoContasId: number;
  strPlanoContas: null;
  strCodigoPlanoContas: null;
  intTabelaTaxaId: number;
  strTabelaTaxa: null;
  intDiasRetorno: number;
  intDiasRetornoEmergencia: number;
  datVencimentoContrato: null;
  intTabelaProcedTISSId: number;
  strTabelaProcedTISS: string;
  intTabelaTaxaTISSId: number;
  strTabelaTaxaTISS: string;
  bolCriticaGuiaRepetida: string;
  bolRepeteSenhaGuia: string;
  bolRepeteGuiaSenha: string;
  bolExigeSenha: string;
  bolExigeGuia: string;
  bolExigeGuiaPrincipal: string;
  bolDobrarValorApartamento: string;
  bolExigeNumCarteira: string;
  bolExigeValCarteira: string;
  bolGuiaAuto: string;
  intGuiaAutoI: number;
  intGuiaAutoF: number;
  intGuiaAutoAtual: number;
  bolGuiaAutoCon: string;
  intGuiaAutoConI: number;
  intGuiaAutoConF: number;
  intGuiaAutoConAtual: number;
  bolGuiaAutoExa: string;
  intGuiaAutoExaI: number;
  intGuiaAutoExaF: number;
  intGuiaAutoExaAtual: number;
  bolGuiaAutoPAtd: string;
  intGuiaAutoPAtdI: number;
  intGuiaAutoPAtdF: number;
  intGuiaAutoPAtdAtual: number;
  bolGuiaAutoHonor: string;
  intGuiaAutoHonorI: number;
  intGuiaAutoHonorF: number;
  intGuiaAutoHonorAtual: number;
  bolTermoAnexo: string;
  strMascaraGuia: string;
  strMascaraGuiaP: string;
  intOrigem: number;
  strOrigem: string;
  intDocumentoExecutante: number;
  intDocumentoSolicitante: number;
  intIdentificacao: number;
  strIdentificacao: string;
  strDestino: string;
  intQtdApartamento: null;
  numQtdApartamento: string;
  bolNaoDobraPacote: string;
  bolNaoDobrarCustoOp: string;
  numPercEnfermaria: string;
  numAcrescimoUrgencia: string;
  bolValorUNUrgencia: string;
  numPercSegundoProcedimento: string;
  numPercSegundoProcedimentoCusto: string;
  numPercSegundoProcedimentoFilme: string;
  numPercSegundoPacote: string;
  intDigitosMatricula: number;
  numValorFilme: string;
  bolValorFicha: string;
  bolNaoReplicaGuiaOperadora: string;
  bolInativo: null;
  strTipoSaia: string;
  intUsuarioId: number;
  strUsuario: string;
  intEmpresaId: number;
  strEmpresa: string;
  datConvenio: string;
  strTabelaMedicamento: string;
  strPadraoPosicaoProfissional: string;
  strTabelaMaterial: string;
  bolBrasMedicamentoPMC: string;
  bolBrasMedicamentoPFB: string;
  numBrasMedicamentoPerc: string;
  bolBrasMedicamentoUtilizaPFB: string;
  bolTelaComplementar: string;
  bolProcedimentoAgenda: string;
  bolUtilizaTISSBras: string;
  bolUtilizaTISSSimpro: string;
  bolCalculaReducaoAcrescimo: string;
  bolUnitarioTabela: string;
  numUnitarioTabelaRedAcres: string;
  bolPercCustoVlrTotal: string;
  bolEditaValorOPE: string;
  bolEditaValorProc: string;
  bolOcultarValor: string;
  bolLocalExternoSADT: string;
  strBloqueioWebZap: string;
  bolValorTabela: string;
  bolBrasRestritoPMC: string;
  bolBrasRestritoPFB: string;
  numBrasRestritoPerc: string;
  bolBrasRestritoUtilizaPFB: string;
  bolBrasMaterialPFB: string;
  numBrasMaterialPerc: string;
  bolBrasSolucaoPMC: string;
  bolBrasSolucaoPFB: string;
  numBrasSolucaoPerc: string;
  bolBrasSolucaoUtilizaPFB: string;
  bolSimproPMC: null;
  bolSimproPFB: string;
  numSimproPerc: string;
  bolSimproUtilizaPFB: null;
  bolUrgenciaEmergencia: string;
  intEmpresaCredenciadaId: number;
  strInformacaoUtil: null;
  bolConfEmergSemana: string;
  bolConfEmergSabado: string;
  bolConfEmergDomingo: string;
  bolConfEmergFeriado: string;
  strConfHoraInicio: string;
  strConfHoraFim: string;
  numPercEmergSemana: string;
  numPercEmergSabado: string;
  numPercEmergDomingo: string;
  numPercEmergFeriado: string;
  intTabelaProcedimentoEmergId: number;
  strTabelaProcedimentoEmerg: null;
  strModeloSaia: string;
  strModeloASO: null;
  strInformacaoAdicional: string;
  strMascaraMatMed: string;
  strPrefixoBrasindice: string;
  strPrefixoSimpro: string;
  strTipoRecolhimento: string;
  strTipoOperacao: string;
  strTipoTributacao: string;
  numAliquotaAtividade: string;
  numAliquotaPIS: string;
  numAliquotaCOFINS: string;
  numAliquotaINSS: string;
  numAliquotaIR: string;
  numAliquotaCSLL: string;
  numAliquotaIRPS: string;
  strEmpresaCredenciada: string;
  bolSolicitacao: string;
  numMaterialSemRelacao: string;
  numMedicamentoSemRelacao: string;
  intLogoConvenioBI: number;
  strPlataformaLaboratorio: string;
  strCodigoLaboratorio: string;
  strWSElegibilidade: string;
  strWSSolicitacaoProcedimento: string;
  bolMesmoCodigoSegProcedH: string;
  bolMesmoCodigoSegProcedF: string;
  bolMesmoCodigoSegProcedOP: string;
  bolMesmoCodigoSegPacote: string;
  bolConsultaSADT: string;
  strObsZap: string;
  bolCentralAgendamento: null;
  intQtdConv: number;
  bolMultiEmpresaBancoUnico: null;
}

export interface IEntregaDeLaudo {
  intLaudoPDFId: string;
  intClienteId: string;
  intAtendimentoId: string;
  intLaudoClienteId: string;
  bolLiberado: string;
  bolHtml: string;
  bolImportado: string;
  intUsuarioId: string;
  datLaudoPDF: string;
  intEmpresaId: string;
  datAtende: string;
  strStatus: string;
  strCodigoProcedimento: string;
  strDescrProcedimento: string;
  intFaturaAtendimentoId: string;
  strStudyUID: string;
  strLaudoPDF: string;
}

export interface ITiposAgendamento {
  label: string;
  value: string;
  intTipoAgendamentoId: number;
  strTipoAgendamento: string;
}

export interface IEspecialidadeMedica {
  label: string;
  value: string;
  intEspecialidadeMedicaId: number;
  strEspecialidadeMedica: string;
}

export interface IProfissional {
  label: string;
  value: string;
  intProfissionalId: number;
  strProfissional: string;
  strSigla: string;
  strEstadoConselho: string;
  strNumeroConselho: string;
  strHorarioAtendimento: string;
}

export interface IDia {
  label: string;
  value: string;
  datAgendamento: string;
  intAno: number;
  intMes: number;
  intDia: number;
}

export interface IHora {
  label: string;
  value: string;
  intAgendaId: number;
  strHora: string;
  Unnamed3: number;
  Unnamed4: number;
  Unnamed5: number;
}

export interface ICEP {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface IUnidade {
  intEmpresaId: number;
  strEmpresa: string;
  strCNPJ: string;
  strRazaoSocial: string;
  strEndereco: string;
  strComplemento: string;
  strBairro: string;
  strNumero: string;
  strCEP: string;
  intCidadeId: number;
  strCidade: string;
  strEstado: string;
  strTelefone: string;
  strEmail: string;
  strHorarioFuncionamento: string;
  strLatitude: string;
  strLongitude: string;
  strSite: string;
  strWhatsapp: string;
  strFacebook: string;
  strInstagram: string;
}

export interface INotification {
  body: string;
  sound: null;
  launchImageName: string;
  badge: null;
  subtitle: null;
  title: string;
  data: Data;
  summaryArgument: null;
  categoryIdentifier: string;
  attachments: any[];
  interruptionLevel: string;
  threadIdentifier: string;
  targetContentIdentifier: null;
  summaryArgumentCount: number;
}

export interface Data {
  campo_extra: string;
}
export interface INotificationUser {
  intAppNotificacaoId: number;
  intAppUsuarioId: number;
  strTitulo: string;
  strTexto: string;
  strErro: string;
  strStatus: string;
  strPlataforma: string;
  strCodigo: string;
  bolLido: string;
  bolDestaque: string;
  datEnvio: Date;
  intBadgeCont: string;
  intEmpresaId: number;
  datAppNotificacao: Date;
  bolVideochamada: string;
}
