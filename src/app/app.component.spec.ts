import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SelectsService } from './core/selects/selects.service';

describe('AppComponent', () => {

  let selectsService: SelectsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {

    selectsService = TestBed.get(SelectsService);
    spyOn(selectsService, 'getAllSelects').and.callFake(() => { });

  });

  it('should create the app', () => {

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

  });

});
