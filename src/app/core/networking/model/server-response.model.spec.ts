import { ServerResponse } from './server-response.model';

describe('ServerResponse', () => {

  it('伺服器回傳 null，物件本身要有預設值', () => {

    const data = null;
    const serverResponse = new ServerResponse(data);

    expect(serverResponse.success).toBeFalsy();
    expect(serverResponse.result).toBeNull();
    expect(serverResponse.errorMessage).toBe('');

  });

  it('伺服器回傳無效值，物件本身要有預設值', () => {

    const data = {
      success: null,
      result: null,
      errorMessage: null
    };

    const serverResponse = new ServerResponse(data);

    expect(serverResponse.success).toBeFalsy();
    expect(serverResponse.result).toBeNull();
    expect(serverResponse.errorMessage).toBe('');

  });

  it('伺服器回傳正確值，物件的值要跟伺服器回傳的一樣', () => {

    const data = {
      success: true,
      result: 'a',
      errorMessage: 'b'
    };

    const serverResponse = new ServerResponse(data);

    expect(serverResponse.success).toBe(data.success);
    expect(serverResponse.result).toBe(data.result);
    expect(serverResponse.errorMessage).toBe(data.errorMessage);

  });

});
