import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// component
import { ModalComponent } from './modal.component';

// const
import { MODAL_CONFIG } from './modal';

// class
import { ModalRef } from './modal-ref.model';
import { UtilityService } from '../../../core/utility/utility.service';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        UtilityService,
        {
          provide: ModalRef,
          useValue: {
            opened: () => { }
          }
        },
        {
          provide: MODAL_CONFIG,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
