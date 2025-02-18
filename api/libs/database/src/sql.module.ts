import { AppConfigModule } from '@app/app-config';
import { User } from '@app/user-management/user.entity';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        logging: true,
        replication: {
          master: {
            host: configService.get('DB_MASTER_HOST'),
            port: parseInt(configService.get('DB_MASTER_PORT') || '5432', 10),
            username: configService.get('DB_MASTER_USER'),
            password: configService.get('DB_MASTER_PASSWORD'),
            database: configService.get('DB_MASTER_NAME'),
          },
          slaves: [
            {
              host: configService.get('DB_STANDBY_HOST'),
              port: parseInt(
                configService.get('DB_STANDBY_PORT') || '5433',
                10,
              ),
              username: configService.get('DB_STANDBY_USER'),
              password: configService.get('DB_STANDBY_PASSWORD'),
              database: configService.get('DB_STANDBY_NAME'),
            },
          ],
        },
        entities: [User],
        extra: { connectionLimit: 10 },
        synchronize: true,
      }),
    }),
  ],
})
export class SqlModule {}
