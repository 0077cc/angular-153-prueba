import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserOption, IUser } from 'src/main/models/IUser.model';
import { AuthService } from 'src/providers/services/auth.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html'
})
export class LoginFormComponent implements OnInit {

  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('userSelect') userSelect: ElementRef;

  form: FormGroup;
  options: Array<IUserOption>;
  userSelected: IUserOption;

  authServiceSub: Subscription;
  minLength: number;
  maxLength: number;
  showLogin: boolean;
  isLogin: boolean;
  textError: string;

  user: AbstractControl;
  password: AbstractControl;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.minLength = 8;
    this.maxLength = 16;
  }

  ngOnInit() {
    this.options = [];
    this.loadUsers();
    this.initForm();
  }

  loadUsers(): void {
    this.showLogin = true;
    this.authServiceSub = this.authService.getUserList()
      .subscribe((response: Array<IUser>) => {
        response = response || [];
        this.options = response.map(user => ({
          id: user.id,
          dni: user.dni,
          user: `${user.name} ${user.lastname}`
        } as IUserOption));
      },
        () => { this.showLogin = false; },
        () => { this.authServiceSub.unsubscribe(); }
      );
  }

  initForm(): void {
    this.createForm();
    this.onChanges();
  }

  createForm(): void {
    this.form = this.fb.group({
      user: [null, Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(this.minLength),
        Validators.maxLength(this.maxLength)]]
    });
    this.user = this.form.controls['user'];
    this.password = this.form.controls['password'];
  }

  onChanges(): void {
    this.user.valueChanges
      .subscribe((user: IUserOption) => {
        this.userSelected = user;
        delete this.textError;
      });
  }

  onKeydown(event: any): void {
    delete this.textError;
    if (event.key === 'Enter') {
      this.passwordInput.nativeElement.blur();
      this.validForm();
    }
  }

  validForm(): void {
    if (!this.form.valid) {
      if (this.form.controls['user'].errors) {
        this.textError = 'Mx&nbsp;user';
        return;
      }
      if (this.form.controls['user'].errors) {
        this.textError = 'Mx&nbsp;user';
        return;
      }
      if (this.form.controls['password'].errors) {
        const errors: any = this.form.controls['password'].errors;
        if (errors.required) {
          this.textError = 'Password';
        }
        if (errors.minlength) {
          this.textError = 'At&nbsp;least&nbsp;8&nbsp;characters';
        }
        this.passwordInput.nativeElement.focus();
      }
    } else {
      delete this.textError;
      this.doLogin();
    }
  }

  doLogin(): void {
    this.isLogin = true;
    setTimeout(() => {
      if (this.userSelected.dni.toString() === this.password.value) {
        delete this.textError;
        this.authService.setUser(this.userSelected);
        this.router.navigate(['home']);
      } else {
        this.isLogin = false;
        this.textError = 'Wrong&nbsp;password';
      }
    }, 500);
  }

}
