import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// component
import { LoadingComponent } from './loading.component';

// service
import { LoadingService } from './loading.service';

// enum
import { LoadingType } from './enum/loading-type.enum';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      providers: [LoadingService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('show 與 selfLoadingType 應根據 loadingService 設置', () => {

    const loadingService = TestBed.get(LoadingService);

    expect(component.selfLoadingType).toEqual(LoadingType.RECT);

    loadingService.show(LoadingType.SPINNER);

    expect(component.show).toBeTruthy();
    expect(component.selfLoadingType).toEqual(LoadingType.SPINNER);

  });

});
