import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mat-layout',
  templateUrl: './mat-layout.component.html',
  styleUrls: ['./mat-layout.component.scss']
})
export class MatLayoutComponent implements OnInit {

  links = [
    { link: 'list', label: 'List' },
    { link: 'grid', label: 'Grid' },
    { link: 'table', label: 'Table' },
  ];

  constructor() { }

  ngOnInit() {
  }


}
