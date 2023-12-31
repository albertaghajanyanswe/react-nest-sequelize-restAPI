import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './roles/roles.module';
// import { MailerService } from './mailer/mailer.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from './files/multer.config';
import { UploadController } from './files/uploads.controller';
import { FileController } from './files/files.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register(multerOptions),
    DatabaseModule,
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [UploadController, FileController],
  // providers: [MailerService],
})
export class AppModule {}
