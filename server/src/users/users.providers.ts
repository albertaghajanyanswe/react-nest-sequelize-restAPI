import { User } from './users.model';
import { USER_REPOSITORY } from '../shared/constants';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
