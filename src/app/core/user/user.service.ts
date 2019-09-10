import { Injectable } from '@angular/core';

// const
import { storageKeys } from '../storage/storage-key.const';

// model
import { User } from './user.model';

// enum
import { StorageType } from '../storage/storage-type.enum';
import { Role } from '../../enum/role.enum';

// service
import { StorageService } from '../storage/storage.service';
import { ApiService } from './../api/api.service';

// rxjs
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(
    private storage: StorageService,
    private api: ApiService
  ) { }

  /**
   * 取得使用者資料
   *
   * @readonly
   * @type {User}
   * @memberof UserService
   */
  get user(): User {

    const data = this.storage.getData(storageKeys.user, StorageType.LOCAL);

    return data ? new User(data) : null;

  }

  /**
   * 儲存使用者資料
   *
   * @param {User} user - 使用者資料
   * @memberof UserService
   */
  storeData(user: User): void {
    this.storage.store(storageKeys.user, user, StorageType.LOCAL);
  }

  /**
   * 清除使用者資料
   *
   * @memberof UserService
   */
  cleanUserInfo(): void {
    this.storage.clean(StorageType.LOCAL, storageKeys.user);
  }

  /**
   * 是否為管理員登入
   *
   * @returns {boolean}
   * @memberof UserService
   */
  get isAdmin(): boolean {
    return this.user && this.user.role === Role.ADMIN;
  }

  /**
   * 登入帳號
   *
   * @param {string} email
   * @param {string} password
   * @returns {Observable<any>}
   * @memberof UserService
   */
  login(email: string, password: string): Observable<any> {
    return this.api.login(email, password);
  }

  /**
   * 獲取使用者資訊
   *
   * @param {string} uid - uid
   * @returns {Observable<any>}
   * @memberof UserService
   */
  getUserInfo(uid: string): Observable<any> {
    return this.api.getUserInfo(uid);
  }

  /**
   * 是否已登入
   *
   * @returns {Observable<boolean>}
   * @memberof UserService
   */
  get isLoggedIn(): boolean {
    return !!this.user && !!this.user.uid;
  }

  /**
   * 登出
   *
   * @memberof UserService
   */
  signOut(): Observable<any> {

    return this
      .api
      .signOut()
      .pipe(
        tap((_) => {
          this.cleanUserInfo();
        })
      );

  }

}
