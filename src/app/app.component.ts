import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';

// service
import { SelectsService } from './core/selects/selects.service';
import { UtilityService } from './core/utility/utility.service';

// rxjs
import { filter, map, mergeMap } from 'rxjs/operators';

// const
import { preloadPicture } from './constant/preload-picture.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {

  constructor(
    private selectsService: SelectsService,
    private utility: UtilityService,
    private route: ActivatedRoute,
    private titleService: Title,
    private router: Router,
  ) {
    this.selectsService.getAllSelects();
  }

  ngOnInit() {

    const title = 'title';

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          while (route.firstChild) { route = route.firstChild; }
          return route;
        }),
        filter((route) => route.outlet === PRIMARY_OUTLET),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this.titleService.setTitle(data[title]);
      });

  }

  ngAfterViewInit() {

    // 預載圖片 (緩存)
    this.utility.preloadPicture(preloadPicture);

  }

}
