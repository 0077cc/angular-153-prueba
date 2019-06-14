import { TEAM } from './ITeam.model';

export enum PHASE {
  GM = 'GM',
  QF = 'QF',
  SF = 'SF',
  FF = 'FF'
}

export interface IMatch {
  group?: string;
  match: number;
  phase: PHASE;
  date: string;
  teams: Array<TEAM>;
  score: Array<number>;
}
