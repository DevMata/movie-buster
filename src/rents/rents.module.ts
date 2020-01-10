import { Module } from '@nestjs/common';
import { RentsService } from './rents.service';
import { RentsController } from './rents.controller';

@Module({
  providers: [RentsService],
  controllers: [RentsController],
})
export class RentsModule {}
