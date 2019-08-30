import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// component
import { ModalComponent } from './modal.component';

// const
import { MODAL_DATA } from './modal';

// class
import { ModalRef } from './modal-ref.model';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        {
          provide: ModalRef,
          useValue: null
        },
        {
          provide: MODAL_DATA,
          useValue: null
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
