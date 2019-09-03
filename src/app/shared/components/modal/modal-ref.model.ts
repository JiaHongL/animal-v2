import { ComponentRef, EmbeddedViewRef, ComponentFactory, Injector } from '@angular/core';

// component
import { ModalComponent } from './modal.component';

// const
import { MODAL_DATA, MODAL_CONFIG } from './modal';

// rxjs
import { Subject, Observable } from 'rxjs';

export class ModalRef<T> {

  /**
   *  視窗 的 reference
   *
   * @private
   * @type {ComponentRef<ModalComponent>}
   * @memberof ModalRef
   */
  private modalRef: ComponentRef<ModalComponent>;

  /**
   *  視窗元件 的 實體
   *
   * @type {*}
   * @memberof ModalRef
   */
  instance: any;

  /**
   * 視窗元件 的 View
   *
   * @type {*}
   * @memberof ModalRef
   */
  hostView: any;

  private readonly _afterOpened = new Subject<{}>();
  private readonly _afterClosed = new Subject<{}>();

  constructor(
    private modalFactory: ComponentFactory<ModalComponent>,
    private contentFactory: ComponentFactory<T>,
    private data: any
  ) {

    // 設定 injector
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: ModalRef,
          useValue: this
        },
        {
          provide: MODAL_CONFIG,
          useValue: this.data
        },
        {
          provide: MODAL_DATA,
          useValue: this.data ? this.data.data : ''
        }
      ]
    });

    // 建立 modal reference
    this.modalRef = this.modalFactory.create(injector);

    // 儲存 hostView && instance
    this.hostView = this.modalRef.hostView;
    this.instance = this.modalRef.instance;

    // 視窗元件 內部 載入 內容元件
    this.modalRef.instance.contentComponent = this.contentFactory.create(injector).componentType;

  }

  /**
   * 獲取 完成開啟 通知 的 Obs
   */
  afterOpened(): Observable<any> {
    return this._afterOpened.asObservable();
  }

  /**
   * 獲取 完成關閉 通知 的 Obs
   */
  afterClosed(): Observable<any> {
    return this._afterClosed.asObservable();
  }

  /**
   * 關閉
   *
   * @param {*} result - 回傳結果
   * @memberof ModalRef
   */
  close(result: any = null): void {

    // 獲取 視窗元件的 domElem
    const domElem = (this.modalRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // 元件做 destroy 與 dom 移除
    this.modalRef.destroy();
    domElem.remove();

    // 通知
    this._afterClosed.next(result);
    this._afterClosed.complete();

  }

}
