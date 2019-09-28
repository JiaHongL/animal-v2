import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('setPageGroupList()，若總筆數大於1，應設定當前頁碼為第0頁', () => {

    component.totalItems = 0;
    component.setPageGroupList();

    expect(component.currentPage).toBe(0);


  });

  it('setPageGroupList()，若總筆數大於1，應呼叫設定最大與最小頁碼範圍，且設定當前頁碼為第1頁', () => {

    const spy = spyOn(component, 'setShowMinMaxPage');

    component.totalItems = 100;
    component.setPageGroupList();

    expect(component.currentPage).toBe(1);
    expect(spy).toHaveBeenCalledTimes(1);

  });

  it('setPageGroupList()，若總筆數為100筆，需產生10個頁碼', () => {

    component.totalItems = 100;
    component.setPageGroupList();

    expect(component.pageGroupList.length).toBe(10);

  });

  it('setPageGroupList()，若總筆數為101筆，需產生11個頁碼', () => {

    component.totalItems = 100;
    component.setPageGroupList();

    expect(component.pageGroupList.length).toBe(10);

  });

  it('setShowMinMaxPage()，應設定當前顯示的最大與最小頁碼', () => {

    component.totalItems = 100;
    component.setPageGroupList();

    expect(component.minPageNum).toBe(1);
    expect(component.maxPageNum).toBe(5);

  });

  it('canShowPage()，若頁碼在當前最小與最大頁碼範圍內，則顯示，否則隱藏', () => {

    component.totalItems = 100;
    component.setPageGroupList();

    expect(component.canShowPage(1)).toBeTruthy();
    expect(component.canShowPage(6)).toBeFalsy();

  });

  it('goToFirstPage()，應設定『當前頁碼』為第1頁，『當前頁碼群組』引索設為0，重新『計算最大與最小頁碼』，且發出『點擊事件通知』父元件', () => {

    component.totalItems = 100;
    component.setPageGroupList();
    component.currentPage = 2;

    spyOn(component, 'setShowMinMaxPage');
    const spy = spyOn(component.clickEvent, 'emit');

    component.goToFirstPage();

    const args = spy.calls.first().args;

    expect(component.currentPage).toBe(1);
    expect(component.currentPageGroup).toBe(0);
    expect(component.setShowMinMaxPage).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(args[0]).toBe(1);

  });

  it('goToLastPage()，應設定『當前頁碼』為最後1頁，『當前頁碼群組』設為最後一個『頁碼群組』，重新『計算最大與最小頁碼』，且發出『點擊事件通知』父元件', () => {

    component.totalItems = 100;
    component.setPageGroupList();
    component.currentPage = 2;

    spyOn(component, 'setShowMinMaxPage');
    const spy = spyOn(component.clickEvent, 'emit');

    component.goToLastPage();

    const args = spy.calls.first().args;

    expect(component.currentPage).toBe(10);
    expect(component.currentPageGroup).toBe(2);
    expect(component.setShowMinMaxPage).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(args[0]).toBe(10);

  });

  it('incrementCurrentPage()，根據傳入的『增加的頁碼數量』，調整『當前頁碼』與『當前頁碼群組』，且發出『點擊事件通知』父元件', () => {

    component.totalItems = 100;
    component.currentPage = 1;
    component.setPageGroupList();

    expect(component.currentPage).toBe(1);
    expect(component.currentPageGroup).toBe(0);

    spyOn(component, 'setShowMinMaxPage');
    const spy = spyOn(component.clickEvent, 'emit');

    component.incrementCurrentPage(5);

    const args = spy.calls.first().args;

    expect(component.currentPage).toBe(6);
    expect(component.currentPageGroup).toBe(1);
    expect(component.setShowMinMaxPage).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(args[0]).toBe(6);

  });

  it('incrementCurrentPage()，若傳入的『增加的頁碼數量』，經計算後已超過最大頁碼與頁碼群組，則設定為『最後一頁碼』與『最後一個頁碼群組』，且發出『點擊事件通知』父元件', () => {

    component.totalItems = 60;
    component.currentPage = 1;
    component.setPageGroupList();

    component.incrementCurrentPage(5);

    expect(component.currentPage).toBe(6);
    expect(component.currentPageGroup).toBe(1);

    spyOn(component, 'setShowMinMaxPage');
    const spy = spyOn(component.clickEvent, 'emit');

    component.incrementCurrentPage(1);

    const args = spy.calls.first().args;

    expect(component.currentPage).toBe(6);
    expect(component.currentPageGroup).toBe(1);
    expect(component.setShowMinMaxPage).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(args[0]).toBe(6);

  });

  it('decrementCurrentPage()，根據傳入的『減少的頁碼數量』，調整『當前頁碼』與『當前頁碼群組』，且發出『點擊事件通知』父元件', () => {

    component.totalItems = 100;
    component.currentPage = 1;
    component.setPageGroupList();

    component.incrementCurrentPage(5);

    expect(component.currentPage).toBe(6);
    expect(component.currentPageGroup).toBe(1);

    spyOn(component, 'setShowMinMaxPage');
    const spy = spyOn(component.clickEvent, 'emit');

    component.decrementCurrentPage(2);

    const args = spy.calls.first().args;

    expect(component.currentPage).toBe(4);
    expect(component.currentPageGroup).toBe(0);
    expect(component.setShowMinMaxPage).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(args[0]).toBe(4);

  });

  it('decrementCurrentPage()，若傳入的『減少的頁碼數量』，經計算後已小於最小頁碼與頁碼群組，則設定為『第一頁碼』與『第一個頁碼群組』，且發出『點擊事件通知』父元件', () => {

    component.totalItems = 60;
    component.currentPage = 1;
    component.setPageGroupList();

    component.incrementCurrentPage(1);

    expect(component.currentPage).toBe(2);
    expect(component.currentPageGroup).toBe(0);

    spyOn(component, 'setShowMinMaxPage');
    const spy = spyOn(component.clickEvent, 'emit');

    component.decrementCurrentPage(1);
    component.decrementCurrentPage(1);
    component.decrementCurrentPage(1);
    component.decrementCurrentPage(1);

    const args = spy.calls.mostRecent().args;

    expect(component.currentPage).toBe(1);
    expect(component.currentPageGroup).toBe(0);
    expect(component.setShowMinMaxPage).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(args[0]).toBe(1);

  });

  it('clickPageNum()，若傳入的『頁碼』設定『當前頁碼』，並計算『當前頁碼群組』與『最大最小頁碼』，且發出『點擊事件通知』父元件', () => {

    component.totalItems = 60;
    component.currentPage = 1;
    component.setPageGroupList();

    component.incrementCurrentPage(1);

    expect(component.currentPage).toBe(2);
    expect(component.currentPageGroup).toBe(0);

    spyOn(component, 'setShowMinMaxPage');
    const spy = spyOn(component.clickEvent, 'emit');

    component.clickPageNum(6);

    const args = spy.calls.first().args;

    expect(component.currentPage).toBe(6);
    expect(component.currentPageGroup).toBe(1);
    expect(component.setShowMinMaxPage).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(args[0]).toBe(6);

  });

});
