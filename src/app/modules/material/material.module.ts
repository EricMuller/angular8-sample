import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatListComponent} from './mat-list/mat-list.component';
import {MaterialRoutingModule} from './material-routing.module';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {JsonService} from './json.service';
import {HttpClientModule} from '@angular/common/http';
import {MatTableComponent} from './mat-table/mat-table.component';
import {MatLayoutComponent} from './mat-layout/mat-layout.component';
import {MatGridComponent} from './mat-grid/mat-grid.component';


@NgModule({
  declarations: [MatListComponent, MatTableComponent, MatLayoutComponent, MatGridComponent],
  imports: [
    CommonModule, HttpClientModule,
    MaterialRoutingModule, MatListModule, MatIconModule, MatToolbarModule, MatCardModule, MatButtonModule, MatIconModule,
    MatTableModule, MatMenuModule, MatGridListModule
  ], providers: [JsonService]
})
export class MaterialModule {
}
