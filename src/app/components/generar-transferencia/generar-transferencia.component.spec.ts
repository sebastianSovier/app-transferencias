import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarTransferenciaComponent } from './generar-transferencia.component';

describe('GenerarTransferenciaComponent', () => {
  let component: GenerarTransferenciaComponent;
  let fixture: ComponentFixture<GenerarTransferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarTransferenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
