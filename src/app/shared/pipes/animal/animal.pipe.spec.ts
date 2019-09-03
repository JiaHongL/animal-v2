import { TestBed } from '@angular/core/testing';

import { AnimalPipe } from './animal.pipe';

import { CoreModule } from '../../../core/core.module';

import { SelectsService } from '../../../core/selects/selects.service';

describe('AnimalPipe', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [CoreModule]
  }));

  it('create an instance', () => {

    const selectsService: SelectsService = TestBed.get(SelectsService);
    const pipe = new AnimalPipe(selectsService);

    expect(pipe).toBeTruthy();

  });

});
