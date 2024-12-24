import {Injectable} from '@angular/core';
import {Token} from '../interfaces/token';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../consts/urls';
import {Observable, tap} from 'rxjs';
import {parseToken} from '../../utils/parse-token';


@Injectable({
  providedIn: 'root',

})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signIn(username: string, password: string): Observable<Token> {
    const url = API_URL + 'auth_api/sign-in/';
    return this.http.post<Token>(url, {username, password}).pipe(
      tap(token => localStorage.setItem('auth.token', JSON.stringify(token))
      )
    );
  }

  static signOut(): void {
    localStorage.removeItem('auth.token');
  }

  static getToken(): Token | null {
    const data = localStorage.getItem('auth.token');
    if (data === null)
      return null;
    return JSON.parse(data);
  }

  /*
   Возвращает false если токен access устарел, либо если его уже не существует.
   */
  static accessIsExpired(): boolean {
    const tokenData = localStorage.getItem('auth.token');
    if (tokenData === null)
      return true;
    const token: Token = JSON.parse(tokenData);
    const decodedTokenData = parseToken(token.access);
    return decodedTokenData.exp < Date.now();
  }

  /*

   */
  static refreshIsExpired(): boolean {
    const tokenData = localStorage.getItem('auth.token');
    if (tokenData === null)
      return true;
    const token: Token = JSON.parse(tokenData);
    const decodedTokenData = parseToken(token.refresh);
    return decodedTokenData.exp < Date.now();
  }
}
