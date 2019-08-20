import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MatListComponent} from './mat-list/mat-list.component';
import {MatTableComponent} from './mat-table/mat-table.component';
import {MatLayoutComponent} from './mat-layout/mat-layout.component';
import {MatGridComponent} from './mat-grid/mat-grid.component';
import {MaterialModule} from './material.module';
import {KeycloakGuardService} from '@app/core/auth/keycloak-guard.service';

const routes: Routes = [
  {
    path: '', component: MatLayoutComponent,
    children: [
      {
        path: 'table', component: MatTableComponent,
      },
      {
        path: 'list', component: MatListComponent, canActivate: [KeycloakGuardService]
      },
      {
        path: 'grid', component: MatGridComponent,
      },
      {
        path: '', redirectTo: 'grid', pathMatch: 'full'
      },
    ]

  },
];

@NgModule({
  imports: [MaterialModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule {
}
