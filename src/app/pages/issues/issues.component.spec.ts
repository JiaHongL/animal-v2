import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesComponent } from './issues.component';

import { ButtonGroupModule } from './button-group/button-group.module';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { of } from 'rxjs';
import { ApiService } from '../../core/api/api.service';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;
  let api: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssuesComponent],
      imports: [
        CoreModule,
        SharedModule,
        ButtonGroupModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    api = TestBed.get(ApiService);
    spyOn(api, 'getIssues').and.returnValue(of({
      total: 0,
      pages: []
    }));

    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
