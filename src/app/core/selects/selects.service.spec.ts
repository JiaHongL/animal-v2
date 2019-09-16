import { TestBed } from '@angular/core/testing';

// module
import { CoreModule } from '../core.module';

// service
import { SelectsService } from './selects.service';

describe('SelectsService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [CoreModule]
  }));

  it('should be created', () => {
    const service: SelectsService = TestBed.get(SelectsService);
    expect(service).toBeTruthy();
  });

});
