import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadictadoComponent } from './listadictado.component';

describe('ListadictadoComponent', () => {
  let component: ListadictadoComponent;
  let fixture: ComponentFixture<ListadictadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadictadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadictadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
