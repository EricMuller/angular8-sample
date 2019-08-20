import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListComponent} from './mat-list/mat-list.component';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {JsonService} from './json.service';
import {MatTableComponent} from './mat-table/mat-table.component';
import {MatLayoutComponent} from './mat-layout/mat-layout.component';
import {MatGridComponent} from './mat-grid/mat-grid.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [MatListComponent, MatTableComponent, MatLayoutComponent, MatGridComponent],
  imports: [
    CommonModule, RouterModule,
    MatListModule, MatIconModule, MatToolbarModule, MatCardModule, MatButtonModule, MatIconModule,
    MatTableModule, MatMenuModule, MatGridListModule, MatTabsModule, MatSnackBarModule
  ], providers: [JsonService]
})
export class MaterialModule {
}
