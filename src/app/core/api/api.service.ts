import { Injectable } from '@angular/core';

// service
import { NetworkingService } from '../networking/networking.service';

// environment
import { environment } from '../../../environments/environment';

// model
import { ServerResponse } from '../networking/model/server-response.model';

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
    private networking: NetworkingService,
  ) { }

  /**
   * 取得各式選項清單
   *
   * @param {string} type 選項類型
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

}
