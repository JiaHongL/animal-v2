import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddHistoryModalComponent } from './add-history-modal.component';

// class
import { Option } from '../../../model/option/option.model';
import { ModalRef } from '../../../shared/components/modal/modal-ref.model';
import { MODAL_DATA } from '../../../shared/components/modal/modal';

// module
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

// const
import { historyFormKeys } from '../../../constant/form-keys/history-form-keys.const';

// service
import { SelectsService } from '../../../core/selects/selects.service';

// enum
import { IssueStatus } from '../../../enum/issue-status.enum';

describe('AddHistoryModalComponent', () => {

  let component: AddHistoryModalComponent;
  let fixture: ComponentFixture<AddHistoryModalComponent>;

  const mockIssuesStatusList: Option[] = [
    {
      code: 0,
      name: '提交'
    },
    {
      code: 1,
      name: '已追蹤'
    },
    {
      code: 2,
      name: '處理中'
    },
    {
      code: 3,
      name: '已解決'
    },
    {
      code: 99,
      name: '歸檔'
    }
  ].map((option: any) => new Option(option));

  const mockModalData = {
    userName: '李主管',
    isAdmin: true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddHistoryModalComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        SharedModule
      ],
      providers: [
        {
          provide: ModalRef,
          useValue: {
            close: jasmine.createSpy()
          }
        },
        {
          provide: MODAL_DATA,
          useValue: mockModalData
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    const selects = TestBed.get(SelectsService);

    Object.defineProperty(
      selects,
      'issuesStatusList',
      {
        value: mockIssuesStatusList,
        writable: true
      }
    );

    fixture = TestBed.createComponent(AddHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('應該 宣告 元件所需的 變數 與 預設值', () => {

    fixture = TestBed.createComponent(AddHistoryModalComponent);
    component = fixture.componentInstance;

    expect(component).toEqual(
      jasmine.objectContaining({
        form: null,
        formKeys: historyFormKeys,
        issueStatusOptions: []
      })
    );

    fixture.detectChanges();

  });

  it('不管是 一般使用者 或是 管理員 ，都應該 過濾掉 『送出選項』，但只有管理員才能看到『歸檔選項』', () => {

    const expectedUserOption = mockIssuesStatusList.filter((issueStatus) =>
      issueStatus.code !== IssueStatus.SUBMIT &&
      issueStatus.code !== IssueStatus.ARCHIVE
    );

    const expectedAdminOption = mockIssuesStatusList.filter((issueStatus) => issueStatus.code !== IssueStatus.SUBMIT);

    expect(component.data.isAdmin).toBeTruthy();
    expect(component.issueStatusOptions).toEqual(expectedAdminOption);

    component.data.isAdmin = false;

    component.ngOnInit();

    expect(component.data.isAdmin).toBeFalsy();
    expect(component.issueStatusOptions).toEqual(expectedUserOption);

  });

  it('表單部分欄位應該要有預設值', () => {

    expect(component.form.value).toEqual({
      [historyFormKeys.status]: IssueStatus.TRACKED,
      [historyFormKeys.createTime]: '',
      [historyFormKeys.createUser]: mockModalData.userName,
      [historyFormKeys.remark]: ''
    });

  });

  it('表單部分欄位應該要有預設值', () => {

    expect(component.form.value).toEqual({
      [historyFormKeys.status]: IssueStatus.TRACKED,
      [historyFormKeys.createTime]: '',
      [historyFormKeys.createUser]: mockModalData.userName,
      [historyFormKeys.remark]: ''
    });

  });

  it('初始化時，表單的『有效狀態』應該為false', () => {

    expect(component.form.valid).toBeFalsy();
    expect(component.form.get(historyFormKeys.status).valid).toBeTruthy();
    expect(component.form.get(historyFormKeys.createTime).valid).toBeTruthy();
    expect(component.form.get(historyFormKeys.createTime).valid).toBeTruthy();
    expect(component.form.get(historyFormKeys.remark).valid).toBeFalsy();

  });

  it('備註欄位應該為必填', () => {

    const remarkCtrl = component.form.get(historyFormKeys.remark);

    remarkCtrl.setValue('');

    expect(remarkCtrl.errors[`required`]).toBeTruthy();
    expect(remarkCtrl.valid).toBeFalsy();

    remarkCtrl.setValue('a');

    expect(remarkCtrl.valid).toBeTruthy();

  });

  it('備註欄位應該為必填', () => {

    const remarkCtrl = component.form.get(historyFormKeys.remark);

    remarkCtrl.setValue('');

    expect(remarkCtrl.errors[`required`]).toBeTruthy();
    expect(remarkCtrl.valid).toBeFalsy();

    remarkCtrl.setValue('a');

    expect(remarkCtrl.valid).toBeTruthy();

  });

  it('送出表單時，應該填寫建立時間，且關閉視窗，表單資料傳送出去', () => {

    const expectedFormData = {
      [historyFormKeys.status]: IssueStatus.PROCESSED,
      [historyFormKeys.createTime]: new Date(),
      [historyFormKeys.createUser]: mockModalData.userName,
      [historyFormKeys.remark]: 'aaa'
    };

    component.form.patchValue(expectedFormData);

    component.submitForm();

    const args = (component.modalRef.close as jasmine.Spy).calls.first().args;

    expect(component.modalRef.close).toHaveBeenCalled();
    expect(args[0]).toEqual(expectedFormData);

  });

});
