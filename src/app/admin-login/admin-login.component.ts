import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// service
import { UserService } from './../core/user/user.service';
import { LoadingService } from './../core/loading/loading.service';
import { MessageService } from '../core/message/message.service';

// const
import { adminLoginFormKeys } from '../constant/form-keys/admin-login-form-keys.const';
import { errorCode } from '../constant/error-code.const';
import { alertMessage } from '../constant/alert-message.const';
import { appRoutePaths } from '../constant/app-route-paths.const';

// enum
import { LoadingType } from '../core/loading/enum/loading-type.enum';

// rxjs
import { mergeMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  /**
   * 登入表單
   *
   * @type {FormGroup}
   * @memberof AdminLoginComponent
   */
  form: FormGroup;

  /**
   * 登入表單 key 值
   *
   * @memberof AdminLoginComponent
   */
  formKeys = adminLoginFormKeys;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private loading: LoadingService,
    private message: MessageService
  ) {

    this.form = this.fb.group({
      [this.formKeys.email]: ['', [Validators.required, Validators.email]],
      [this.formKeys.password]: ['', Validators.required],
    });

  }

  /**
   * 是否有驗證未通過
   *
   * @param {string} key - 表單key
   * @returns {boolean}
   * @memberof AdminLoginComponent
   */
  hasError(key: string): boolean {
    return this.form.get(key).touched && this.form.get(key).invalid;
  }

  /**
   * 登入
   *
   * @memberof AdminLoginComponent
   */
  login(): void {

    const email = this.form.get(this.formKeys.email).value;
    const password = this.form.get(this.formKeys.password).value;

    this.loading.show(LoadingType.SPINNER);

    this
      .userService
      .login(email, password)
      .pipe(
        mergeMap((res) => {

          return this
            .userService
            .getUserInfo(res.user.uid)
            .pipe(
              finalize(() => {
                this.loading.hide();
              })
            );

        })
      )
      .subscribe(res => {

        this.userService.storeData(res[0]);
        this.router.navigate([appRoutePaths.issues.path]);

      }, (error) => {

        this.loading.hide();

        let errorMessage = '';

        switch (error.code) {

          case errorCode.userNotFound:
            errorMessage = alertMessage.userNotFound;
            break;

          case errorCode.wrongPassword:
            errorMessage = alertMessage.wrongPassword;
            break;

          default:
            errorMessage = error.message;
            break;
        }

        this.message.alert(errorMessage);

      });

  }

  /**
   * 獲取錯誤訊息
   *
   * @param {string} key - 表單key值
   * @returns {string}
   * @memberof AdminLoginComponent
   */
  getErrorMsg(key: string): string {

    const ctrl = this.form.get(key);
    const errors = ctrl ? ctrl.errors : null;

    let errorMsg = '';

    if (errors) {

      if (errors.required) {
        errorMsg = '請填寫' + this.getLabelName(key);
      } else if (errors.email) {
        errorMsg = '請確認信箱格式';
      }

    }

    return errorMsg;

  }

  /**
   *
   *
   * @param {string} key - 表單key值
   * @returns {string}
   * @memberof AdminLoginComponent
   */
  getLabelName(key: string): string {

    let labelName = '';

    switch (key) {

      case this.formKeys.email:
        labelName = '信箱';
        break;

      case this.formKeys.password:
        labelName = '密碼';
        break;

      default:
        break;

    }

    return labelName;

  }

  ngOnInit() {
  }

}
