import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

// service
import { UserService } from './../../core/user/user.service';
import { ApiService } from './../../core/api/api.service';

// rxjs
import { Observable, of } from 'rxjs';
import { tap, take, map, mergeMap } from 'rxjs/operators';
import { appRoutePaths } from '../../constant/app-route-paths.const';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this
      .api
      .getLogInStatus()
      .pipe(
        take(1),
        mergeMap((user: firebase.User) => {

          // 未登入，則直接回傳 null
          if (!user) {
            return of(null);
          }

          // 若 LocalStorage 的 user 為空時，則 呼 getUserInfo 重新取得.
          if (
            !this.userService.user
          ) {

            return this
              .userService
              .getUserInfo(user.uid)
              .pipe(
                tap((res: any[]) => {
                  if (res.length) { this.userService.storeData(res[0]); }
                }),
                map((res) => !!res.length)
              );
          }

          return of(true);

        }),
        tap((isLoggedIn) => { if (!isLoggedIn) { this.router.navigate([appRoutePaths.authError.path]); } })
      );

  }

}
