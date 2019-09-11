import { Component, OnInit } from '@angular/core';

// const
import { issueStatusOptions } from './../../constant/options/issue-status-options.const';

// enum
import { IssueStatus } from '../../enum/issue-status.enum';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  /**
   * 當前議題狀態
   *
   * @memberof IssuesComponent
   */
  currentIssuesStatus = IssueStatus.ALL;

  /**
   * 議題狀態 選項
   *
   * @memberof IssuesComponent
   */
  issueStatusOptions = issueStatusOptions;

  constructor() { }

  ngOnInit() {
  }

  /**
   * 設定當前 議題狀態
   *
   * @param {IssueStatus} status
   * @memberof IssuesComponent
   */
  setCurrentIssuesStatus(status: IssueStatus): void {
    this.currentIssuesStatus = status;
  }

}
