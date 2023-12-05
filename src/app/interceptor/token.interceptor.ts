import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserService } from '../user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const tokenizedReq = request.clone({
      setHeaders: { Authorization: 'Bearer ' + this.userService.getToken() }
    });
    return next.handle(tokenizedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.setError(error);
        console.log(error.error);

        this.snackBar.open(errorMessage, 'Dismiss', {
          duration: 5000
        });
        return throwError(() => errorMessage);
      })
    );
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      //client side error
      errorMessage = error.error.message;
    } else {
      //server side error
      if (error.status !== 0) {
        errorMessage = error.error.errorMessage;
      }
    }
    return errorMessage;
  }
}
