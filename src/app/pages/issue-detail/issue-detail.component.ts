import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostBinding } from '@angular/core';

// component
import { RemarkModalComponent } from './remark-modal/remark-modal.component';

// enum
import { IssueStatus } from '../../enum/issue-status.enum';
import { SelectType } from './../../core/selects/enum/select-type.enum';

// class
import { Issue } from '../../model/issue/issue.model';

// service
import { ModalService } from '../../shared/components/modal/modal.service';
import { ModalConfig } from '../../shared/components/modal/modal-config';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {

  /**
   * class 綁定
   *
   * @memberof IssueDetailComponent
   */
  @HostBinding('class') class = 'no-touch';

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
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {
    this.issue = this.route.snapshot.data.issue;
  }

  ngOnInit() {
  }

  /**
   * 開啟備註 modal
   *
   * @param {string} remark - 備註
   * @memberof IssueDetailComponent
   */
  openRemarkModal(remark: string): void {

    const data: any = {};
    data.remark = remark;

    const config: ModalConfig = {};
    config.minHeight = '250px';
    config.minWidth = '350px';
    config.data = data;

    this.modalService.open(RemarkModalComponent, config);

  }

}
