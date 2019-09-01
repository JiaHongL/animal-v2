import { Component, OnInit, ElementRef, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * 是否開啟選單
   *
   * @memberof HeaderComponent
   */
  isMenuOpen = false;

  /**
   * 是否為管理員登入
   *
   * @memberof HeaderComponent
   */
  isAdminLogin = false;

  /**
   * 使用者名稱
   *
   * @memberof HeaderComponent
   */
  userName = '';

  /**
   * class 綁定
   *
   * @memberof FooterComponent
   */
  @HostBinding('class') class = 'header';

  /**
   * 監聽 document 點擊事件 - 關閉選單
   *
   * @memberof HeaderComponent
   */
  @HostListener('document:click', ['$event']) documentClick(event: MouseEvent) {

    const isClickNav = this.elementRef.nativeElement.querySelector('.nav').contains(event.target);

    if (!isClickNav) {
      this.isMenuOpen = false;
    }

  }

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() { }

  /**
   * 獲取 margin-right px 設定
   *
   * @readonly
   * @type {(0 | -284)}
   * @memberof HeaderComponent
   */
  get marginRightPx(): 0 | -284 {
    return this.isMenuOpen === true ? 0 : -284;
  }

}
