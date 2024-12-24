import {Token} from '../shared/interfaces/token';
import * as faker from 'faker';
import {User} from '../shared/interfaces/user';

export const getFakeToken = (data?: Object, replace: boolean = false): Token => {
  const header = faker.random.alphaNumeric(36);
  let payload = btoa(JSON.stringify(data));
  payload = payload.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const signature = faker.random.alphaNumeric(43);
  return {
    access: `${header}.${payload}.${signature}`,
    refresh: faker.random.alphaNumeric(100),
  }
}

export const getFakeUser = (data?: Partial<User>): User => {
  return Object.assign({
    id: faker.datatype.uuid(),
    username: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
  }, data);
};

