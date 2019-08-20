import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandscapeLayoutComponent } from './landscape-layout.component';

describe('LandscapeLayoutComponent', () => {
  let component: LandscapeLayoutComponent;
  let fixture: ComponentFixture<LandscapeLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandscapeLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandscapeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
