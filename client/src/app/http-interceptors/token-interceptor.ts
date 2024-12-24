import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from '../shared/services/auth.service';

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const accessTokenExpired = AuthService.accessIsExpired();

  if (accessTokenExpired) {
    if (!AuthService.refreshIsExpired()) {
      console.log('Do Refresh Token');
    }
  }

  const token = AuthService.getToken();

  if (token === null) {
    return next(req);
  }

  const reqWithAuthHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token.access}`),
  });

  return next(reqWithAuthHeader).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error("WRONG TOKEN")
      if (error.status === 401) {
        AuthService.signOut(); // Удаляем токены, т.к. они больше не работают и не дают доступ
        // TODO: разобраться в логике, если авторизация, т.к. тоже 401 код!!!
      }
      return throwError(() => error);
    })
  );
}
