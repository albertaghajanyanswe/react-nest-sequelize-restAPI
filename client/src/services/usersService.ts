import { AxiosResponse } from 'axios';
import { CreateUserDto, User, UsersApi } from '../generated/openapi';
import { axiosInstance } from './client/axiosHelper';

const PREFIX = '/api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function decodeCreateUser<T,>(response: AxiosResponse<CreateUserDto>): {
  email: string,
  password: string
} {
  const { email, password } = response.data
  return {
    email,
    password
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function decodeGetUsers<T,>(response: AxiosResponse<User[]>): {
  id: number,
  email: string,
  password: string,
  firstName: string
  lastName: string,
  phone: string,
  isActive: boolean,
  archived: boolean,
  roles: any
}[] {
  return response.data;
}

const usersApi = new UsersApi(undefined, PREFIX, axiosInstance)

const usersService = {
  createUser: async <T>({data}: {data: { email: string, password: string }}) => {
    return decodeCreateUser<T>(await usersApi.usersControllerCreate(data));
  },
  getUsers: async <T>(params: any) => {
    return decodeGetUsers<T[]>(await usersApi.usersControllerGetAll(params));
  },
}

export default usersService;