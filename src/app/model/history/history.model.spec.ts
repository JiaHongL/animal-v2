import { History } from './history.model';

describe('History', () => {


  it('伺服器回傳 null，物件本身要有預設值', () => {

    const data = null;
    const history = new History(data);

    expect(history.id).toEqual('');
    expect(history.status).toEqual(null);
    expect(history.createUser).toEqual('');
    expect(history.createTime).toEqual('');
    expect(history.remark).toEqual('');

  });

  it('伺服器回傳無效值，物件本身要有預設值', () => {

    const data = {
      id: null,
      status: null,
      createUser: null,
      createTime: null,
      remark: null
    };

    const history = new History(data);

    expect(history.id).toEqual('');
    expect(history.status).toEqual(null);
    expect(history.createUser).toEqual('');
    expect(history.createTime).toEqual('');
    expect(history.remark).toEqual('');

  });

  it('伺服器回傳正確值，物件的值要跟伺服器回傳的一樣', () => {

    const data = {
      id: '1',
      status: 2,
      createUser: '3',
      createTime: '4',
      remark: '5',
    };

    const history = new History(data);

    expect(history.id).toEqual(data.id);
    expect(history.status).toEqual(data.status);
    expect(history.createUser).toEqual(data.createUser);
    expect(history.createTime).toEqual(data.createTime);
    expect(history.remark).toEqual(data.remark);

  });

});
