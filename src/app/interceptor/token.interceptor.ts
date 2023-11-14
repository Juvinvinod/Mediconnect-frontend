import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  user = localStorage.getItem('user');
  userObject = this.user ? JSON.parse(this.user) : null;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const tokenizedReq = request.clone({
      setHeaders: { Authorization: 'Bearer ' + `${this.userObject?.token}` }
    });

    return next.handle(tokenizedReq);
  }
}
