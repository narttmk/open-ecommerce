import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlModule } from '@app/database';
import { UserManagementModule } from '@app/user-management';

@Module({
  imports: [SqlModule, UserManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
