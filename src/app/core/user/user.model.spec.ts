import { User } from './user.model';

describe('User', () => {

  it('伺服器回傳 null，物件本身要有預設值', () => {

    const data = null;
    const user = new User(data);

    expect(user.uid).toEqual('');
    expect(user.name).toEqual('');
    expect(user.role).toEqual('');
    expect(user.email).toEqual('');

  });

  it('伺服器回傳無效值，物件本身要有預設值', () => {

    const data = {
      uid: null,
      name: null,
      role: null,
      email: null
    };

    const user = new User(data);

    expect(user.uid).toEqual('');
    expect(user.name).toEqual('');
    expect(user.role).toEqual('');
    expect(user.email).toEqual('');

  });

  it('伺服器回傳正確值，物件的值要跟伺服器回傳的一樣', () => {

    const data = {
      uid: 'a',
      name: 'b',
      role: 'c',
      email: 'd'
    };

    const user = new User(data);

    expect(user.uid).toEqual(data.uid);
    expect(user.name).toEqual(data.name);
    expect(user.role).toEqual(data.role);
    expect(user.email).toEqual(data.email);

  });

});
