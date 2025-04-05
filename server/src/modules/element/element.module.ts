import { Module } from '@nestjs/common';
import { ElementController } from './element.controller';
import { ElementService } from './element.service';
import { PageService } from '../page/page.service';
import { ProjectService } from '../project/project.service';

@Module({
  imports: [],
  controllers: [ElementController],
  providers: [ElementService,PageService,ProjectService],
})
export class ElementModule {}
