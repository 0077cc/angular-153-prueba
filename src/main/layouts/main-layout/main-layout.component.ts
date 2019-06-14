import { Component, OnInit, ElementRef } from '@angular/core';
import { TEAM, GROUPS, TEAMS, ITeam } from 'src/main/models/ITeam.model';
import { IMatch, PHASE } from 'src/main/models/IMatch.model';
import { IUserOption } from 'src/main/models/IUser.model';
import { AuthService } from 'src/providers/services/auth.services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IForecast } from 'src/main/models/IForecast.model';

@Component({
  selector: 'app-main-layout',
  templateUrl: 'main-layout.component.html',
  styles: [`
    input[type=number] {
      font-size: medium;
      width: 25px;
      padding: 0;
      margin: 0;
    };`,
    `
    .flag {
      width: 35px;
      height: 35px;
    };`,
  ]
})

export class MainLayoutComponent implements OnInit {

  matches: Array<IMatch>;
  groups: Array<Array<IMatch>>;
  teams: Array<Array<ITeam>>;
  myForecasts: Array<number>;
  forecasts: IForecast;
  G = GROUPS;
  T = TEAMS;
  currentUser: IUserOption;
  authServiceSub: Subscription;

  showLoading: boolean;
  logoutModal: boolean;
  saveModal: boolean;
  complete: boolean;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getForecasts();

    this.myForecasts = [];

    this.matches = [
      {
        group: 'A',
        match: 1,
        phase: PHASE.GM,
        date: '2019-06-14 19:30',
        teams: [TEAM.BRA, TEAM.BOL],
        score: [0, 0]
      },
      {
        group: 'A',
        match: 2,
        phase: PHASE.GM,
        date: '2019-06-15 14:00',
        teams: [TEAM.VEN, TEAM.PER],
        score: [0, 0]
      },
      {
        group: 'A',
        match: 7,
        phase: PHASE.GM,
        date: '2019-06-18 19:30',
        teams: [TEAM.BRA, TEAM.VEN],
        score: [0, 0]
      },
      {
        group: 'A',
        match: 8,
        phase: PHASE.GM,
        date: '2019-06-18 16:30',
        teams: [TEAM.BOL, TEAM.PER],
        score: [0, 0]
      },
      {
        group: 'A',
        match: 13,
        phase: PHASE.GM,
        date: '2019-06-22 14:00',
        teams: [TEAM.PER, TEAM.BRA],
        score: [0, 0]
      },
      {
        group: 'A',
        match: 14,
        phase: PHASE.GM,
        date: '2019-06-22 14:00',
        teams: [TEAM.BOL, TEAM.VEN],
        score: [0, 0]
      }
      ,
      {
        group: 'B',
        match: 3,
        phase: PHASE.GM,
        date: '2019-06-15 17:00',
        teams: [TEAM.ARG, TEAM.COL],
        score: [0, 0]
      },
      {
        group: 'B',
        match: 4,
        phase: PHASE.GM,
        date: '2019-06-16 14:00',
        teams: [TEAM.PAR, TEAM.QAT],
        score: [0, 0]
      },
      {
        group: 'B',
        match: 9,
        phase: PHASE.GM,
        date: '2019-06-19 19:30',
        teams: [TEAM.ARG, TEAM.PAR],
        score: [0, 0]
      },
      {
        group: 'B',
        match: 10,
        phase: PHASE.GM,
        date: '2019-06-19 16:30',
        teams: [TEAM.COL, TEAM.QAT],
        score: [0, 0]
      },
      {
        group: 'B',
        match: 15,
        phase: PHASE.GM,
        date: '2019-06-23 14:00',
        teams: [TEAM.QAT, TEAM.ARG],
        score: [0, 0]
      },
      {
        group: 'B',
        match: 16,
        phase: PHASE.GM,
        date: '2019-06-23 14:00',
        teams: [TEAM.COL, TEAM.PAR],
        score: [0, 0]
      }
      ,
      {
        group: 'C',
        match: 5,
        phase: PHASE.GM,
        date: '2019-06-16 17:00',
        teams: [TEAM.URU, TEAM.ECU],
        score: [0, 0]
      },
      {
        group: 'C',
        match: 6,
        phase: PHASE.GM,
        date: '2019-06-17 18:00',
        teams: [TEAM.JAP, TEAM.CHI],
        score: [0, 0]
      },
      {
        group: 'C',
        match: 11,
        phase: PHASE.GM,
        date: '2019-06-20 18:00',
        teams: [TEAM.URU, TEAM.JAP],
        score: [0, 0]
      },
      {
        group: 'C',
        match: 12,
        phase: PHASE.GM,
        date: '2019-06-21 18:00',
        teams: [TEAM.ECU, TEAM.CHI],
        score: [0, 0]
      },
      {
        group: 'C',
        match: 17,
        phase: PHASE.GM,
        date: '2019-06-24 18:00',
        teams: [TEAM.CHI, TEAM.URU],
        score: [0, 0]
      },
      {
        group: 'C',
        match: 18,
        phase: PHASE.GM,
        date: '2019-06-24 18:00',
        teams: [TEAM.ECU, TEAM.JAP],
        score: [0, 0]
      },

      // QF

      {
        match: 19,
        phase: PHASE.QF,
        date: '2019-06-27 19:30',
        teams: [],
        score: [0, 0]
      },
      {
        match: 20,
        phase: PHASE.QF,
        date: '2019-06-28 14:00',
        teams: [],
        score: [0, 0]
      },
      {
        match: 21,
        phase: PHASE.QF,
        date: '2019-06-28 18:00',
        teams: [],
        score: [0, 0]
      },
      {
        match: 22,
        phase: PHASE.QF,
        date: '2019-06-29 14:00',
        teams: [],
        score: [0, 0]
      },

      // SF

      {
        match: 23,
        phase: PHASE.SF,
        date: '2019-07-02 19:30',
        teams: [],
        score: [0, 0]
      },
      {
        match: 24,
        phase: PHASE.SF,
        date: '2019-07-03 19:30',
        teams: [],
        score: [0, 0]
      },

      // FF

      {
        match: 25,
        phase: PHASE.FF,
        date: '2019-07-06 14:00',
        teams: [],
        score: [0, 0]
      },
      {
        match: 26,
        phase: PHASE.FF,
        date: '2019-07-07 15:00',
        teams: [],
        score: [0, 0]
      },
    ];

