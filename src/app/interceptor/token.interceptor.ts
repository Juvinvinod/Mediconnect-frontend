import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const tokenizedReq = request.clone({
      setHeaders: { Authorization: 'Bearer ' + this.userService.getToken() }
    });

    return next.handle(tokenizedReq);
  }
}
