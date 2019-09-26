import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';

import { ButtonGroupComponent } from './button-group.component';

describe('ButtonGroupComponent', () => {

  let component: ButtonGroupComponent;
  let fixture: ComponentFixture<ButtonGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('應該 宣告 所需的 變數 與 預設值', () => {

    fixture = TestBed.createComponent(ButtonGroupComponent);
    component = fixture.componentInstance;

    expect(component).toEqual(
      jasmine.objectContaining({
        value: '',
        buttons: [],
        clickEvent: new EventEmitter()
      })
    );

    fixture.detectChanges();

  });

  it('clickEvent.emit()，需送出對應的按鈕代碼', () => {

    const mockButtons = [
      {
        code: 'a',
        name: 'aaa'
      }, {
        code: 'b',
        name: 'bbb'
      }
    ];

    component.buttons = mockButtons;

    fixture.detectChanges();

    const spyFunc = spyOn(component.clickEvent, 'emit');

    const btn = fixture.nativeElement.querySelectorAll('.pure-button')[0];
    const btn2 = fixture.nativeElement.querySelectorAll('.pure-button')[1];

    expect(btn.innerText).toEqual(mockButtons[0].name);
    expect(btn2.innerText).toEqual(mockButtons[1].name);

    let args = null;

    btn.click();

    args = spyFunc.calls.mostRecent().args;

    expect(spyFunc).toHaveBeenCalledTimes(1);
    expect(args[0]).toEqual(mockButtons[0].code);

    btn2.click();

    args = spyFunc.calls.mostRecent().args;

    expect(spyFunc).toHaveBeenCalledTimes(2);
    expect(args[0]).toEqual(mockButtons[1].code);

  });



});
