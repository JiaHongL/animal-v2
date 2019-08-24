import { TestBed } from '@angular/core/testing';

// module
import { CoreModule } from '../core.module';

// service
import { ApiService } from './api.service';

describe('ApiService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [CoreModule]
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

});
