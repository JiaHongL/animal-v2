import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { LayoutComponent } from './layout.component';

// module
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from './../core/core.module';

// const
import { appRoutePaths } from '../constant/app-route-paths.const';

// service
import { UserService } from '../core/user/user.service';

// rxjs
import { of } from 'rxjs';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FooterModule,
        HeaderModule,
        SharedModule,
        CoreModule
      ],
      declarations: [
        LayoutComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('signOut()，應該登出帳號，並導到首頁', () => {

    const userService = TestBed.get(UserService);
    const router = TestBed.get(Router);

    spyOn(userService, 'signOut').and.returnValue(of(''));

    const spyFunc = spyOn(router, 'navigate');

    component.signOut();

    const args = spyFunc.calls.first().args;

    expect(userService.signOut).toHaveBeenCalled();
    expect(args[0]).toEqual([appRoutePaths.home.path]);

  });

});
