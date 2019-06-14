import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
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

  getMatchesListSub: Subscription;
  getForecastListSub: Subscription;

  showLoadingMatches: boolean;
  showLoadingForecasts: boolean;

  logoutModal: boolean;
  saveModal: boolean;
  complete: boolean;
  bet: boolean;

  @ViewChild('betOption') betOption: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getMatches();
    this.getCurrentUser();
    this.getForecasts();

    this.myForecasts = [];
    this.matches = [];

    this.teams = [];
    this.G.forEach(groupName => this.teams.push(this.T.filter(team => team.group === groupName)
      .sort((a, b) => a.id - b.id)));

  }

  getMatches(): void {
    this.showLoadingMatches = true;
    this.getMatchesListSub = this.authService.getMatchesList()
      .subscribe((response: Array<IMatch>) => {
        if (response) {
          this.matches = response.filter(m => m.phase === PHASE.GM);
          this.groups = [];
          this.G.forEach(groupName => this.groups.push(this.matches.filter(match => match.group === groupName)));
          this.showLoadingMatches = false;
        }
      },
        () => { this.showLoadingMatches = false; },
        () => { this.getMatchesListSub.unsubscribe(); }
      );
  }

  getCurrentUser(): IUserOption {
    this.currentUser = this.authService.getUser();
    return this.currentUser;
  }

  getForecasts(): void {
    this.showLoadingForecasts = true;
    this.getForecastListSub = this.authService.getForecastList()
      .subscribe((response: Array<IForecast>) => {
        const forecasts = response.find(f => f.user === this.currentUser.id);
        this.forecasts = !!forecasts ? forecasts : null;
        if (this.forecasts) { this.showForecasts(); }
        this.showLoadingForecasts = false;
      },
        () => { this.showLoadingForecasts = false; },
        () => { this.getForecastListSub.unsubscribe(); }
      );
  }

  showForecasts(): void {
    this.myForecasts = this.forecasts.group_matches;
    this.bet = this.forecasts.bet;
  }

  formatNumber(n: number): string { return n < 10 ? `0${n}` : n.toString(); }

  getImgPath(teamName: string): string {
    const teamId = Object.keys(TEAM)
      .find(k => teamName.toLowerCase().includes(k.toLowerCase()));

    return `assets/images/team/${teamId}_48x48.png`;
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
      points: 0,
      bet: this.betOption.nativeElement.checked
    };

    this.authService.setForecastsList(params)
      .subscribe(data => {
        if (data) {
          this.complete = false;
          this.forecasts = data;
        }
      });
  }

}
