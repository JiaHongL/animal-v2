import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveComponent } from './archive.component';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { ApiService } from '../../core/api/api.service';
import { of } from 'rxjs';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;
  let api: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveComponent],
      imports: [
        CoreModule,
        SharedModule,
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

    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
