import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaModalComponent } from './area-modal.component';

import { ModalRef } from '../../../shared/components/modal/modal-ref.model';
import { CoreModule } from '../../../core/core.module';

describe('AreaModalComponent', () => {
  let component: AreaModalComponent;
  let fixture: ComponentFixture<AreaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AreaModalComponent],
      imports: [
        CoreModule
      ],
      providers: [{ provide: ModalRef, useValue: null }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
