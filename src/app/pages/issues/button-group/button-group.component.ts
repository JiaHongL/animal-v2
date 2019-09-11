import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Option } from '../../../model/option/option.model';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {

  /**
   * 當前點擊的值
   *
   * @type {Option[]}
   * @memberof ButtonGroupComponent
   */
  @Input() value = '';

  /**
   * 按鈕清單
   *
   * @type {Option[]}
   * @memberof ButtonGroupComponent
   */
  @Input() buttons: Option[] = [];

  /**
   * 點擊事件
   *
   * @memberof ButtonGroupComponent
   */
  @Output() clickEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

}
