import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// module
import { CoreModule } from './../../core/core.module';

// component
import { HomeComponent } from './home.component';

// service
import { ApiService } from './../../core/api/api.service';

// rxjs
import { of } from 'rxjs/internal/observable/of';

describe('HomeComponent', () => {

  let apiService: ApiService;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule
      ],
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    apiService = TestBed.get(ApiService);

    spyOn(apiService, 'getAnimals')
      .and
      .returnValue(of({
        success: true,
        result: [],
        errorMessage: null
      }));

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
