import { Option } from './option.model';

describe('Option', () => {

  it('伺服器回傳 null，物件本身要有預設值', () => {

    const data = null;
    const option = new Option(data);

    expect(option.key).toEqual('');
    expect(option.value).toEqual('');

  });

  it('伺服器回傳無效值，物件本身要有預設值', () => {

    const data = {
      key: null,
      value: null
    };

    const option = new Option(data);

    expect(option.key).toEqual('');
    expect(option.value).toEqual('');

  });

  it('伺服器回傳正確值，物件的值要跟伺服器回傳的一樣', () => {

    const data = {
      key: 'a',
      value: 'b'
    };

    const option = new Option(data);

    expect(option.key).toEqual(data.key);
    expect(option.value).toEqual(data.value);

  });

});
