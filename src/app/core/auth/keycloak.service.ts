import {Injectable} from '@angular/core';
import {User} from '@app/core/auth/user.model';

import {environment} from '../../../environments/environment';


declare var Keycloak: any;

@Injectable()
export class KeycloakService {

  static auth: any = {};

  static user: User;

  static init(): Promise<any> {
    const keycloakAuth: any = Keycloak({
      url: environment.KEYCLOAK_URL,
      realm: environment.KEYCLOAK_REALM,
      clientId: environment.KEYCLOAK_CLIENTID
    });

    KeycloakService.auth.loggedIn = false;

    return new Promise((resolve, reject) => {
      keycloakAuth.init()
        .success(() => {

          KeycloakService.auth.authz = keycloakAuth;
          KeycloakService.auth.logoutUrl =
            keycloakAuth.authServerUrl + '/realms/' + environment.KEYCLOAK_REALM +
            '/protocol/openid-connect/logout?redirect_uri=' + document.baseURI;

          resolve();

        })
        .error((e) => {
          console.error(e);
          reject();
        });
    });
  }

  constructor() {
  }

  static login(): void {
    KeycloakService.auth.authz.login().success(
      () => {
        KeycloakService.auth.loggedIn = true;
        KeycloakService.auth.authz.loadUserProfile()
          .success(data => {
            this.user = new User();
            this.user.user_name = data.username;
            this.user.first_name = data.first_name;
            this.user.last_name = data.last_name;
            this.user.email = data.email;
          });
      }
    );
  }

  hasAnyRole(roles: string[]): boolean {
    for (let i = 0; i < roles.length; i++) {
      if (this.hasRole(roles[i])) {
        return true;
      }
    }

    return false;
  }

  hasRole(role: string): boolean {
    return KeycloakService.auth.authz.hasRealmRole(role);
  }

  hasManageUsersRole(): boolean {
    return KeycloakService.auth.authz.hasResourceRole('manage-users', 'realm-management');
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {

      if (KeycloakService.auth.authz && KeycloakService.auth.authz.token) {

        KeycloakService.auth.authz
          .updateToken(90) // refresh token if it will expire in 90 seconds or less
          .success(() => {
            resolve(KeycloakService.auth.authz.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      } else {
        reject('Please logged in with keycloack');
      }
    });
  }

  logout(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz
          .logout()
          .success(() => {
            resolve(KeycloakService.auth.authz.token);
          })
          .error(() => {
            reject('Failed to logout');
          });
      } else {
        reject('Not logged in');
      }
    });
  }

  getUser(): User {
    return KeycloakService.user;
  }

}
