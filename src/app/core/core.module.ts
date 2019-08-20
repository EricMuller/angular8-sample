import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CookieService} from 'ngx-cookie-service';
import {KeycloakService} from './auth/keycloak.service';
import {KeyCloakInterceptor} from './http-interceptors/KeycloakInterceptor.http';
import {NotifierService} from './notifications/simple-notifier.service';
import {KeycloakGuardService} from './auth/keycloak-guard.service';
import {MatSnackBarModule} from '@angular/material';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [HttpClientModule, MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [],
  providers: [NotifierService, KeycloakGuardService, CookieService,
    KeycloakService,
    {provide: HTTP_INTERCEPTORS, useClass: KeyCloakInterceptor, multi: true}],
  exports: [TranslateModule]

})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [NotifierService, KeycloakGuardService, CookieService, KeycloakService]
    };
  }

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fr');
  }
}
