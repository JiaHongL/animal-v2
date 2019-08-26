import { TestBed, inject } from '@angular/core/testing';

// service
import { LoadingService } from './loading.service';

// const
import { defaultName } from './const/default-name.const';
import { defaultLoadingType } from './const/default-loading-type.const';

// enum
import { LoadingType } from './enum/loading-type.enum';

// rxjs
import { of } from 'rxjs';

describe('LoadingService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
  });

  it('should be created', inject([LoadingService], (service: LoadingService) => {
    expect(service).toBeTruthy();
  }));

  it('getLoading function 應該被呼叫', inject([LoadingService], (service: LoadingService) => {

    const spyFunc = spyOn(service, 'getLoading').and.returnValue(of());

    service.getLoading('mock');

    const args = spyFunc.calls.first().args;

    expect(args[0]).toEqual('mock');
    expect(spyFunc).toHaveBeenCalled();

  }));

  it('show function 應該被呼叫 且 使用預設值', inject([LoadingService], (service: LoadingService) => {

    const mock = {
      name: defaultName,
      loadingType: defaultLoadingType,
      show: true
    };

    const spyFunc = spyOn(service, 'show').and.callThrough();
    const spySubject = spyOn(service['loadingObservable'], 'next');

    service.show();

    const args = spySubject.calls.first().args;

    expect(spyFunc).toHaveBeenCalled();
    expect(args[0]).toEqual(mock);

  }));

  it('show function 應該被呼叫 且 使用帶入的參數', inject([LoadingService], (service: LoadingService) => {

    const mock = {
      name: defaultName,
      loadingType: LoadingType.ROLLER,
      show: true
    };

    const spyFunc = spyOn(service, 'show').and.callThrough();
    const spySubject = spyOn(service['loadingObservable'], 'next');

    service.show({ loadingType: mock.loadingType });

    const args = spySubject.calls.first().args;

    expect(spyFunc).toHaveBeenCalled();
    expect(args[0]).toEqual(mock);

  }));

  it('hide function 應該被呼叫 且 使用預設值', inject([LoadingService], (service: LoadingService) => {

    const mock = {
      name: defaultName,
      show: false
    };

    const spyFunc = spyOn(service, 'hide').and.callThrough();
    const spySubject = spyOn(service['loadingObservable'], 'next');

    service.hide();

    const args = spySubject.calls.first().args;

    expect(spyFunc).toHaveBeenCalled();
    expect(args[0]).toEqual(mock);

  }));

  it('hide function 應該被呼叫 且 使用帶入的參數', inject([LoadingService], (service: LoadingService) => {

    const mock = {
      name: 'mockName',
      show: false
    };

    const spyFunc = spyOn(service, 'hide').and.callThrough();
    const spySubject = spyOn(service['loadingObservable'], 'next');

    service.hide(mock.name);

    const args = spySubject.calls.first().args;

    expect(spyFunc).toHaveBeenCalled();
    expect(args[0]).toEqual(mock);

  }));


});
