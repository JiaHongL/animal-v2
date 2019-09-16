import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// class
import { Issue } from '../../model/issue/issue.model';

// service
import { ApiService } from '../../core/api/api.service';
import { LoadingService } from '../../core/loading/loading.service';

// rxjs
import { finalize, map } from 'rxjs/operators';
import { LoadingType } from '../../core/loading/enum/loading-type.enum';

/**
 * 獲取 議題資料 的 resolve
 *
 * @export
 * @class IssueDetailResolver
 * @implements {Resolve<any>}
 */
@Injectable()
export class IssueDetailResolver implements Resolve<Issue> {

  constructor(
    private loading: LoadingService,
    private api: ApiService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {

    this.loading.show(LoadingType.ROLLER);

    const issueId = route.params.id;

    return this
      .api
      .getIssueDetail(issueId)
      .pipe(
        finalize(() => this.loading.hide()),
        map((res) => {
          return new Issue(res[0]);
        })
      );

  }

}
