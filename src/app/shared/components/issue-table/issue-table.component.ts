import { Component, OnInit, Input } from '@angular/core';

// class
import { Issue } from '../../../model/issue/issue.model';

// enum
import { SelectType } from './../../../core/selects/enum/select-type.enum';

@Component({
  selector: 'app-issue-table',
  templateUrl: './issue-table.component.html',
  styleUrls: ['./issue-table.component.scss']
})
export class IssueTableComponent implements OnInit {

  /**
   *  議題類型 enum
   *
   * @memberof IssueTableComponent
   */
  selectType = SelectType;

  /**
   * 議題清單
   *
   * @memberof IssueTableComponent
   */
  @Input() issues: Issue[] = [];

  /**
   * 頁碼
   *
   * @memberof IssueTableComponent
   */
  @Input() page = 1;

  constructor() { }

  ngOnInit() {
  }

  /**
   * 獲取項目 順數
   *
   * @param {number} index
   * @returns {number}
   * @memberof IssueTableComponent
   */
  getItemIndex(index: number): number {
    return index + 1 + (this.page - 1) * 10;
  }

}
