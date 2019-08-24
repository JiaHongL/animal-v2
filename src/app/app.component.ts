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
    public selectsService: SelectsService
  ) {

    this.selectsService.getAllSelects();

  }

}
