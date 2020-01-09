import { EntityRepository, Repository, In } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Roles } from '../roles.contants';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  async seedRoles(): Promise<void> {
    const savedRoles = (await this.find({ name: In(Roles) })).map(
      role => role.name,
    );

    if (!Roles.every(role => savedRoles.includes(role))) {
      this.save(Roles.map(role => ({ name: role })));
    }
  }
}
