import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpageheaderComponent } from './mainpageheader.component';

describe('MainpageheaderComponent', () => {
  let component: MainpageheaderComponent;
  let fixture: ComponentFixture<MainpageheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainpageheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainpageheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
