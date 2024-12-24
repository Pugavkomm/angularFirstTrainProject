import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {getFakeToken, getFakeUser} from '../../testing/factories';
import {API_URL} from '../../consts/urls';
import {provideHttpClient} from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store token on successful sign-in', () => {
    const user = getFakeUser();
    const token = getFakeToken(user);

    localStorage.clear();

    service.signIn(user.username, 'pAssw0rd!').subscribe(
      user => {
        expect(user).toBe(token);
      }
    );

    const request = httpMock.expectOne(API_URL + 'auth_api/sign-in/');
    request.flush(token);
    expect(localStorage.getItem('auth.token')).toBe(JSON.stringify(token));
  });

  it('should remove token from storage on logOut', () => {
    const userData = getFakeUser();
    const tokenData = getFakeToken();
    localStorage.setItem('auth.token', JSON.stringify(tokenData));
    AuthService.signOut();
    expect(localStorage.getItem('auth.token')).toBeNull();
  });

  it('should return token if exists in local storage', () => {
    localStorage.clear();
    const user = getFakeUser();
    const token = getFakeToken(user);
    const tokenNull = AuthService.getToken()
    localStorage.setItem('auth.token', JSON.stringify(token));
    const tokenValue = AuthService.getToken()

    expect(tokenNull).toBeNull();
    expect(tokenValue).toEqual(token);
  });

  it('should returns if expired access token', () => {
    const token = getFakeToken({exp: Date.now() - 1000, token_type: 'access'});
    localStorage.setItem('auth.token', JSON.stringify(token));
    const expired = AuthService.accessIsExpired();
    expect(expired).toBeTrue();
  });

  it('should returns if expired refresh token', () => {
    const token = getFakeToken({exp: Date.now() - 1000, token_type: 'access'});
    const customToken = {access: token.access, refresh: token.access};
    localStorage.setItem('auth.token', JSON.stringify(customToken));
    const expired = AuthService.refreshIsExpired();
    expect(expired).toBeTrue();
  });

  it('should returns userData from access token', () => {
    const user = getFakeUser();
    const token = getFakeToken(user);

    localStorage.setItem('auth.token', JSON.stringify(token));

    const userFromToken = AuthService.getUser();

    expect(userFromToken).toEqual(user);


  });
});
