import { Injectable, Inject, RendererFactory2, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class UtilityService {

  /**
   * ng renderer
   *
   * @private
   * @type {Renderer2}
   * @memberof UtilityService
   */
  private renderer: Renderer2;

  /**
   * top 數值
   *
   * @memberof UtilityService
   */
  top = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * 是否為行動裝置
   *
   * @readonly
   * @type {boolean}
   * @memberof UtilityService
   */
  get isMobile(): boolean {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }

  /**
   * ios 移除 no-touch class
   *
   * @memberof UtilityService
   */
  iosRemoveNoTouch(): void {

    const ua = navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(ua)) {
      Array.from(this.document.querySelectorAll('.no-touch')).forEach((element) => {
        element.classList.remove('no-touch');
      });
    }

  }

  /**
   * 停止 Body 滾動 ( mobile modal open & hide 使用)
   *
   * @param {boolean} isLock - 是否鎖定
   * @memberof UtilityService
   */
  stopBodyScroll(isLock: boolean): void {

    if (isLock) {

      this.top = window.scrollY;
      this.renderer.setStyle(this.document.body, 'position', 'fixed');
      this.renderer.setStyle(this.document.body, 'top', - this.top + 'px');

    } else {

      this.renderer.setStyle(this.document.body, 'position', '');
      this.renderer.setStyle(this.document.body, 'top', '');
      window.scrollTo(0, this.top);

    }

  }

  /**
   * 預載圖片
   *
   * @param {string[]} images - 照片陣列
   * @memberof UtilityService
   */
  preloadPicture(images: string[]): void {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }

  /**
   * Timestamp 轉換為 Date
   *
   * @param {*} item - 資料
   * @param {*} name - key
   * @returns
   * @memberof UtilityService
   */
  convertTimestampToDate(item: {}, name: string): {} {
    item[name] = item[name].toDate();
    return item;
  }

  /**
   * FormControl 是否必填
   *
   * @param {FormControl} formControl - 要檢查的 FormControl
   * @returns {boolean}
   * @memberof UtilityService
   */
  hasRequired(formControl: FormControl): boolean {

    const ctrlKey = 'controls';

    if (formControl.validator) {
      const validator = formControl.validator({} as FormControl);
      if (validator && validator.required) {
        return true;
      }
    }

    if (formControl[ctrlKey]) {
      for (const controlName in formControl[ctrlKey]) {
        if (formControl[ctrlKey][controlName]) {
          if (this.hasRequired(formControl[ctrlKey][controlName])) {
            return true;
          }
        }
      }
    }

    return false;

  }

  /**
   * 把傳入的表單攤平，回傳全部的 FormControl
   *
   * @param {AbstractControl} form - Form
   * @returns {AbstractControl[]}
   * @memberof UtilityService
   */
  flattenControls(form: AbstractControl): AbstractControl[] {

    let extracted: AbstractControl[] = [form];

    if (form instanceof FormArray || form instanceof FormGroup) {
      const children = Object.values(form.controls).map(this.flattenControls);
      extracted = extracted.concat(...children);
    }

    return extracted;

  }

  /**
   * Deep Copy
   *
   * @param {*} oldObj - 要複製的物件
   * @returns {any}
   * @memberof UtilityService
   */
  deepCopy(oldObj: any): any {

    let newObj = oldObj;

    if (oldObj && typeof oldObj === 'object') {
      if (oldObj instanceof Date) {
        return new Date(oldObj.getTime());
      }
      newObj = Object.prototype.toString.call(oldObj) === '[object Array]' ? [] : {};

      for (const key of Object.keys(oldObj)) {
        newObj[key] = this.deepCopy(oldObj[key]);
      }

    }

    return newObj;

  }

}
