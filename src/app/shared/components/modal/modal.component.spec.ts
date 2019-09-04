import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// module
import { CoreModule } from '../../../core/core.module';

// component
import { ModalComponent } from './modal.component';

// const
import { MODAL_CONFIG } from './modal';

// class
import { ModalRef } from './modal-ref.model';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ModalComponent],
      providers: [
        {
          provide: ModalRef,
          useValue: null
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
