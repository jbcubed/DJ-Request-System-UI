import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DjSysHeaderComponent } from './dj-sys-header.component';

describe('DjSysHeaderComponent', () => {
  let component: DjSysHeaderComponent;
  let fixture: ComponentFixture<DjSysHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DjSysHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DjSysHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
