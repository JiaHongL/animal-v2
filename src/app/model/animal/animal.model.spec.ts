import { Animal } from './animal.model';

describe('Animal', () => {


  it('伺服器回傳 null，物件本身要有預設值', () => {

    const data = null;
    const animal = new Animal(data);

    expect(animal.album_file).toEqual('');
    expect(animal.album_update).toEqual('');
    expect(animal.animal_age).toEqual('');
    expect(animal.animal_area_pkid).toEqual('');
    expect(animal.animal_bacterin).toEqual('');
    expect(animal.animal_bodytype).toEqual('');
    expect(animal.animal_caption).toEqual('');
    expect(animal.animal_closeddate).toEqual('');
    expect(animal.animal_colour).toEqual('');
    expect(animal.animal_createtime).toEqual('');
    expect(animal.animal_foundplace).toEqual('');
    expect(animal.animal_id).toEqual('');
    expect(animal.animal_kind).toEqual('');
    expect(animal.animal_opendate).toEqual('');
    expect(animal.animal_place).toEqual('');
    expect(animal.animal_remark).toEqual('');
    expect(animal.animal_sex).toEqual('');
    expect(animal.animal_shelter_pkid).toEqual('');
    expect(animal.animal_status).toEqual('');
    expect(animal.animal_sterilization).toEqual('');
    expect(animal.animal_subid).toEqual('');
    expect(animal.animal_title).toEqual('');
    expect(animal.animal_update).toEqual('');
    expect(animal.cDate).toEqual('');
    expect(animal.shelter_address).toEqual('');
    expect(animal.shelter_name).toEqual('');
    expect(animal.shelter_tel).toEqual('');

  });

  it('伺服器回傳無效值，物件本身要有預設值', () => {

    const data = {
      album_file: null,
      album_update: null,
      animal_age: null,
      animal_area_pkid: null,
      animal_bacterin: null,
      oldAddress: null,
      animal_bodytype: null,
      animal_closeddate: null,
      animal_colour: null,
      animal_createtime: null,
      animal_foundplace: null,
      animal_id: null,
      animal_kind: null,
      animal_opendate: null,
      animal_place: null,
      animal_remark: null,
      animal_sex: null,
      animal_shelter_pkid: null,
      animal_status: null,
      animal_sterilization: null,
      animal_subid: null,
      animal_title: null,
      animal_update: null,
      cDate: null,
      shelter_address: null,
      shelter_name: null,
      shelter_tel: null,
    };

    const animal = new Animal(data);

    expect(animal.album_file).toEqual('');
    expect(animal.album_update).toEqual('');
    expect(animal.animal_age).toEqual('');
    expect(animal.animal_area_pkid).toEqual('');
    expect(animal.animal_bacterin).toEqual('');
    expect(animal.animal_bodytype).toEqual('');
    expect(animal.animal_caption).toEqual('');
    expect(animal.animal_closeddate).toEqual('');
    expect(animal.animal_colour).toEqual('');
    expect(animal.animal_createtime).toEqual('');
    expect(animal.animal_foundplace).toEqual('');
    expect(animal.animal_id).toEqual('');
    expect(animal.animal_kind).toEqual('');
    expect(animal.animal_opendate).toEqual('');
    expect(animal.animal_place).toEqual('');
    expect(animal.animal_remark).toEqual('');
    expect(animal.animal_sex).toEqual('');
    expect(animal.animal_shelter_pkid).toEqual('');
    expect(animal.animal_status).toEqual('');
    expect(animal.animal_sterilization).toEqual('');
    expect(animal.animal_subid).toEqual('');
    expect(animal.animal_title).toEqual('');
    expect(animal.animal_update).toEqual('');
    expect(animal.cDate).toEqual('');
    expect(animal.shelter_address).toEqual('');
    expect(animal.shelter_name).toEqual('');
    expect(animal.shelter_tel).toEqual('');

  });

  it('伺服器回傳正確值，物件的值要跟伺服器回傳的一樣', () => {

    const data = {
      album_file: '1',
      album_update: '2',
      animal_age: '3',
      animal_area_pkid: '4',
      animal_bacterin: '5',
      oldAddress: '6',
      animal_bodytype: '7',
      animal_closeddate: '8',
      animal_colour: '9',
      animal_createtime: '10',
      animal_foundplace: '11',
      animal_id: '12',
      animal_kind: '13',
      animal_opendate: '14',
      animal_place: '15',
      animal_remark: '16',
      animal_sex: '17',
      animal_shelter_pkid: '18',
      animal_status: '19',
      animal_sterilization: '20',
      animal_subid: '21',
      animal_title: '22',
      animal_update: '23',
      cDate: '24',
      shelter_address: '25',
      shelter_name: '26',
      shelter_tel: '27',
    };

    const animal = new Animal(data);

    expect(animal.album_file).toEqual(data.album_file);
    expect(animal.album_update).toEqual(data.album_update);
    expect(animal.animal_age).toEqual(data.animal_age);
    expect(animal.animal_area_pkid).toEqual(data.animal_area_pkid);
    expect(animal.animal_bacterin).toEqual(data.animal_bacterin);
    expect(animal.animal_bodytype).toEqual(data.animal_bodytype);
    expect(animal.animal_caption).toEqual(data.animal_caption);
    expect(animal.animal_closeddate).toEqual(data.animal_closeddate);
    expect(animal.animal_colour).toEqual(data.animal_colour);
    expect(animal.animal_createtime).toEqual(data.animal_createtime);
    expect(animal.animal_foundplace).toEqual(data.animal_foundplace);
    expect(animal.animal_id).toEqual(data.animal_id);
    expect(animal.animal_kind).toEqual(data.animal_kind);
    expect(animal.animal_opendate).toEqual(data.animal_opendate);
    expect(animal.animal_place).toEqual(data.animal_place);
    expect(animal.animal_remark).toEqual(data.animal_remark);
    expect(animal.animal_sex).toEqual(data.animal_sex);
    expect(animal.animal_shelter_pkid).toEqual(data.animal_shelter_pkid);
    expect(animal.animal_status).toEqual(data.animal_status);
    expect(animal.animal_sterilization).toEqual(data.animal_sterilization);
    expect(animal.animal_subid).toEqual(data.animal_subid);
    expect(animal.animal_title).toEqual(data.animal_title);
    expect(animal.animal_update).toEqual(data.animal_update);
    expect(animal.cDate).toEqual(data.cDate);
    expect(animal.shelter_address).toEqual(data.shelter_address);
    expect(animal.shelter_name).toEqual(data.shelter_name);
    expect(animal.shelter_tel).toEqual(data.shelter_tel);

  });

});
