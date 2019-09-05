import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '../../../core/core.module';

import { ShelterModalComponent } from './shelter-modal.component';

import { ModalRef } from '../../../shared/components/modal/modal-ref.model';

describe('ShelterModalComponent', () => {
  let component: ShelterModalComponent;
  let fixture: ComponentFixture<ShelterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShelterModalComponent],
      imports: [
        CoreModule
      ],
      providers: [{ provide: ModalRef, useValue: null }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
