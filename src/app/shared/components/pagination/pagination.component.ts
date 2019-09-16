import { Component, OnInit, Input, EventEmitter, Output, SimpleChange, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  /**
   * 當前頁碼
   *
   * @memberof PaginationComponent
   */
  @Input() currentPage = 1;

  /**
   * 總筆數
   *
   * @memberof PaginationComponent
   */
  @Input() totalItems = 0;

  /**
   * 每頁顯示幾筆
   *
   * @memberof PaginationComponent
   */
  @Input() itemsPerPage = 10;

  /**
   * 點擊按鈕事件
   *
   * @memberof PaginationComponent
   */
  @Output() clickEvent = new EventEmitter<number>();

  /**
   * 最小顯示頁碼數量
   *
   * @memberof PaginationComponent
   */
  minPageNum = 1;

  /**
   * 最大顯示頁碼數量
   *
   * @memberof PaginationComponent
   */
  maxPageNum = 5;

  /**
   * 顯示頁碼
   *
   * @memberof PaginationComponent
   */
  pageGroupList = [];

  /**
   * 顯示頁碼數量範圍
   *
   * @memberof PaginationComponent
   */
  displayRange = 5;

  /**
   *  當前的頁碼群組
   *
   * @memberof PaginationComponent
   */
  currentPageGroup = 0;


  constructor() { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    for (const propName in changes) {

      if (propName) {

        const changedProp = changes[propName];

        if (changedProp.isFirstChange()) {
          this.setPageGroupList();
          return;
        }

        if (
          typeof changedProp.currentValue !== 'undefined' &&
          changedProp.currentValue !== changedProp.previousValue
        ) {
          this[propName] = changedProp.currentValue;
          this.setPageGroupList();
        }

      }

    }

  }

  ngOnInit() { }

  /**
   * 設定頁碼群組
   *
   * @memberof PaginationComponent
   */
  setPageGroupList() {

    this.currentPageGroup = 0;
    this.pageGroupList = [];
    this.currentPage = 0;
    this.minPageNum = 0;
    this.maxPageNum = 0;

    if (this.totalItems >= 1) {
      this.currentPage = 1;
      this.setShowMinMaxPage();
    }

    let count = Math.floor(this.totalItems / this.itemsPerPage);

    if ((this.totalItems % this.itemsPerPage) > 0) {
      count += 1;
    }

    for (let i = 0; i < count; i++) {
      this.pageGroupList.push({
        key: i,
        value: i + 1
      });
    }

  }

  /**
   * 設定最大與最小顯示的頁碼
   *
   * @memberof PaginationComponent
   */
  setShowMinMaxPage(): void {
    this.minPageNum = 1 + ((this.currentPageGroup) * this.displayRange);
    this.maxPageNum = this.displayRange * ((this.currentPageGroup) + 1);
  }

  /**
   * 是否在顯示頁碼的範圍內
   *
   * @param {number} page
   * @returns {boolean}
   * @memberof PaginationComponent
   */
  canShowPage(page: number): boolean {

    let canShow = false;

    if (this.pageGroupList.length === 1) {
      canShow = true;
    } else {
      canShow = this.minPageNum <= page && page <= this.maxPageNum;
    }

    return canShow;

  }

  /**
   * 到第一頁
   *
   * @memberof PaginationComponent
   */
  goToFirstPage(): void {

    this.currentPage = 1;
    this.currentPageGroup = 0;

    this.setShowMinMaxPage();
    this.clickEvent.emit(this.currentPage);

  }

  /**
   * 到最後一頁
   *
   * @memberof PaginationComponent
   */
  goToLastPage(): void {

    const lastPage = this.pageGroupList.length - 1;

    this.currentPage = this.pageGroupList[lastPage].value;
    this.currentPageGroup = Math.floor(this.pageGroupList.length / this.displayRange);

    this.setShowMinMaxPage();
    this.clickEvent.emit(this.currentPage);

  }

  /**
   * 頁碼 增加 相關邏輯
   *
   * @param {number} page
   * @memberof PaginationComponent
   */
  incrementCurrentPage(page: number): void {

    this.currentPage += page;

    if (this.currentPage > this.pageGroupList.length) {
      this.currentPage = this.pageGroupList.length;
    }

    if (this.currentPage > this.maxPageNum) {
      this.currentPageGroup = this.currentPageGroup + 1;
    }

    this.setShowMinMaxPage();
    this.clickEvent.emit(this.currentPage);

  }

  /**
   * 頁碼減少 相關邏輯
   *
   * @param {number} page - 頁碼
   * @memberof PaginationComponent
   */
  decrementCurrentPage(page: number): void {

    this.currentPage -= page;

    if (this.currentPage <= 0) {
      this.currentPage = 1;
      this.currentPageGroup = 0;
    }

    if (this.currentPage < this.minPageNum) {
      this.currentPageGroup = this.currentPageGroup - 1;
    }

    this.setShowMinMaxPage();
    this.clickEvent.emit(this.currentPage);

  }

  /**
   * 點擊頁碼
   *
   * @param {number} page - 頁碼
   * @memberof PaginationComponent
   */
  clickPageNum(page: number): void {

    this.currentPage = page;

    if (this.currentPage > this.maxPageNum) {
      this.currentPageGroup += 1;
    } else if (this.currentPage < this.minPageNum) {
      this.currentPageGroup -= 1;
    }

    this.setShowMinMaxPage();
    this.clickEvent.emit(this.currentPage);

  }

}