    this.matches = this.matches.filter(m => m.phase === PHASE.GM);
    this.groups = [];
    this.G.forEach(groupName => this.groups.push(this.matches.filter(match => match.group === groupName)));

    this.teams = [];
    this.G.forEach(groupName => this.teams.push(this.T.filter(team => team.group === groupName)
      .sort((a, b) => a.id - b.id)));

  }

  getCurrentUser(): IUserOption {
    this.currentUser = this.authService.getUser();
    return this.currentUser;
  }

  getForecasts(): void {
    this.showLoading = true;
    this.authServiceSub = this.authService.getForecastList()
      .subscribe((response: Array<IForecast>) => {
        const forecasts = response.find(f => f.user === this.currentUser.id);
        this.forecasts = !!forecasts ? forecasts : null;
        console.log(this.forecasts);
      },
        () => { this.showLoading = false; },
        () => { this.authServiceSub.unsubscribe(); }
      );
  }

  formatNumber(n: number): string { return n < 10 ? `0${n}` : n.toString(); }

  getImgPath(teamName: string): string {
    const teamId = Object.keys(TEAM)
      .find(k => teamName.toLowerCase().includes(k.toLowerCase()));

    return `/src/assets/images/team/${teamId}_48x48.png`;
  }

  logout(): void {
    this.authService.logout()
      .subscribe(data => { if (data) { this.router.navigate(['login']); } });
  }

  onForecast(match: number, team: number, event: any): void {
    this.myForecasts[match * 2 + team] = event.target.value === '' ? null : +event.target.value;
    const total = this.myForecasts.filter(el => el !== null).length;
    this.complete = total === 36;
  }

  save(): void {
    const params: IForecast = {
      user: this.currentUser.id,
      group_matches: this.myForecasts,
      second_phase: [],
      points: 0
    };

    this.authService.setForecastsList(params)
      .subscribe(data => { if (data) { console.log(data); } });
  }

}
