import { appRoutePaths } from './../constant/app-route-paths.const';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// rxjs
import { timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-auth-error',
  templateUrl: './auth-error.component.html',
  styleUrls: ['./auth-error.component.scss']
})
export class AuthErrorComponent implements OnInit {

  /**
   * 倒數參數
   *
   * @memberof AuthErrorComponent
   */
  sec = 3;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    timer(1000, 1000)
      .pipe(
        take(this.sec),
        map(() => --this.sec)
      ).subscribe((sec) => {
        if (!sec) { this.router.navigate([appRoutePaths.adLogin.path]); }
      });

  }

}
