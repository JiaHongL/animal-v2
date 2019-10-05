import { TestBed, inject } from '@angular/core/testing';

// service
import { UserService } from './user.service';
import { StorageService } from '../storage/storage.service';

// model
import { User } from './user.model';

// enum
import { StorageType } from '../storage/storage-type.enum';

// const
import { storageKeys } from '../storage/storage-key.const';

// module
import { CoreModule } from '../core.module';

describe('UserService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [CoreModule]
    });
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should be get user', inject([UserService, StorageService], (service: UserService, storage: StorageService) => {

    spyOn(storage, 'getData')
      .and
      .returnValue('{\"uid\":\"a\",\"name\":\"b\",\"role\":\"c\",\"email\":\"d\"}');

    expect(service.user).toBeTruthy();

  }));

  it('should be get null', inject([UserService, StorageService], (service: UserService, storage: StorageService) => {

    spyOn(storage, 'getData')
      .and
      .returnValue(null);

    expect(service.user).toBeNull();

  }));

  it('should be storeData', inject([UserService, StorageService], (service: UserService, storage: StorageService) => {

    const mockData = new User({
      uid: 'a',
      name: 'b',
      role: 'c',
      email: 'd'
    });

    const spy = spyOn(storage, 'store');

    service.storeData(mockData);

    const args = spy.calls.first().args;

    expect(args[0]).toEqual(storageKeys.user);
    expect(args[1]).toEqual(mockData);
    expect(args[2]).toEqual(StorageType.LOCAL);

  }));

  it('should be clean Data', inject([UserService, StorageService], (service: UserService, storage: StorageService) => {

    const spy = spyOn(storage, 'clean');

    service.cleanUserInfo();

    const args = spy.calls.first().args;

    expect(args[0]).toEqual(StorageType.LOCAL);
    expect(args[1]).toEqual(storageKeys.user);

  }));

});
