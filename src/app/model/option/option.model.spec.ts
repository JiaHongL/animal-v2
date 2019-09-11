import { Option } from './option.model';

describe('Option', () => {

  it('伺服器回傳 null，物件本身要有預設值', () => {

    const data = null;
    const option = new Option(data);

    expect(option.code).toEqual('');
    expect(option.name).toEqual('');

  });

  it('伺服器回傳無效值，物件本身要有預設值', () => {

    const data = {
      code: null,
      name: null
    };

    const option = new Option(data);

    expect(option.code).toEqual('');
    expect(option.name).toEqual('');

  });

  it('伺服器回傳正確值，物件的值要跟伺服器回傳的一樣', () => {

    const data = {
      code: 'a',
      name: 'b'
    };

    const option = new Option(data);

    expect(option.code).toEqual(data.code);
    expect(option.name).toEqual(data.name);

  });

});
