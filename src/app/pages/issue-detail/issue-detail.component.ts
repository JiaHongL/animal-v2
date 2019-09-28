import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';

// component
import { RemarkModalComponent } from './remark-modal/remark-modal.component';
import { AddHistoryModalComponent } from './add-history-modal/add-history-modal.component';

// enum
import { IssueStatus } from '../../enum/issue-status.enum';
import { SelectType } from './../../core/selects/enum/select-type.enum';

// class
import { Issue } from '../../model/issue/issue.model';
import { History } from '../../model/history/history.model';

// const
import { appRoutePaths } from '../../constant/app-route-paths.const';

// modal
import { ModalService } from '../../shared/components/modal/modal.service';
import { ModalConfig } from '../../shared/components/modal/modal-config';

// service
import { ApiService } from './../../core/api/api.service';
import { UserService } from './../../core/user/user.service';
import { UtilityService } from './../../core/utility/utility.service';
import { LoadingService } from './../../core/loading/loading.service';

// rxjs
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoadingType } from '../../core/loading/enum/loading-type.enum';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit, OnDestroy {

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
   * 下拉的類型 enum
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

  /**
   * router 的 subscription
   *
   * @memberof FeedbackComponent
   */
  subscription: Subscription = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService,
    private userService: UserService,
    private api: ApiService,
    private utility: UtilityService,
    private loading: LoadingService
  ) {}

  ngOnInit() {

    this.issue = this.route.snapshot.data.issue;

    this.subscription = this
      .router
      .events
      .pipe(
        filter((event => event instanceof NavigationEnd))
      )
      .subscribe(_ => {
        this.issue = this.route.snapshot.data.issue;
      });
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

  /**
   * 開啟新增歷程 modal
   *
   * @memberof IssueDetailComponent
   */
  openAddHistoryModal(): void {

    const data: any = {};

    data.userName = this.userService.user.name;
    data.isAdmin = this.userService.isAdmin;

    const config: ModalConfig = {};

    config.minHeight = '400px';
    config.minWidth = '350px';
    config.mobileFullScreen = true;
    config.data = data;

    this
      .modalService
      .open(AddHistoryModalComponent, config)
      .afterClosed()
      .subscribe((history: History) => {

        if (!history) {
          return;
        }

        this.loading.show(LoadingType.SPINNER);

        const issue: Issue = this.utility.deepCopy((this.issue));

        issue.status = history.status;
        issue.history.push(history);

        this
          .api
          .updateIssue(issue)
          .subscribe(_ => {
            this.loading.hide();
            this.router.navigate([appRoutePaths.issueDetail.path, issue.id]);
          });

      });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
