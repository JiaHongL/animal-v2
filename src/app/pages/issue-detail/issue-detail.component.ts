import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { IssueStatus } from '../../enum/issue-status.enum';
import { SelectType } from './../../core/selects/enum/select-type.enum';

import { Issue } from '../../model/issue/issue.model';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {

  /**
   * 議題資料
   *
   * @type {Issue}
   * @memberof IssueDetailComponent
   */
  issue: Issue = null;

  /**
   * 夏拉的類型 enum
   *
   * @memberof IssueDetailComponent
   */
  selectType = SelectType;

  /**
   * 議題的狀態 enum
   *
   * @memberof IssueDetailComponent
   */
  issueStatus = IssueStatus;

  constructor(
    private route: ActivatedRoute
  ) {
    this.issue = this.route.snapshot.data.issue;
  }

  ngOnInit() {
  }

}
