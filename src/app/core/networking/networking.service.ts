import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// enum
import { HttpMethodType } from './enum/http-method-type.enum';

// model
import { ServerResponse } from './model/server-response.model';

// rxjs
import { Observable, of } from 'rxjs';

@Injectable()
export class NetworkingService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 送出 API請求
   *
   * @param {HttpMethodType} type - 要用什麼樣的 HTTP Method
   * @param {string} url - API的路徑
   * @param {*} [params] - 所需的參數
   * @param {*} [options]- 所需的其它設定
   * @returns {Observable<ServerResponse>}
   * @memberof NetworkingService
   */
  sendRequest(
    type: HttpMethodType,
    url: string,
    params?: any,
    options?: any
  ): Observable<ServerResponse> {

    let observable: Observable<ServerResponse> = null;

    switch (type) {

      case HttpMethodType.GET:
        observable = this.get(url, params, options);
        break;

      case HttpMethodType.POST:
        observable = this.post(url, params, options);
        break;

      case HttpMethodType.PATCH:
        observable = this.patch(url, params, options);
        break;

      case HttpMethodType.DELETE:
        observable = this.delete(url, params, options);
        break;

      case HttpMethodType.PUT:
        observable = this.put(url, params, options);
        break;

      default:
        observable = of(new ServerResponse({
          success: false,
          result: null,
          errorMessage: 'Error HTTP Method'
        }));
        break;

    }

    return observable;

  }

  /**
   * 用 POST 的方式發出 HTTP Request
   *
   * @private
   * @param {string} url - API的路徑
   * @param {*} params - 所需的參數
   * @param {*} [option] - 其他設定
   * @returns {Observable<any>}
   * @memberof NetworkingService
   */
  private post(url: string, params: any, option?: any): Observable<any> {
    return this.http.post(url, params, option);
  }

  /**
   * 用 Get 的方式發出 HTTP Request
   *
   * @private
   * @param {string} url - API的路徑
   * @param {*} [params] - 所需的參數
   * @param {*} [options] - 其他設定
   * @returns {Observable<any>}
   * @memberof NetworkingService
   */
  private get(url: string, params?: any, options?: any): Observable<any> {

    const margeOptions = {};
    const httpParams: any = {};

    httpParams.params = params || {};

    Object.assign(margeOptions, httpParams, options);

    return this.http.get(url, margeOptions);

  }

  /**
   * 用 PATCH 的方式發出 HTTP Request
   *
   * @private
   * @param {string} url - API的路徑
   * @param {*} params - 所需的參數
   * @param {*} [option] - 其他設定
   * @returns {Observable<any>}
   * @memberof NetworkingService
   */
  private patch(url: string, params: any, option?: any): Observable<any> {
    return this.http.patch(url, params, option);
  }

  /**
   * 用 Delete 的方式發出 HTTP Request
   *
   * @private
   * @param {string} url - API的路徑
   * @param {*} [params] - 所需的參數
   * @param {*} [options] - 其他設定
   * @returns {Observable<any>}
   * @memberof NetworkingService
   */
  private delete(url: string, params?: any, options?: any): Observable<any> {

    const margeOptions = {};
    const httpParams: any = {};

    httpParams.params = params || {};

    Object.assign(margeOptions, httpParams, options);

    return this.http.delete(url, options);

  }

  /**
   * 用 PUT 的方式發出 HTTP Request
   *
   * @private
   * @param {string} url - API的路徑
   * @param {*} params - 所需的參數
   * @param {*} [option] - 其他設定
   * @returns {Observable<any>}
   * @memberof NetworkingService
   */
  private put(url: string, params?: any, option?: any): Observable<any> {
    return this.http.put(url, params, option);
  }

}
