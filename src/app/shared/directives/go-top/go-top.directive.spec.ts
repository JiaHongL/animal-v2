import { GoTopDirective } from './go-top.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: `<div class="container" appGoTop></div>`,

})
class TestComponent { }

describe('GoTopDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  /**
   * 產生 mock scroll event
   *
   * @param {number} scroll - 滾動數值
   * @returns {Event}
   */
  function generateMockScrollEvent(scroll: number): Event {

    const event = new Event('scroll');

    Object.defineProperty(event, 'target',
      {
        writable: false,
        value: {
          documentElement: {
            scrollTop: scroll
          },
          body: {
            scrollTop: scroll
          }
        }
      }
    );

    return event;

  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [GoTopDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // reset 0
    window.dispatchEvent(generateMockScrollEvent(0));

  });


  it('初始化，畫面未滾動時，goTop按鈕 不顯示', () => {

    const styles = window.getComputedStyle(fixture.nativeElement.querySelector('.go-top'));
    expect(styles.display).toBe('none');

  });

  it('畫面滾動距離超過600時，應該 顯示goTop按鈕', () => {

    const styles = window.getComputedStyle(fixture.nativeElement.querySelector('.go-top'));

    window.dispatchEvent(generateMockScrollEvent(800));

    expect(styles.display).toBe('block');

  });

  it('點擊goTop按鈕，回頂部且按鈕消失', () => {

    const styles = window.getComputedStyle(fixture.nativeElement.querySelector('.go-top'));

    window.dispatchEvent(generateMockScrollEvent(800));

    expect(styles.display).toBe('block');

    fixture.nativeElement.querySelector('.go-top').click();

    spyOn(fixture.nativeElement.querySelector('.go-top'), 'click')
      .and
      .callFake(() => {
        window.dispatchEvent(generateMockScrollEvent(0));
      });

    fixture.nativeElement.querySelector('.go-top').click();

    expect(styles.display).toBe('none');

  });

});
