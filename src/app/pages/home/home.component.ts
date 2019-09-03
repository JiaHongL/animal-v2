import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// component
import { ImageModalComponent } from '../../shared/components/image-modal/image-modal.component';

// class
import { Animal } from 'src/app/model/animal/animal.model';
import { ModalConfig } from '../../shared/components/modal/modal-config';

// service
import { ApiService } from './../../core/api/api.service';
import { LoadingService } from './../../core/loading/loading.service';

// rxjs
import { finalize } from 'rxjs/operators';
import { ModalService } from '../../shared/components/modal/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * 動物列表資料
   *
   * @type {Animal[]}
   * @memberof HomeComponent
   */
  animals: Animal[] = null;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private modalService: ModalService
  ) { }

  ngOnInit() {

    // 監聽路由變化後，呼查詢 api
    this
      .activatedRoute
      .queryParamMap
      .subscribe(queryParam => {

        const allParams = {};

        queryParam
          .keys
          .forEach(key => {
            allParams[key] = queryParam.get(key);
          });

        this.searchAnimals(1, allParams);

      });

  }

  /**
   * 動物列表查詢
   *
   * @param {*} page - 頁碼
   * @param {*} params - 查詢參數
   * @memberof HomeComponent
   */
  searchAnimals(page: number, params: any): void {

    this.loadingService.show();

    this
      .apiService
      .getAnimals(page, params)
      .pipe(
        finalize(() => this.loadingService.hide())
      )
      .subscribe((res) => {

        if (res.success) {
          this.animals = res.result.map(animal => new Animal(animal));
        } else {
          alert(res.errorMessage);
        }

      });

  }

  /**
   * 打開 相片 modal
   *
   * @param {string} url - 路徑
   * @memberof HomeComponent
   */
  openImageModal(url: string): void {

    const data: any = {};
    data.url = url;

    const config: ModalConfig = {};
    config.data = data;

    this.modalService.open(ImageModalComponent, config);

  }

}
