import { Injectable, OnModuleInit } from '@nestjs/common';
import { RoleRepository } from './repositories/roles.repository';

@Injectable()
export class SeedRolesService implements OnModuleInit {
  constructor(private readonly roleRepository: RoleRepository) {}
  onModuleInit(): void {
    this.roleRepository.seedRoles();
  }
}
