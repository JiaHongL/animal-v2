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

@Injectable()
export class UserService {

  constructor(
    private storage: StorageService,
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
   * 是否為管理員
   *
   * @returns {boolean}
   * @memberof UserService
   */
  isAdmin(): boolean {
    return this.user.role === Role.ADMIN;
  }

}
