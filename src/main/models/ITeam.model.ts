export interface ITeam {
  id: number;
  name: string;
  group: string;
}

export enum TEAM {
  BRA = 'Brazil',
  BOL = 'Bolivia',
  VEN = 'Venezuela',
  PER = 'Peru',
  ARG = 'Argentina',
  COL = 'Colombia',
  PAR = 'Paraguay',
  QAT = 'Qatar',
  URU = 'Uruguay',
  ECU = 'Ecuador',
  JAP = 'Japon',
  CHI = 'Chile'
}

export enum GROUP { A = 'A', B = 'B', C = 'C' }

export const GROUPS = [GROUP.A, GROUP.B, GROUP.C];

export const TEAMS: Array<ITeam> = [
  { id: 2, name: 'Brazil', group: GROUP.A },
  { id: 1, name: 'Bolivia', group: GROUP.A },
  { id: 4, name: 'Venezuela', group: GROUP.A },
  { id: 3, name: 'Peru', group: GROUP.A },
  { id: 1, name: 'Argentina', group: GROUP.B },
  { id: 2, name: 'Colombia', group: GROUP.B },
  { id: 3, name: 'Paraguay', group: GROUP.B },
  { id: 4, name: 'Qatar', group: GROUP.B },
  { id: 4, name: 'Uruguay', group: GROUP.C },
  { id: 2, name: 'Ecuador', group: GROUP.C },
  { id: 3, name: 'Japon', group: GROUP.C },
  { id: 1, name: 'Chile', group: GROUP.C }
];
