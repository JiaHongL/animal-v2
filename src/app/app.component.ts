import { UserService } from './core/user/user.service';
import { ApiService } from './core/api/api.service';
import { Component } from '@angular/core';

// service
import { SelectsService } from './core/selects/selects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private selectsService: SelectsService
  ) {

    this.selectsService.getAllSelects();

  }

}
