import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// class
import { Animal } from '../../model/animal/animal.model';

// service
import { ApiService } from './../../core/api/api.service';
import { LoadingService } from '../../core/loading/loading.service';
import { MessageService } from './../../core/message/message.service';

// rxjs
import { finalize, filter, map } from 'rxjs/operators';
import { LoadingType } from '../../core/loading/enum/loading-type.enum';

/**
 * 獲取 動物詳細資料 的 resolve
 *
 * @export
 * @class AnimalDetailResolver
 * @implements {Resolve<any>}
 */
@Injectable()
export class AnimalDetailResolver implements Resolve<Animal> {

  constructor(
    private loading: LoadingService,
    private api: ApiService,
    private message: MessageService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {

    this.loading.show(LoadingType.ROLLER);

    const animalId = route.params.id;

    return this
      .api
      .getAnimalDetail(animalId)
      .pipe(
        finalize(() => this.loading.hide()),
        filter((res) => {

          // 有錯誤時 跳後端的錯誤訊息
          if (!res.success) { this.message.alert(res.errorMessage); }

          return res.success;

        }),
        map((res) => {
          return new Animal(res.result[0]);
        })
      );

  }

}
