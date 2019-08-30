import { TestBed, inject } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';

import { CoreModule } from '../core.module';

import { ModalService } from './modal.service';

import { ModalRef } from './modal-ref.model';


@Component({ template: '<p>hi</p>' })
class ContentTestComponent { }

@NgModule({
  declarations: [ContentTestComponent],
  entryComponents: [ContentTestComponent],
})
class ContentTestModule { }

describe('ModalService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ContentTestModule
      ],
    });
  });

  it('should be created', inject([ModalService], (service: ModalService) => {
    expect(service).toBeTruthy();
  }));

  it('open function 參數未傳入內容元件，會丟一個錯誤', inject([ModalService], (service: ModalService) => {
    expect(() => service.open(null)).toThrow(new Error("not found component"));
  }));

  it('open function 會產生一個 Modal Reference', inject([ModalService], (service: ModalService) => {

    const modalRef = service.open(ContentTestComponent);
    expect(modalRef instanceof ModalRef).toBe(true);

  }));


});
