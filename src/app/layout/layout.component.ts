import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// service
import { UserService } from './../core/user/user.service';

// const
import { appRoutePaths } from '../constant/app-route-paths.const';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /**
   * 登出
   *
   * @memberof LayoutComponent
   */
  signOut(): void {

    this
      .userService
      .signOut()
      .subscribe(_ => {
        this.router.navigate([appRoutePaths.home.path]);
      });

  }

}
