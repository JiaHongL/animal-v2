import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../../../app-routing.module';

import { IssueTableComponent } from './issue-table.component';

import { CoreModule } from '../../../core/core.module';
import { DataTransformModule } from '../../pipes/data-transform/data-transform.module';

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
});
