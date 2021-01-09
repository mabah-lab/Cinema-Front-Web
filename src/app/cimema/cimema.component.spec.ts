import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CimemaComponent } from './cimema.component';

describe('CimemaComponent', () => {
  let component: CimemaComponent;
  let fixture: ComponentFixture<CimemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CimemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CimemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
