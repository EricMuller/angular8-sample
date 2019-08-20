import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {Link1Component} from './features/link1/link1.component';
import {Link2Component} from './features/link2/link2.component';
import {Link3Component} from './features/link3/link3.component';


const routes: Routes = [

    {path: '', component: HomeComponent},
    {
      path: 'link1',
      component: Link1Component,
    },
    {
      path: 'link2',
      component: Link2Component,
    },
    {
      path: 'link3',
      component: Link3Component,
    },
    {
      path: 'material',
      loadChildren: () => import('./features/material/material-routing.module').then(m => m.MaterialRoutingModule)
    },
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
