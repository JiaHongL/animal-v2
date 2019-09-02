import { Injectable } from '@angular/core';

// service
import { NetworkingService } from '../networking/networking.service';

// environment
import { environment } from '../../../environments/environment';

// model
import { ServerResponse } from '../networking/model/server-response.model';
import { QueryParams } from './model/query-params.model';

// rxjs
import { Observable } from 'rxjs';
import { HttpMethodType } from '../networking/enum/http-method-type.enum';

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
    private networking: NetworkingService
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

}
