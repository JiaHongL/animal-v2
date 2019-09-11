import { Component, OnInit } from '@angular/core';

// const
import { issueStatusOptions } from './../../constant/options/issue-status-options.const';

// service
import { ApiService } from './../../core/api/api.service';

// enum
import { IssueStatus } from '../../enum/issue-status.enum';
import { Issue } from '../../model/issue/issue.model';

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
  issueStatusOptions = issueStatusOptions.filter(option => option.code !== IssueStatus.ARCHIVE);

  /**
   * 頁面資料列表
   *
   * @type {Issue[]}
   * @memberof IssuesComponent
   */
  pageList: Issue[][] = [];

  /**
   * 當前頁碼
   *
   * @memberof IssuesComponent
   */
  currentPage = 1;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.queryIssues(IssueStatus.ALL);
  }

  /**
   * 查詢 議題 列表
   *
   * @param {IssueStatus} issueStatus
   * @memberof IssuesComponent
   */
  queryIssues(issueStatus: IssueStatus): void {

    this.currentIssuesStatus = issueStatus;
    this.currentPage = 1;
    this.pageList = [];

    this
      .api
      .getIssues(issueStatus)
      .subscribe((data) => {
        if (data.pages.length) {
          this.pageList = data.pages.map(issues => issues.map(issue => new Issue(issue)));
        }
      });

  }

  /**
   * 獲取當前議題列表
   *
   * @readonly
   * @type {Issue[]}
   * @memberof IssuesComponent
   */
  get issues(): Issue[] {
    return this.pageList[this.currentPage - 1];
  }

}
