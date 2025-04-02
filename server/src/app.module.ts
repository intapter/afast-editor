import { Module } from '@nestjs/common';
import { ProjectModule } from './modules/project/project.module';
import { PageModule } from './modules/page/page.module';

@Module({
  imports: [ProjectModule,PageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
