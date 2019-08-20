import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {EMPTY, Observable} from 'rxjs';
import {NotifierService} from '@app/core/notifications/simple-notifier.service';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';


@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private  notifierService: NotifierService, private cookieService: CookieService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const JWT = `Bearer ${this.cookieService.get('Authorization')}`;
    req = req.clone({
      setHeaders: {
        Authorization: JWT
      }
    });

    return next.handle(req).pipe(
      tap(((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const contentType = event.headers.get('Content-Type');
          if (event.status === 401 || event.status === 400 || event.status === 422) {
            if ('application/json' === contentType) {
              this.notifierService.notifyError(event.body.exception);
            } else {
              this.notifierService.notifyError(event.body);
            }
            return EMPTY;
          }
        }
      })), catchError(err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 400 || err.status === 422) {
              return throwError(err);
            }
          } else {
            this.notifierService.notifyError(err.exception);
            return EMPTY;
          }
        }
      ))
  }
}
