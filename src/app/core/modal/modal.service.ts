import { Injectable, ComponentFactoryResolver, ApplicationRef, EmbeddedViewRef, Type, ComponentRef } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalRef } from './modal-ref.model';

@Injectable()
export class ModalService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef
  ) {

  }

  /**
   * 開起視窗
   *
   * @param {Type<{}>} contentComponent - 傳入的內容元件
   * @param {*} [data] - 傳入的資料
   * @returns {ModalRef<any>}
   * @memberof ModalService
   */
  open(contentComponent: Type<{}>, data?: any): ModalRef<any> {

    // 若沒放入內容元件，則丟出一個錯誤
    if (!contentComponent) {
      throw new Error('not found component');
    }

    // 建立 內容元件 factory
    const contentComponentFactory = this
      .componentFactoryResolver
      .resolveComponentFactory(contentComponent);

    // 建立 視窗元件 factory
    const modalComponentFactory = this
      .componentFactoryResolver
      .resolveComponentFactory(ModalComponent);

    // 建立 視窗元件 Ref
    const modalRef = new ModalRef(modalComponentFactory, contentComponentFactory, data);

    // 視窗元件 放進 Angular 檢查機制
    this.applicationRef.attachView(modalRef.hostView);

    // 獲取 視窗元件 document Element
    const domElem = (modalRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 放進body後面
    document.body.appendChild(domElem);

    return modalRef;

  }

}
