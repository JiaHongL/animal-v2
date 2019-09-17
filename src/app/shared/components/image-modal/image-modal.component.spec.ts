import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageModalComponent } from './image-modal.component';
import { ModalRef } from '../modal/modal-ref.model';
import { MODAL_DATA } from '../modal/modal';


describe('ImageModalComponent', () => {

  let component: ImageModalComponent;
  let fixture: ComponentFixture<ImageModalComponent>;

  const mockData = { url: 'a' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageModalComponent],
      providers: [
        { provide: ModalRef, useValue: {} },
        { provide: MODAL_DATA, useValue: mockData },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pictureUrl 應該帶入 MODAL_DATA 的資料', () => {
    expect(component.pictureUrl).toBe(mockData.url);
  });


});
