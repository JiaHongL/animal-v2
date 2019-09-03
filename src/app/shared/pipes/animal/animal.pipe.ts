import { SelectsService } from './../../../core/selects/selects.service';
import { Pipe, PipeTransform } from '@angular/core';

import { SelectType } from '../../../core/selects/enum/select-type.enum';

@Pipe({
  name: 'animal'
})
export class AnimalPipe implements PipeTransform {

  constructor(private selectsService: SelectsService) { }

  /**
   * 動物相關代碼 轉換中文
   *
   * @param {*} key - 要轉換的值
   * @param {SelectType} type - 選項類別
   * @returns {string}
   * @memberof AnimalPipe
   */
  transform(key: any, selectType: SelectType): string {

    if (!key) {
      return '';
    }

    const word = this
      .selectsService[selectType]
      .find(item => item.key === key)
      .value;

    return word;

  }

}
