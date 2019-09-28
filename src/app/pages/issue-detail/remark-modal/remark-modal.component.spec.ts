import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkModalComponent } from './remark-modal.component';

import { ModalRef } from '../../../shared/components/modal/modal-ref.model';
import { MODAL_DATA } from '../../../shared/components/modal/modal';

describe('RemarkModalComponent', () => {
  let component: RemarkModalComponent;
  let fixture: ComponentFixture<RemarkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemarkModalComponent],
      providers: [
        { provide: ModalRef, useValue: {} },
        { provide: MODAL_DATA, useValue: { remark: '我是備註' } },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('應該 宣告 元件所需的 變數 與 預設值', () => {

    fixture = TestBed.createComponent(RemarkModalComponent);
    component = fixture.componentInstance;

    expect(component).toEqual(
      jasmine.objectContaining({
        remark: ''
      })
    );

    fixture.detectChanges();

  });

  it('應該 宣告 元件所需的 變數 與 預設值', () => {

    fixture = TestBed.createComponent(RemarkModalComponent);
    component = fixture.componentInstance;

    expect(component).toEqual(
      jasmine.objectContaining({
        remark: ''
      })
    );

    fixture.detectChanges();

  });

  it('應該帶入MODAL_DATA傳進來的備註內容', () => {
    expect(component.remark).toBe('我是備註');
  });

});
