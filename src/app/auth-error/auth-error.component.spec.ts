import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthErrorComponent } from './auth-error.component';

import { appRoutePaths } from '../constant/app-route-paths.const';

describe('AuthErrorComponent', () => {
  let component: AuthErrorComponent;
  let fixture: ComponentFixture<AuthErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthErrorComponent],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit後，應該開始倒數三秒，然後轉頁到登入頁', fakeAsync(() => {

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.ngOnInit();

    // 快轉 1s
    tick(1000);

    expect(component.sec).toBe(2);

    // 快轉 1s
    tick(1000);

    expect(component.sec).toBe(1);

    // 快轉 1s
    tick(1000);

    const args = spy.calls.first().args;

    expect(component.sec).toBe(0);
    expect(args[0]).toEqual([appRoutePaths.adLogin.path]);

  }));

});
