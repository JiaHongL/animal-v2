import { Injectable } from '@angular/core';

import { MessageComponent } from './message.component';

import { ModalService } from '../../shared/components/modal/modal.service';

import { ModalConfig } from '../../shared/components/modal/modal-config';

import { MessageConfig } from './message-config.interface';

import { MessageType } from './message-type.enum';

import { ModalRef } from '../../shared/components/modal/modal-ref.model';

@Injectable()
export class MessageService {

  constructor(
    private modalService: ModalService
  ) {}

  /**
   * 提示視窗
   *
   * @param {string} content - 內容
   * @param {string} [title] - 標題
   * @param {string} [okBtnTitle] - 確定按鈕 標題文字
   * @returns {ModalRef<any>}
   * @memberof MessageService
   */
  alert(content: string, title?: string, okBtnTitle?: string): ModalRef<any> {

    const config: ModalConfig = {};
    const data: MessageConfig = {
      type: null,
      content: ''
    };

    data.type = MessageType.ALERT;
    data.title = title;
    data.content = content;
    data.okBtnTitle = okBtnTitle;

    config.minHeight = '200px';
    config.minWidth = '350px';
    config.mobileFullScreen = false;
    config.animate = false;
    config.data = data;

    return this.modalService.open(MessageComponent, config);

  }

  /**
   * 確認視窗
   *
   * @param {string} content - 內容
   * @param {string} [title] - 標題
   * @param {string} [okBtnTitle] - 確定按鈕 標題文字
   * @param {string} [cancelBtnTitle] - 取消按鈕 標題文字
   * @returns {ModalRef<any>}
   * @memberof MessageService
   */
  confirm(content: string, title?: string, okBtnTitle?: string, cancelBtnTitle?: string): ModalRef<any> {

    const config: ModalConfig = {};
    const data: MessageConfig = {
      type: null,
      content: ''
    };

    data.type = MessageType.CONFIRM;
    data.title = title;
    data.content = content;
    data.okBtnTitle = okBtnTitle;
    data.cancelBtnTitle = cancelBtnTitle;

    config.minHeight = '200px';
    config.minWidth = '350px';
    config.mobileFullScreen = false;
    config.animate = false;
    config.data = data;

    return this.modalService.open(MessageComponent, config);

  }

}
