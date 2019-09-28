import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// module
import { CoreModule } from '../core.module';

// enum
import { HttpMethodType } from './enum/http-method-type.enum';

// model
import { ServerResponse } from './model/server-response.model';

// service
import { NetworkingService } from './networking.service';

// rxjs
import { of } from 'rxjs';

describe('NetworkingService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkingService],
      imports: [
        CoreModule,
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([NetworkingService], (service: NetworkingService) => {
    expect(service).toBeTruthy();
  }));

  it('should be send request in GET', inject(
    [NetworkingService, HttpClient],
    (service: NetworkingService, http: HttpClient) => {

      const spy = spyOn(http, 'get').and.returnValue(of());

      service.sendRequest(
        HttpMethodType.GET, '123', {
        a: 'value'
      });

      expect(spy).toHaveBeenCalled();

    }
  ));

  it('should be send request in POST', inject(
    [NetworkingService, HttpClient],
    (service: NetworkingService, http: HttpClient) => {

      const spy = spyOn(http, 'post').and.returnValue(of());
      service.sendRequest(HttpMethodType.POST, '');

      expect(spy).toHaveBeenCalled();

    }
  ));

  it('should be send request in PATCH', inject(
    [NetworkingService, HttpClient],
    (service: NetworkingService, http: HttpClient) => {

      const spy = spyOn(http, 'patch').and.returnValue(of());
      service.sendRequest(HttpMethodType.PATCH, '');

      expect(spy).toHaveBeenCalled();

    }
  ));

  it('should be send request in DELETE', inject(
    [NetworkingService, HttpClient],
    (service: NetworkingService, http: HttpClient) => {

      const spy = spyOn(http, 'delete').and.returnValue(of());
      service.sendRequest(HttpMethodType.DELETE, '');

      expect(spy).toHaveBeenCalled();

    }
  ));

  it('should be send request in PUT', inject(
    [NetworkingService, HttpClient],
    (service: NetworkingService, http: HttpClient) => {

      const spy = spyOn(http, 'put').and.returnValue(of());
      service.sendRequest(HttpMethodType.PUT, '');

      expect(spy).toHaveBeenCalled();

    }
  ));

  it('should be get error', inject([NetworkingService], (service: NetworkingService) => {

    service
      .sendRequest(999, '')
      .subscribe((response) => {
        expect(response instanceof ServerResponse).toBeTruthy();
      });

  }

  ));

});
