import { TestBed } from '@angular/core/testing';

import { DataTransformPipe } from './data-transform.pipe';

import { CoreModule } from '../../../core/core.module';

import { SelectsService } from '../../../core/selects/selects.service';

describe('DataTransformPipe', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [CoreModule]
  }));

  it('create an instance', () => {

    const selectsService: SelectsService = TestBed.get(SelectsService);
    const pipe = new DataTransformPipe(selectsService);

    expect(pipe).toBeTruthy();

  });

});
