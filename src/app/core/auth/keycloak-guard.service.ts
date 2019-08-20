import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '@app/core/auth/user.model';

import {Observable, of} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, flatMap, map} from 'rxjs/operators';
import {NotifierService} from '../notifications/simple-notifier.service';
import {KeycloakService} from './keycloak.service';

@Injectable()
export class KeycloakGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private notifierService: NotifierService,
              private keycloakService: KeycloakService) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return fromPromise(this.keycloakService.getToken()).pipe(
      map((token) => {
          return true;
        }
      ), catchError(error => {
        return this.notifierService
          .notifyError(error, 'LOGIN')
          .onAction()
          .pipe(flatMap(() => {
             KeycloakService.login();
             return of(true);
          }));
      }));
  }

  public logout(): Promise<string> {
    return this.keycloakService.logout();
  }

  public isAuthentified(): boolean {
    const user: User = this.keycloakService.getUser();
    return user == null ? false : true;
  }

  public getUser(): User {
    return this.keycloakService.getUser();
  }

  public getToken(): Observable<string> {
    return fromPromise(this.keycloakService.getToken());
  }

}
