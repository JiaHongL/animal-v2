import { Option } from '../../model/option/option.model';
import { IssueStatus } from '../../enum/issue-status.enum';

/**
 * 議題狀態選項的定義檔
 *
 */
export const issueStatusOptions: Option[] = [

  {
    code: IssueStatus.ALL,
    name: '全部'
  },
  {
    code: IssueStatus.SUBMIT,
    name: '提交'
  },
  {
    code: IssueStatus.TRACKED,
    name: '已追蹤'
  },
  {
    code: IssueStatus.PROCESSED,
    name: '已處理'
  },
  {
    code: IssueStatus.SOLVED,
    name: '已解決'
  },
  {
    code: IssueStatus.ARCHIVE,
    name: '歸檔'
  }

].map(option => new Option(option));
