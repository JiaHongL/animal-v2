import { Directive, HostListener, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appGoTop]'
})
export class GoTopDirective implements AfterViewInit {

  /**
   *  回頂部 element
   *
   * @type {Element}
   * @memberof GoTopDirective
   */
  goTopElement: Element;

  /**
   * 監聽滾動事件
   *
   * @param {Event} e
   * @memberof GoTopDirective
   */
  @HostListener('window:scroll', ['$event'])
  scrolled(e: Event) {

    const docEleScrollTop = (e.target as Document).documentElement.scrollTop;
    const bodyEleScrollTop = (e.target as Document).body.scrollTop;

    if (
      docEleScrollTop >= 600 ||
      bodyEleScrollTop >= 600
    ) {
      this.render.setAttribute(this.goTopElement, 'style', 'display:block');
    } else {
      this.render.setAttribute(this.goTopElement, 'style', 'display:none');
    }

  }

  constructor(
    private elementRef: ElementRef,
    private render: Renderer2
  ) {
  }

  ngAfterViewInit(): void {
    this.createGoTopBtn();
  }

  /**
   * 建立 goTop btn 與 事件綁定
   *
   * @memberof GoTopDirective
   */
  createGoTopBtn(): void {

    const goTopHtml = '<a class="go-top"></a>';

    const temp = document.createElement('div');

    temp.innerHTML = goTopHtml;
    this.goTopElement = temp.firstChild as Element;

    this.render.setAttribute(this.goTopElement, 'style', 'display:none');

    this.goTopElement.addEventListener('click', () => {

      const scrollStep = -window.scrollY / (300 / 15);
      const scrollInterval = setInterval(() => {

        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }

      }, 15);

    });

    this.render.appendChild(this.elementRef.nativeElement, this.goTopElement);

  }

}
