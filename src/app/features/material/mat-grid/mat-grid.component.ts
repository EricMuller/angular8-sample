import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, share} from 'rxjs/operators';
import {Post} from '../Post';
import {JsonService} from '../json.service';
import {Grid} from './grid';

@Component({
  selector: 'app-mat-grid',
  templateUrl: './mat-grid.component.html',
  styleUrls: ['./mat-grid.component.scss']
})
export class MatGridComponent implements OnInit {

  posts: Post[] = [];

  cols$: Observable<Grid> = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge])
    .pipe(
      map(result => {
          const grid = new Grid('4', '4:3');

          if (result.breakpoints[Breakpoints.XSmall]) {
            // handle XSmall breakpoint
            grid.col = '1';
          }
          if (result.breakpoints[Breakpoints.Small]) {
            // handle Small breakpoint
            grid.col = '2';
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            // handle Medium breakpoint
            grid.col = '4';
          }
          if (result.breakpoints[Breakpoints.Large]) {
            // handle Large breakpoint
            grid.col = '8';
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            // handle XLarge breakpoint
            grid.col = '12';
          }
          return grid;
        }
      ),
      share()
    );

  constructor(private breakpointObserver: BreakpointObserver, private jsonService: JsonService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {

    if (this.posts.length === 0) {
      this.jsonService.getPosts()
        .subscribe(
          items => {
            this.posts = items;
          });
    }
  }

}
