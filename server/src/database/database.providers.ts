import { Sequelize } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from 'src/shared/constants';
import { User } from 'src/users/users.model';
import { databaseConfig } from './database.config';

export const databaseProvidersObject = {
  provide: SEQUELIZE,
  useFactory: async (): Promise<Sequelize> => {
    let config;
    switch (process.env.NODE_ENV) {
      case DEVELOPMENT:
        config = databaseConfig.development;
        break;
      case TEST:
        config = databaseConfig.test;
        break;
      case PRODUCTION:
        config = databaseConfig.production;
        break;
      default:
        config = databaseConfig.development;
    }
    const sequelize = new Sequelize(config);
    sequelize.addModels([User, Role, UserRoles]);
    await sequelize.sync();
    return sequelize;
  },
};

export const databaseProviders = [databaseProvidersObject];
