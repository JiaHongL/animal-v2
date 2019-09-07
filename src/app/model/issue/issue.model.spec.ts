import { Issue } from './issue.model';
import { History } from '../history/history.model';

describe('Issue', () => {

  it('伺服器回傳 null，物件本身要有預設值', () => {

    const data = null;
    const issue = new Issue(data);

    expect(issue.id).toEqual('');
    expect(issue.status).toEqual('');
    expect(issue.type).toEqual('');
    expect(issue.title).toEqual('');
    expect(issue.createUser).toEqual('');
    expect(issue.createTime).toEqual('');
    expect(issue.comment).toEqual('');
    expect(issue.email).toEqual('');
    expect(issue.history).toEqual(null);

  });

  it('伺服器回傳無效值，物件本身要有預設值', () => {

    const data = {
      id: null,
      status: null,
      type: null,
      title: null,
      createUser: null,
      createTime: null,
      comment: null,
      email: null,
      history: null
    };

    const issue = new Issue(data);

    expect(issue.id).toEqual('');
    expect(issue.status).toEqual('');
    expect(issue.type).toEqual('');
    expect(issue.title).toEqual('');
    expect(issue.createUser).toEqual('');
    expect(issue.createTime).toEqual('');
    expect(issue.comment).toEqual('');
    expect(issue.email).toEqual('');
    expect(issue.history).toEqual(null);

  });

  it('伺服器回傳正確值，物件的值要跟伺服器回傳的一樣', () => {

    const data = {
      id: '1',
      status: '2',
      type: '3',
      title: '4',
      createUser: '5',
      createTime: '6',
      comment: '7',
      email: '8',
      history: [{}]
    };

    const issue = new Issue(data);

    expect(issue.id).toEqual(data.id);
    expect(issue.status).toEqual(data.status);
    expect(issue.type).toEqual(data.type);
    expect(issue.title).toEqual(data.title);
    expect(issue.createUser).toEqual(data.createUser);
    expect(issue.createTime).toEqual(data.createTime);
    expect(issue.comment).toEqual(data.comment);
    expect(issue.email).toEqual(data.email);
    expect(issue.history.length).toEqual(data.history.length);
    issue.history.forEach((history) => {
      expect(history instanceof History).toBeTruthy();
    });

  });

});
