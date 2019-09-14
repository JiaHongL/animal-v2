import { UtilityService } from './core/utility/utility.service';
import { Component, AfterViewInit } from '@angular/core';

// service
import { SelectsService } from './core/selects/selects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(
    private selectsService: SelectsService,
    private utility: UtilityService
  ) {
    this.selectsService.getAllSelects();
  }

  ngAfterViewInit() {

    // 預載圖片 (緩存)
    const pictures = [
      './assets/images/animal-koala-001.png',
      './assets/images/person-family-001.png',
      './assets/images/animal-cat-004.png',
      './assets/images/non02.png',
      './assets/images/brushed_@2X.png',
    ];

    this.utility.preloadPicture(pictures);

  }

}
