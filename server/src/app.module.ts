import { Module } from '@nestjs/common';
import { ProjectModule } from './modules/project/project.module';
import { PageModule } from './modules/page/page.module';
import { ElementModule } from './modules/element/element.module';

@Module({
  imports: [ProjectModule,PageModule,ElementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
