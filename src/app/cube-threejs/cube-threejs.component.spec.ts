import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CubeThreejsComponent } from './cube-threejs.component';

describe('CubeThreejsComponent', () => {
  let component: CubeThreejsComponent;
  let fixture: ComponentFixture<CubeThreejsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CubeThreejsComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CubeThreejsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
