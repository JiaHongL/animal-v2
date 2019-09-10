import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthErrorComponent } from './auth-error.component';


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
});
