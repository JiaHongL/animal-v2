import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreModule } from '../../core/core.module';

import { IssueDetailResolver } from './issue-detail.resolver';

describe('GetApprovedCallInResolver', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      CoreModule
    ],
    providers: [IssueDetailResolver]
  }));

  it('should be created', () => {
    const resolver: IssueDetailResolver = TestBed.get(IssueDetailResolver);
    expect(resolver).toBeTruthy();
  });

});
