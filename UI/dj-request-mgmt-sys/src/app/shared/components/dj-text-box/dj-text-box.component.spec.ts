import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DjTextBoxComponent } from './dj-text-box.component';

describe('DjTextBoxComponent', () => {
  let component: DjTextBoxComponent;
  let fixture: ComponentFixture<DjTextBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DjTextBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DjTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
