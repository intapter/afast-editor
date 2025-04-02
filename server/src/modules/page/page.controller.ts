import { Controller, Get, Query } from '@nestjs/common';
import { PageService } from './page.service';
import { Result } from 'src/result/result';
import { handleRespond } from 'src/utils/result';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get('detail')
  detail(@Query("projectId") projectId: string, @Query("pageName") pageName: string): Result<PageInfo> {
    return handleRespond<PageInfo>(() => {
      return this.pageService.detail(projectId, pageName)
    })
  }
}
