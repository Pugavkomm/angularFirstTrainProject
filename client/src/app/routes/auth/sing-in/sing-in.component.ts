import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {TrimTextDirective} from '../../../shared/directives/trim-text.directive';
import {NowhitespacesTextDirective} from '../../../shared/directives/nowhitespaces-text.directive';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-sing-in',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    NgIf,
    TrimTextDirective,
    NowhitespacesTextDirective,
  ],
  providers: [],
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.css'
})
export class SingInComponent {
  errorMessage?: string;

  constructor(private authService: AuthService, private router: Router) {
  }


  logInForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.minLength(4), Validators.maxLength(20), Validators.required,]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  get username(): AbstractControl<any, any> | null {
    return this.logInForm.get('username');
  }

  get password(): AbstractControl<any, any> | null {
    return this.logInForm.get('password');
  }

  onSubmit() {
    console.info(this.logInForm.value);
    this.authService.signIn(this.username?.value, this.password?.value).subscribe(
      {
        complete: () => this.router.navigateByUrl(''),
        error: (error) => {
          this.errorMessage = JSON.stringify(error?.statusText);
          console.error(error);
        },
      }
    )
  }

}
