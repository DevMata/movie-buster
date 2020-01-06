import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'postgres' as 'postgres',
          port: configService.get('DB_PORT'),
          host: configService.get('DB_HOST'),
          database: configService.get('DB_NAME'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          synchronize: true,
          entities: ['dist/**/*.entity{.ts|.js}'],
        } as TypeOrmModuleOptions),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
