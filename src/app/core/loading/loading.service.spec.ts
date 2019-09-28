import { TestBed, inject } from '@angular/core/testing';

// service
import { LoadingService } from './loading.service';

// const
import { defaultLoadingType } from './const/default-loading-type.const';

// enum
import { LoadingType } from './enum/loading-type.enum';

describe('LoadingService', () => {

  const loadingObsKey = 'loadingObservable';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
  });

  it('should be created', inject([LoadingService], (service: LoadingService) => {
    expect(service).toBeTruthy();
  }));

  it('valueChanges 應該得到 loading subject obs', inject([LoadingService], (service: LoadingService) => {
    expect(service.valueChanges).toEqual(service[loadingObsKey].asObservable());
  }));

  it('show function 應該被呼叫 且 使用預設值', inject([LoadingService], (service: LoadingService) => {

    const mock = {
      loadingType: defaultLoadingType,
      show: true
    };

    const spyFunc = spyOn(service, 'show').and.callThrough();
    const spySubject = spyOn(service[loadingObsKey], 'next');

    service.show();

    const args = spySubject.calls.first().args;

    expect(spyFunc).toHaveBeenCalled();
    expect(args[0]).toEqual(mock);

  }));

  it('show function 應該被呼叫 且 使用帶入的參數', inject([LoadingService], (service: LoadingService) => {

    const mock = {
      loadingType: LoadingType.ROLLER,
      show: true
    };

    const spyFunc = spyOn(service, 'show').and.callThrough();
    const spySubject = spyOn(service[loadingObsKey], 'next');

    service.show(mock.loadingType);

    const args = spySubject.calls.first().args;

    expect(spyFunc).toHaveBeenCalled();
    expect(args[0]).toEqual(mock);

  }));

  it('hide function 應該被呼叫 且 使用預設值', inject([LoadingService], (service: LoadingService) => {

    const mock = {
      show: false
    };

    const spyFunc = spyOn(service, 'hide').and.callThrough();
    const spySubject = spyOn(service[loadingObsKey], 'next');

    service.hide();

    const args = spySubject.calls.first().args;

    expect(spyFunc).toHaveBeenCalled();
    expect(args[0]).toEqual(mock);

  }));


});
