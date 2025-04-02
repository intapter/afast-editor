import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { ProjectService } from '../project/project.service';

@Module({
  imports: [],
  controllers: [PageController],
  providers: [PageService,ProjectService],
})
export class PageModule {}
