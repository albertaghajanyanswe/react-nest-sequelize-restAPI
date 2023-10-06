import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SEQUELIZE, USER_REPOSITORY } from 'src/shared/constants';
import { Sequelize } from 'sequelize-typescript';
import { RolesService } from 'src/roles/roles.service';
import { MailerService } from 'src/mailer/mailer.service';
import { Role } from 'src/roles/roles.model';
import { CustomInvalidCredentialsException } from 'src/exceptions/invalid-credetials.exception copy';
import { CustomAlreadyExistException } from 'src/exceptions/exist.exception';
import * as uuid from 'uuid';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
    private roleService: RolesService,
    private readonly mailerService: MailerService,
  ) { }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({
      include: [
        {
          model: Role,
          attributes: ['id', 'value', 'description'],
          through: { attributes: [] },
        },
      ],
    });
    return users;
  }

  async getUser(query: object): Promise<User> {
    return this.userRepository.findOne<User>(query);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  async register(dto: CreateUserDto & { switchGuestAccount: boolean }) {
    let transaction;
    try {
      transaction = await this.sequelize.transaction();

      let existGuest;
      if (dto.switchGuestAccount) {
        existGuest = await this.userRepository.findOne({ where: { nickName: dto.nickName } });
        if (!existGuest) {
          throw new NotFoundException('Guest user not found');
        }
        const validPassword = await this.comparePassword(dto.password, existGuest.password);
        console.log('validPassword = ', validPassword)
        if (!validPassword) {
          throw new CustomInvalidCredentialsException();
        }
      } else {
        const existUser = await this.userRepository.findOne({ where: { email: dto.email } });
        if (existUser) {
          throw new CustomAlreadyExistException('Email');
        }
      }

      const activationLink = uuid.v4();
      let newUser;
      const hashedPassword = await this.hashPassword(dto.password);

      if (dto.switchGuestAccount) {
        newUser = await this.userRepository.update(
          { ...dto, isActive: false, activationLink, password: hashedPassword },
          { where: { id: existGuest.id }, transaction },
        );
        const updatedUser = await this.userRepository.findOne({ where: { id: existGuest.id }, transaction });
        const role = await this.roleService.getRoleByValue('GUEST');
        if (role) {
          await updatedUser.$set('roles', [role.id], { transaction });
        }
      } else {
        newUser = await this.userRepository.create(
          { ...dto, isActive: false, activationLink, password: hashedPassword },
          { transaction },
        );
        const role = await this.roleService.getRoleByValue('USER');
        if (role) {
          await newUser.$set('roles', [role.id], { transaction });
        }
      }
      if (newUser) {
        this.mailerService.sendActivationMail(dto.email, `${process.env.API_URL}/api/users/activate/${activationLink}`);
        await transaction.commit();
        return newUser;
      }
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      console.log('\n\n error = ', err);
      throw err;
      // console.log('\n\n error = ', err)
      // throw new HttpException('Error in create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async registerGuest(dto: CreateUserDto & { switchGuestAccount: boolean }): Promise<CreateUserDto> {
    let transaction;
    try {
      transaction = await this.sequelize.transaction();

      const exist = await this.userRepository.findOne({ where: { nickName: dto.nickName } });
      if (exist) {
        throw new CustomAlreadyExistException('Nickname');
      }
      const hashedPassword = await this.hashPassword(dto.password);

      const createdUser = await this.userRepository.create({ ...dto, password: hashedPassword, isActive: true });
      const role = await this.roleService.getRoleByValue('GUEST');
      if (role) {
        await createdUser.$set('roles', [role.id], { transaction });
      }
      await transaction.commit();
      return { ...createdUser, password: '' };
    } catch (err) {
      console.log('registerGuest err - ', err);
      if (transaction) {
        await transaction.rollback();
      }
      throw err.message.includes('Nickname')
        ? err
        : new HttpException('Error to create guest user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async activate(res: Response, activationLink: string) {
    try {
      const user = await this.userRepository.findOne({ where: { activationLink } });
      if (!user) {
        throw new HttpException('Invalid activation link', HttpStatus.BAD_REQUEST);
      }
      await this.userRepository.update({ isActive: true }, { where: { activationLink } });
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      return res.status(500).json({ message: 'Could not activate account.' });
    }
  }
}
