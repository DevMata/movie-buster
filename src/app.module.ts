import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './typeorm-config.service';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { RolesModule } from './roles/roles.module';
import { MoviesModule } from './movies/movies.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SeedModule } from './seed/seed.module';
import { RentsModule } from './rents/rents.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    TagsModule,
    RolesModule,
    MoviesModule,
    AuthenticationModule,
    SeedModule,
    RentsModule,
    OrdersModule,
  ],
})
export class AppModule {}
