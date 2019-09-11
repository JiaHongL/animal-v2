import { SelectsService } from './../../../core/selects/selects.service';
import { Pipe, PipeTransform } from '@angular/core';

import { SelectType } from '../../../core/selects/enum/select-type.enum';

@Pipe({
  name: 'animal'
})
export class AnimalPipe implements PipeTransform {

  constructor(private selectsService: SelectsService) { }

  /**
   * 動物相關代碼 轉換為 中文
   *
   * @param {*} code - 要轉換的代碼值
   * @param {SelectType} type - 選項類別
   * @returns {string}
   * @memberof AnimalPipe
   */
  transform(code: any, selectType: SelectType): string {

    if (!code) {
      return '';
    }

    const word = this
      .selectsService[selectType]
      .find(item => item.code === code)
      .name;

    return word;

  }

}
