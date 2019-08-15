import { Component, OnInit } from '@angular/core';
import {JsonService} from '../json.service';
import {Post} from '../Post';

@Component({
  selector: 'app-mat-list',
  templateUrl: './mat-list.component.html',
  styleUrls: ['./mat-list.component.scss']
})
export class MatListComponent implements OnInit {

  posts: Post[] = [];

  constructor( private jsonService: JsonService ) { }

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
