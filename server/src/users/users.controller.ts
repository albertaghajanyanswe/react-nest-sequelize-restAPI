import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DoesUserExist } from 'src/shared/guards/doesUserExist.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, type: User })
  @Post('/registration')
  register(@Body() userDto: CreateUserDto & { switchGuestAccount: boolean }) {
    return this.userService.register(userDto);
  }

  @ApiOperation({ summary: 'Create new guest user' })
  @ApiResponse({ status: 200, type: User })
  @Post('/registration/guest')
  registerGuest(@Body() userDto: CreateUserDto & { switchGuestAccount: boolean }) {
    return this.userService.registerGuest(userDto);
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, type: User })
  @Get('/activate/:link')
  activateUser(@Res() response: Response, @Param('link') link) {
    return this.userService.activate(response, link);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}
