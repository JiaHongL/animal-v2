import { TestBed, inject } from '@angular/core/testing';

// service
import { SessionStorageService, LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { StorageService } from './storage.service';

// enum
import { StorageType } from './storage-type.enum';

describe('StorageService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
      imports: [NgxWebstorageModule.forRoot()]
    });
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));

  describe('SessionStorage', () => {

    it('should be stored data', inject(
      [StorageService, SessionStorageService],
      (service: StorageService, sessionStorage: SessionStorageService) => {

        const spy = spyOn(sessionStorage, 'store');

        service.store('key', 'data', StorageType.SESSION);
        expect(spy).toHaveBeenCalled();

      }
    ));

    it('should be get data', inject(
      [StorageService, SessionStorageService],
      (service: StorageService, sessionStorage: SessionStorageService) => {

        const data = '{"data":"mock"}';
        const spy = spyOn(sessionStorage, 'retrieve').and.returnValue(data);

        service.getData('key', StorageType.SESSION);
        expect(spy).toHaveBeenCalled();
      }
    ));

    it('should be clean data', inject(
      [StorageService, SessionStorageService],
      (service: StorageService, sessionStorage: SessionStorageService) => {

        const spy = spyOn(sessionStorage, 'clear');

        service.clean(StorageType.SESSION);
        expect(spy).toHaveBeenCalled();

      }
    ));

  });

  describe('LocalStorage', () => {

    it('should be stored data', inject(
      [StorageService, LocalStorageService],
      (service: StorageService, localStorage: LocalStorageService) => {

        const spy = spyOn(localStorage, 'store');

        service.store('key', 'data', StorageType.LOCAL);
        expect(spy).toHaveBeenCalled();

      }
    ));

    it('should be get data', inject(
      [StorageService, LocalStorageService],
      (service: StorageService, localStorage: LocalStorageService) => {

        const data = '{"data":"mock"}';
        const spy = spyOn(localStorage, 'retrieve').and.returnValue(data);

        service.getData('key', StorageType.LOCAL);
        expect(spy).toHaveBeenCalled();

      }
    ));

    it('should be clean data', inject(
      [StorageService, LocalStorageService],
      (service: StorageService, localStorage: LocalStorageService) => {

        const spy = spyOn(localStorage, 'clear');

        service.clean(StorageType.LOCAL);
        expect(spy).toHaveBeenCalled();

      }
    ));

  });

});
