import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { DoesUserExist } from 'src/shared/guards/doesUserExist.guard';
import { CreateGuestUserDto, CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/user.dto';
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
  registerGuest(@Body() userDto: CreateGuestUserDto & { switchGuestAccount: boolean }) {
    return this.userService.registerGuest(userDto);
  }

  @ApiOperation({ summary: 'Activate registred user account' })
  @ApiParam({ name: 'link', type: String, description: 'The activation link' })
  @ApiResponse({ status: 200, type: User })
  @Get('/activate/:link')
  activateUser(@Res() response: Response, @Param('link') link) {
    return this.userService.activate(response, link);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: GetUsersDto })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  // getAll(@Req() request: Request, @Query('params') params: string) {
    getAll(@Req() request: Request) {
    return this.userService.getAllUsers(request);
  }
}
