import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDestinatarioComponent } from './nuevo-destinatario.component';

describe('NuevoDestinatarioComponent', () => {
  let component: NuevoDestinatarioComponent;
  let fixture: ComponentFixture<NuevoDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoDestinatarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
