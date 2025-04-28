import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { FileDbService } from './services/file-db.service';
import { UsersModule } from './users/users.module'; // Import UsersModule

@Module({
  imports: [UsersModule], 
  controllers: [AppController],
  providers: [AppService, FileDbService],
})
export class AppModule {}