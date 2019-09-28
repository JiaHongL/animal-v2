import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// modal
import { ModalComponent } from './modal.component';
import { ModalRef, MODAL_REF_OPENED } from './modal-ref.model';
import { ModalConfig } from './modal-config';

// const
import { MODAL_CONFIG } from './modal';

// service
import { UtilityService } from '../../../core/utility/utility.service';


describe('ModalComponent Default Value', () => {

  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  const mockModalConfig: ModalConfig = {
    data: null
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        {
          provide: UtilityService,
          useValue: {
            stopBodyScroll: () => { }
          }
        },
        {
          provide: ModalRef,
          useValue: {
            opened: () => { },
            close: () => { }
          }
        },
        {
          provide: MODAL_CONFIG,
          useValue: mockModalConfig
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

  it('若ModalConfig無資料，modal相關屬性需有預設值', () => {

    expect(component.minHeight).toBe('450px');
    expect(component.minWidth).toBe('300px');
    expect(component.hasMobileFullScreen).toBeFalsy();
    expect(component.animate).toBeTruthy();

  });

});

describe('ModalComponent', () => {

  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  const mockModalConfig: ModalConfig = {
    minHeight: '600px',
    minWidth: '600px',
    mobileFullScreen: true,
    animate: true,
    data: null
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        {
          provide: UtilityService,
          useValue: {
            stopBodyScroll: jasmine.createSpy('stopBodyScroll')
          }
        },
        {
          provide: ModalRef,
          useValue: {
            opened: jasmine.createSpy('opened'),
            close: jasmine.createSpy('close')
          }
        },
        {
          provide: MODAL_CONFIG,
          useValue: mockModalConfig
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

  it('ngOnInit 後，應該需呼叫 ModalRef 的 opened() 與 utilityService 的 stopBodyScroll', () => {

    const utilityService: UtilityService = TestBed.get(UtilityService);

    expect(utilityService.stopBodyScroll).toHaveBeenCalled();
    expect(component.modalRef[MODAL_REF_OPENED]).toHaveBeenCalled();

  });

  it('clickBackdrop function，應該需呼叫 ModalRef 的 close()', () => {

    const wrapperEle = fixture.debugElement.query(By.css('.modal-wrapper'));

    wrapperEle.triggerEventHandler('click', { target: wrapperEle.nativeElement });

    expect(component.modalRef.close).toHaveBeenCalled();

  });

  it('modal相關屬性，應使用 ModalConfig 相關資料', () => {

    expect(component.minHeight).toBe(mockModalConfig.minHeight);
    expect(component.minWidth).toBe(mockModalConfig.minWidth);
    expect(component.hasMobileFullScreen).toBe(mockModalConfig.mobileFullScreen);
    expect(component.animate).toBe(mockModalConfig.animate);

  });

});
