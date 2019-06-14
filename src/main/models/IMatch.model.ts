import { TEAM } from './ITeam.model';

export enum PHASE {
  GM = 'Gruoup Matches',
  QF = 'Quarter-Finals',
  SF = 'Semi-Finals',
  FF = 'Finals'
}

export interface IMatch {
  group?: string;
  match: number;
  phase: PHASE;
  date: string;
  teams: Array<TEAM>;
  score: Array<number>;
}
