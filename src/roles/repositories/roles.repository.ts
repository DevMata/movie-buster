import { EntityRepository, Repository, In } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Roles } from '../roles.contants';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  async verifyRoles(): Promise<boolean> {
    const res = await this.findAndCount({ name: In(Roles) });

    return res.length === 2;
  }

  async seedRoles(): Promise<void> {
    if (await this.verifyRoles()) {
    }
  }
}
