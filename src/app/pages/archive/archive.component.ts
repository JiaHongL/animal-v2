import { Component, OnInit } from '@angular/core';

// enum
import { IssueStatus } from '../../enum/issue-status.enum';

// class
import { Issue } from '../../model/issue/issue.model';

// service
import { ApiService } from '../../core/api/api.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  /**
   * 當前議題狀態
   *
   * @memberof ArchiveComponent
   */
  currentIssuesStatus = IssueStatus.ALL;

  /**
   * 頁面資料列表
   *
   * @type {Issue[]}
   * @memberof ArchiveComponent
   */
  pageList: Issue[][] = [];

  /**
   * 當前頁碼
   *
   * @memberof ArchiveComponent
   */
  currentPage = 1;

  /**
   * 資料總筆數
   *
   * @memberof ArchiveComponent
   */
  total = 0;

  /**
   * 每頁幾筆
   *
   * @memberof ArchiveComponent
   */
  itemsPerPage = 10;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.queryIssues(IssueStatus.ARCHIVE);
  }

  /**
   * 查詢 議題 列表
   *
   * @param {IssueStatus} issueStatus
   * @memberof ArchiveComponent
   */
  queryIssues(issueStatus: IssueStatus): void {

    this.currentIssuesStatus = issueStatus;
    this.currentPage = 1;
    this.pageList = [];
    this.total = 0;

    this
      .api
      .getIssues(issueStatus)
      .subscribe((data) => {

        if (data.pages.length) {
          this.total = data.total;
          this.pageList = data.pages.map(issues => issues.map(issue => new Issue(issue)));
        }

      });

  }

  /**
   * 設定頁碼
   *
   * @memberof ArchiveComponent
   */
  setCurrentPage(page: number): void {
    this.currentPage = page;
  }

  /**
   * 獲取當前議題列表
   *
   * @readonly
   * @type {Issue[]}
   * @memberof ArchiveComponent
   */
  get issues(): Issue[] {
    return this.pageList[this.currentPage - 1];
  }


}
