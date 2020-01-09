import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './repositories/roles.repository';
import { SeedRolesService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository])],
  providers: [SeedRolesService],
})
export class RolesModule implements OnModuleInit {
  constructor(private readonly seedService: SeedRolesService) {}

  onModuleInit(): void {
    this.seedService.onModuleInit();
  }
}
