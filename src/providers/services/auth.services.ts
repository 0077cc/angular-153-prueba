import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IUser, IUserOption } from 'src/main/models/IUser.model';
import { IScores } from 'src/main/models/IScores.model';
import { IForecast } from 'src/main/models/IForecast.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL: string = environment.apiURL;
  readonly API_USERS: string = 'users';
  readonly API_FORECASTS: string = 'forecasts';

  user = null;

  constructor(private http: HttpClient) {
    const _user = sessionStorage.getItem('user');

    if (_user) {
      this.user = JSON.parse(_user);
    }
  }

  getUserList(): Observable<Array<IUser>> {
    const url = `${this.BASE_URL}/${this.API_USERS}`;
    return this.http.get<Array<IUser>>(url);
  }

  getForecastList(): Observable<Array<IForecast>> {
    const url = `${this.BASE_URL}/${this.API_FORECASTS}`;
    return this.http.get<Array<IForecast>>(url);
  }

  setForecastsList(data: IForecast): Observable<IForecast> {
    const url = `${this.BASE_URL}/${this.API_FORECASTS}`;
    return this.http.post<IForecast>(url, data);
  }

  // login(email: string, password: string) {

  //   return this.getUserByEmail(email).pipe(
  //     map((res: any) => {
  //       if (res.length) {
  //         const [user] = res;

  //         if (user.password === password) {
  //           this.user = user;
  //           sessionStorage.setItem('user', JSON.stringify(this.user));
  //           return { logueado: true };
  //         }
  //       }

  //       return { logueado: false };
  //     })
  //   );
  // }

  // private getUserByEmail(email: string) {
  //   const API_URL = `${this.BASE_URL}/${this.API}/?email=${email}`;
  //   return this.http.get(API_URL); // Observable
  // }

  setUser(user: IUserOption) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): IUserOption {
    return JSON.parse(localStorage.getItem('user')) as IUserOption;
  }

  logout() {
    this.user = null;
    localStorage.clear();

    return of(true);
  }

}
