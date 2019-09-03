import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreModule } from '../../core/core.module';

import { AnimalDetailResolver } from './animal-detail.resolver';

describe('GetApprovedCallInResolver', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      CoreModule
    ],
    providers: [AnimalDetailResolver]
  }));

  it('should be created', () => {
    const resolver: AnimalDetailResolver = TestBed.get(AnimalDetailResolver);
    expect(resolver).toBeTruthy();
  });

});
