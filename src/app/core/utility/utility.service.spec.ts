import { FormControl, Validators } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utility.service';

describe('UtilityService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [UtilityService]
  }));

  it('should be created', () => {
    const service: UtilityService = TestBed.get(UtilityService);
    expect(service).toBeTruthy();
  });

  it('isMobile，應該判斷是否為mobile', () => {

    const service: UtilityService = TestBed.get(UtilityService);
    const userAgentSpy = spyOnProperty(window.navigator, 'userAgent');

    expect(service.isMobile).toBeFalsy();

    userAgentSpy.and.returnValue('iPhone');

    expect(navigator.userAgent).toBe('iPhone');
    expect(service.isMobile).toBeTruthy();

    userAgentSpy.and.returnValue('Android');

    expect(navigator.userAgent).toBe('Android');
    expect(service.isMobile).toBeTruthy();

  });

  it('iosRemoveNoTouch()，若為Ios，應該移除 .no-touch', () => {

    const service: UtilityService = TestBed.get(UtilityService);
    spyOnProperty(window.navigator, 'userAgent').and.returnValue('iPhone');

    document.body.classList.add('no-touch');

    expect(document.querySelectorAll('.no-touch').length).toBeGreaterThan(0);

    service.iosRemoveNoTouch();

    expect(document.querySelectorAll('.no-touch').length).toBe(0);

  });

  it('stopBodyScroll()，參數若帶入true，應該增加fixed，若帶入false，則移除fixed', () => {

    const service: UtilityService = TestBed.get(UtilityService);
    spyOnProperty(window, 'scrollY').and.returnValue('100');

    service.stopBodyScroll(true);

    expect(document.body.style.position).toContain('fixed');
    expect(document.body.style.top).toContain('-100px');

    service.stopBodyScroll(false);

    expect(document.body.style.position).toBe('');
    expect(document.body.style.top).toBe('');

  });

  it('hasRequired()，應該判斷傳入的formControl是否為必填', () => {

    const service: UtilityService = TestBed.get(UtilityService);
    const ctrl = new FormControl();

    ctrl.setValidators(Validators.required);

    expect(service.hasRequired(ctrl)).toBeTruthy();

  });

  it('deepCopy()，應該對傳入的資料，進行深拷貝', () => {

    const service: UtilityService = TestBed.get(UtilityService);
    const a = {
      b: {
        c: {
          value: '111'
        }
      }
    };
    const b = a;
    const c = service.deepCopy(a);

    expect(c).toEqual(a);
    expect(b).toEqual(a);

    a.b.c.value = '222';

    expect(c).not.toEqual(a);
    expect(b).toEqual(a);

  });


});
