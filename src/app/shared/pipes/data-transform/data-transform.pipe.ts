import { SelectsService } from '../../../core/selects/selects.service';
import { Pipe, PipeTransform } from '@angular/core';

import { SelectType } from '../../../core/selects/enum/select-type.enum';

@Pipe({
  name: 'dataTransform'
})
export class DataTransformPipe implements PipeTransform {

  constructor(private selectsService: SelectsService) { }

  /**
   * 相關代碼 轉換為 中文
   *
   * @param {*} code - 要轉換的代碼值
   * @param {SelectType} type - 選項類別
   * @returns {string}
   * @memberof DataTransformPipe
   */
  transform(code: any, selectType: SelectType): string {

    if (
      code === '' ||
      code === null ||
      code === undefined
    ) {
      return '';
    }

    let word = '';

    try {
      word = this.selectsService[selectType].find(item => item.code === code).name;
    } catch (error) {
      word = code;
    }

    return word;

  }

}
