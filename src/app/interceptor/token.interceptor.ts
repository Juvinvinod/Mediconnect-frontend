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

  // setError(error: HttpErrorResponse): string {
  //   let errorMessage = 'Unknown error occurred';
  //   if (error.error instanceof ErrorEvent) {
  //     //client side error
  //     console.log(error);

  //     errorMessage = error.message;
  //   } else {
  //     //server side error
  //     if (error.status !== 0) {
  //       errorMessage = error.error.errorMessage;
  //     }
  //   }
  //   return errorMessage;
  // }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occurred';
    if (error.error && error.error.errors && error.error.errors.message) {
      // If the error response has an 'errors' property, use it
      errorMessage = error.error.errors.message;
    } else if (
      error.error &&
      error.error.errors[0] &&
      error.error.errors[0].message
    ) {
      // Client-side error
      console.log(error.error);
      errorMessage = error.error.errors[0].message;
    } else if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.log(error);
      errorMessage = error.message;
    } else {
      // Server-side error
      if (error.status !== 0) {
        errorMessage = error.error.errorMessage;
      }
    }
    return errorMessage;
  }
}
