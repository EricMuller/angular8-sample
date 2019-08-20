import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, share} from 'rxjs/operators';

@Component({
  selector: 'app-sidenav-layout',
  templateUrl: './sidenav-layout.component.html',
  styleUrls: ['./sidenav-layout.component.scss']
})
export class SidenavLayoutComponent implements OnInit {

  navigation = [
    { link: 'link1', label: 'menu.link1' },
    { link: 'link2', label: 'menu.link2' },
    { link: 'link3', label: 'menu.link3' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'material', label: 'menu.link4' }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      share()
    );


  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

}
