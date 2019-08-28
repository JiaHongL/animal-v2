import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

// component
import { LoadingComponent } from './loading.component';

// service
import { LoadingService } from './loading.service';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let loadingComp;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      providers: [LoadingService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    loadingComp = fixture.componentInstance;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
