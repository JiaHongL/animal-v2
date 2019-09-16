import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';

// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  /**
   * http request / response 攔截器功能
   *
   * @param {HttpRequest<any>} req - 欲發送的 Http Request
   * @param {HttpHandler} next - 發送結束後會觸發的 Handler
   * @returns {Observable<HttpEvent<any>>}
   * @memberof AppInterceptor
   * @see https://angular.io/guide/http#http-interceptors
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modified = req.clone();

    return next
      .handle(modified)
      .pipe(
        tap((result) => {
          if (result instanceof HttpResponse) {
            // do response action
          }
        })
      );

  }

}
