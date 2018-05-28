import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Css3dThreejsComponent } from './css3d-threejs.component';

describe('Css3dThreejsComponent', () => {
  let component: Css3dThreejsComponent;
  let fixture: ComponentFixture<Css3dThreejsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Css3dThreejsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Css3dThreejsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
