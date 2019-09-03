import { Component, OnInit, OnDestroy } from '@angular/core';

// component
import { ImageModalComponent } from '../../shared/components/image-modal/image-modal.component';

// service
import { ModalService } from '../../shared/components/modal/modal.service';
import { StorageService } from '../../core/storage/storage.service';

// class
import { Animal } from '../../model/animal/animal.model';
import { ModalConfig } from '../../shared/components/modal/modal-config';

// const
import { storageKeys } from '../../core/storage/storage-key.const';

// enum
import { StorageType } from '../../core/storage/storage-type.enum';

// rxjs
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit, OnDestroy {

  /**
   * 動物列表資料
   *
   * @type {Animal[]}
   * @memberof FavoriteComponent
   */
  animals: Animal[] = null;

  /**
   *
   *
   * @type {Subscription}
   * @memberof FavoriteComponent
   */
  subscription: Subscription = null;

  constructor(
    private modalService: ModalService,
    private storageService: StorageService
  ) {

    // 從 LocalStorage 獲取 最愛清單資料
    const animalsData = this.storageService.getData(storageKeys.favoriteList, StorageType.LOCAL);
    this.animals = animalsData ? animalsData.map(animal => new Animal(animal)) : null;

    // 訂閱 LocalStorage 最愛清單的 subject
    this.subscription = this
      .storageService
      .getDataObs(storageKeys.favoriteList, StorageType.LOCAL)
      .pipe(map((animals: any[]) => animals.map(animal => new Animal(animal))))
      .subscribe(animals => {
        this.animals = animals;
      });

  }

  ngOnInit() {
  }

  /**
   * 打開 相片 modal
   *
   * @param {string} url - 路徑
   * @memberof FavoriteComponent
   */
  openImageModal(url: string): void {

    const data: any = {};
    data.url = url;

    const config: ModalConfig = {};
    config.data = data;

    this.modalService.open(ImageModalComponent, config);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
