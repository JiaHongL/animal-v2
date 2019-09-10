import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { formatDate } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';

// environment
import { environment } from '../../../environments/environment';

// service
import { NetworkingService } from '../networking/networking.service';

// enum
import { HttpMethodType } from '../networking/enum/http-method-type.enum';

// model
import { ServerResponse } from '../networking/model/server-response.model';
import { QueryParams } from './model/query-params.model';
import { Issue } from '../../model/issue/issue.model';

// rxjs
import { Observable, from } from 'rxjs';
import { mergeMap, take, map } from 'rxjs/operators';

@Injectable()
export class ApiService {

  /**
   * Base URL
   *
   * @private
   * @memberof ApiService
   */
  private readonly baseUrl = environment.api.path;

  constructor(
    private networking: NetworkingService,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  /**
   * 取得各式選項清單
   *
   * @param {string} type - 選項類型
   * @memberof ApiService
   */
  getSelects(type: string): Observable<ServerResponse> {

    return this
      .networking
      .sendRequest(
        HttpMethodType.GET,
        `${this.baseUrl}/${type}`
      );

  }

  /**
   * 取得寵物列表資料
   *
   * @param {number} page - 頁碼
   * @param {QueryParams} params - 查詢參數
   * @returns {Observable<ServerResponse>}
   * @memberof ApiService
   */
  getAnimals(page: number, params?: Partial<QueryParams>): Observable<ServerResponse> {

    const queryParams = new QueryParams(page, params);

    return this.networking.sendRequest(
      HttpMethodType.GET,
      `${this.baseUrl}/animals`,
      queryParams
    );

  }

  /**
   * 獲取動物詳細資料
   *
   * @param {string} animalId - 動物流水編號
   * @returns {Observable<ServerResponse>}
   * @memberof ApiService
   */
  getAnimalDetail(animalId: string): Observable<ServerResponse> {

    const queryParams: any = {};

    queryParams.animal_id = animalId;

    return this.networking.sendRequest(
      HttpMethodType.GET,
      `${this.baseUrl}/animals`,
      queryParams
    );

  }

  postFeedback(issue: Issue): Observable<any> {

    return this
      .afs
      .collection('issues')
      .get()
      .pipe(
        mergeMap((collection) => {

          const serialNumber = (collection.size + 1).toString().padStart(4, '0');

          issue.id = formatDate(issue.createTime, 'yyyyMMdd', this.locale) + serialNumber;

          return this.afs.collection('issues').doc(issue.id).set(issue);

        })
      );
  }

  /**
   * 使用者登入
   *
   * @param {string} email - 電子信箱
   * @param {string} password - 密碼
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  /**
   * 獲取使用者資訊
   *
   * @param {string} uid - uid
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  getUserInfo(uid: string): Observable<any> {

    return this
      .afs
      .collection('users', ref => {

        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

        query = query.where('uid', '==', uid);

        return query;

      })
      .valueChanges()
      .pipe(
        take(1)
      );

  }

  /**
   * 登出
   *
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  signOut(): Observable<any> {
    return from(this.afAuth.auth.signOut());
  }

  /**
   *  取得登入狀態
   *
   * @returns {Observable<any>}
   * @memberof UserService
   */
  getLogInStatus(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

}
