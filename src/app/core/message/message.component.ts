import { Component, OnInit, Inject } from '@angular/core';

// model
import { ModalRef } from '../../shared/components/modal/modal-ref.model';
import { MODAL_DATA } from '../../shared/components/modal/modal';

// interface
import { MessageConfig } from './message-config.interface';

// enum
import { MessageType } from './message-type.enum';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  /**
   * 訊息類型的enum
   *
   * @memberof MessageComponent
   */
  messageType = MessageType;

  /**
   * 標題
   *
   * @memberof MessageComponent
   */
  title = '';

  /**
   * 內容
   *
   * @memberof MessageComponent
   */
  content = '';

  /**
   * 類型
   *
   * @type {MessageType}
   * @memberof MessageComponent
   */
  type: MessageType = null;

  /**
   * 確認按鈕 文字
   *
   * @type {string}
   * @memberof MessageComponent
   */
  okBtnTitle?: string;

  /**
   * 取消按鈕 文字
   *
   * @type {string}
   * @memberof MessageComponent
   */
  cancelBtnTitle?: string;


  constructor(
    public modalRef: ModalRef<MessageComponent>,
    @Inject(MODAL_DATA) public data: MessageConfig
  ) {

    this.title = data.title;
    this.content = data.content;
    this.type = data.type;
    this.okBtnTitle = data.okBtnTitle;
    this.cancelBtnTitle = data.cancelBtnTitle;

  }
  ngOnInit() {
  }

}
