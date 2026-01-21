import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAffectationComponent } from './gestion-affectation.component';

describe('GestionAffectationComponent', () => {
  let component: GestionAffectationComponent;
  let fixture: ComponentFixture<GestionAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionAffectationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
