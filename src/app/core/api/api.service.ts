import { Injectable } from '@angular/core';

// environment
import { environment } from '../../../environments/environment';

// service
import { NetworkingService } from '../networking/networking.service';
import { StorageService } from './../storage/storage.service';

// enum
import { HttpMethodType } from '../networking/enum/http-method-type.enum';

// model
import { ServerResponse } from '../networking/model/server-response.model';
import { QueryParams } from './model/query-params.model';

// rxjs
import { Observable } from 'rxjs';

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

}
