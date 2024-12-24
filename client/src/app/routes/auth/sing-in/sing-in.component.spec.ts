import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SingInComponent} from './sing-in.component';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {getFakeToken, getFakeUser} from '../../../testing/factories';
import {ReactiveFormsModule} from '@angular/forms';
import {of, throwError} from 'rxjs';

describe('SingInComponent', () => {
  let component: SingInComponent;
  let fixture: ComponentFixture<SingInComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['signIn']);
    const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: AuthService,
          useValue: authSpy
        },
        {
          provide: Router,
          useValue: routerMock,
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SingInComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });


  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.signIn while send form with correct data', () => {
    const user = getFakeUser();
    const token = getFakeToken();
    component.logInForm.setValue(
      {
        username: user.username,
        password: 'pAssw0rd!',
      }
    );

    authServiceSpy.signIn.and.returnValue(of(token));

    component.onSubmit();

    expect(authServiceSpy.signIn).toHaveBeenCalledOnceWith(user.username, 'pAssw0rd!');
  });

  it('should redirect to home after login', () => {
    const user = getFakeUser();
    const token = getFakeToken();

    component.logInForm.setValue({
      username: user.username,
      password: 'pAssw0rd!',
    });
    authServiceSpy.signIn.and.returnValue(of(token));
    component.onSubmit();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('');
  });

  it('should throw error while failed attempt', () => {
    const user = getFakeUser();
    const token = getFakeToken();

    const errorResponse = {message: 'Error log in'};
    authServiceSpy.signIn.and.returnValue(throwError(() => errorResponse));

    spyOn(console, 'error');
    component.onSubmit();
    expect(console.error).toHaveBeenCalledOnceWith(errorResponse);
  });
});
