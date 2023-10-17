// src/upload/upload.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { multerOptions } from './multer.config';
import * as fs from 'fs';
import { DeleteFileDto } from './delete-file.dto';

@ApiTags('Uploads')
@ApiBearerAuth()
@Controller('uploads')
export class UploadController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(@UploadedFile() file) {
    return { filename: file.filename };
  }

  @Post('/avatar')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadAvatar(@UploadedFile() file, @Request() req) {
    const user = await this.userService.findOneByEmail(req.user.email);
    if (user) {
      user.image = file.filename;
      await this.userService.updateUser({ image: file.filename }, req.user.id);
      return { filename: file.filename };
    } else {
      return { error: 'User not found' };
    }
  }

  @Delete('/avatar/delete/:filename')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete file by name' })
  @ApiParam({ name: 'link', type: String, description: 'File name' })
  @ApiResponse({ status: 200, type: DeleteFileDto })
  async deleteAvatar(@Param('filename') filename: string, @Request() req) {
    const filePath = `./uploads/${filename}`;
    try {
      fs.unlinkSync(filePath);
      await this.userService.updateUser({ image: '' }, req.user.id);
      return { message: 'File deleted successfully', success: true };
    } catch (err) {
      return { message: 'File deletion failed', success: false, error: err.message };
    }
  }
}
