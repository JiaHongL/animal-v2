import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../../../app-routing.module';

import { IssueTableComponent } from './issue-table.component';

import { CoreModule } from '../../../core/core.module';
import { DataTransformModule } from '../../pipes/data-transform/data-transform.module';

import { appRoutePaths } from '../../../constant/app-route-paths.const';

describe('IssueTableComponent', () => {
  let component: IssueTableComponent;
  let fixture: ComponentFixture<IssueTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        DataTransformModule,
        AppRoutingModule
      ],
      declarations: [IssueTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getItemIndex function 應該取得對應的項目號碼', () => {

    component.page = 1;
    expect(component.getItemIndex(0)).toBe(1);

    component.page = 2;
    expect(component.getItemIndex(7)).toBe(18);

  });

  it('openIssue function 應該另開新頁面到議題詳情頁', () => {

    const mockIssueId = 'a';

    const spyFunc = spyOn(window, 'open');

    component.openIssue(mockIssueId);

    const args = spyFunc.calls.first().args;

    const url = '#/' + appRoutePaths.issueDetail.path + '/' + mockIssueId;

    expect(spyFunc).toHaveBeenCalled();
    expect(args[0]).toEqual(url);

  });

});
